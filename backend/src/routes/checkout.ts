import { Router } from "express";
import Razorpay from "razorpay";
import prisma from "../db";

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Create a new Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { productId, email } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Razorpay expects amount in smallest currency unit (paise for INR)
    const options = {
      amount: product.price, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save order as pending in our DB
    const order = await prisma.order.create({
      data: {
        razorpayOrderId: razorpayOrder.id,
        status: "PENDING",
        productId: product.id,
        guestEmail: email || null,
      },
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: order.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
