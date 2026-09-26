import { Router } from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import prisma from "../db";
import { generateSignedDownloadUrl } from "../services/s3";
import { sendDownloadEmail } from "../services/email";

const router = Router();

// Webhooks must be verified using the raw body, not JSON parsed body.
router.post("/razorpay", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).send("Invalid signature");
    }

    // Now it's safe to parse the JSON
    const event = JSON.parse(req.body.toString());

    // We only care if the payment was successful
    if (event.event === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      // 1. Find the order in our database
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId },
        include: { product: true },
      });

      if (order && order.status !== "PAID") {
        // 2. Mark the order as paid
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "PAID",
            paymentId: paymentId,
          },
        });

        const emailToSendTo = order.guestEmail || paymentEntity.email;

        if (emailToSendTo) {
          // 3. Generate Secure S3 Signed URL for the product
          const downloadUrl = await generateSignedDownloadUrl(order.product.fileKey);

          // 4. Send the Email with the link
          await sendDownloadEmail(emailToSendTo, order.product.name, downloadUrl);
        }
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook handler failed");
  }
});

export default router;
