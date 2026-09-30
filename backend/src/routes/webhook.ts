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
      let order = await prisma.order.findUnique({
        where: { razorpayOrderId },
        include: { product: true },
      });

      // If no order exists, it's a direct Razorpay Payment Page purchase!
      if (!order) {
        console.log(`No pending order found for ${razorpayOrderId}. Assuming direct Payment Page purchase.`);
        
        // Match product based on the amount paid (in paise)
        let productIdToFulfill = 'prod-1-page-action-playbook'; // fallback
        
        if (paymentEntity.amount === 29900) {
          productIdToFulfill = 'prod-action-masterplan';
        } else if (paymentEntity.amount === 19900) {
          productIdToFulfill = 'prod-1-page-action-playbook';
        }

        const product = await prisma.product.findUnique({
          where: { id: productIdToFulfill }
        });

        if (product) {
          order = await prisma.order.create({
            data: {
              razorpayOrderId: razorpayOrderId || `direct_${paymentId}`,
              status: "PAID",
              paymentId: paymentId,
              productId: product.id,
              guestEmail: paymentEntity.email,
            },
            include: { product: true }
          });
        }
      }

      if (order && order.status !== "PAID") {
        // 2. Mark the order as paid (if it was pending)
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "PAID",
            paymentId: paymentId,
          },
        });
      }

      if (order) {

        const emailToSendTo = order.guestEmail || paymentEntity.email;

        if (emailToSendTo) {
          // 3. Generate Secure S3 Signed URL for the product
          const downloadUrl = await generateSignedDownloadUrl(order.product.fileKey);

          // 4. Send the Email with the link
          await sendDownloadEmail(emailToSendTo, order.product.name, downloadUrl);
          console.log(`Success! Delivery email sent to ${emailToSendTo}`);
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
