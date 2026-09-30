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
    const { productId, email, couponCode } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle coupons securely on the backend
    const VALID_COUPONS: Record<string, { type: 'percent' | 'flat'; value: number }> = {
      PLAYBOOK20: { type: 'percent', value: 20 },
      ACTION20: { type: 'percent', value: 20 },
      ELEVATE20: { type: 'percent', value: 20 },
      LAUNCH50: { type: 'flat', value: 50 },
      DEV10: { type: 'percent', value: 10 },
    };

    let finalAmount = product.price; // in paise
    if (couponCode && VALID_COUPONS[couponCode.toUpperCase()]) {
      const coupon = VALID_COUPONS[couponCode.toUpperCase()];
      if (coupon.type === 'percent') {
        const discount = Math.round((finalAmount * coupon.value) / 100);
        finalAmount = Math.max(0, finalAmount - discount);
      } else {
        // Flat discount in rupees, convert to paise
        const discountInPaise = coupon.value * 100;
        finalAmount = Math.max(0, finalAmount - discountInPaise);
      }
    }

    // Razorpay expects amount in smallest currency unit (paise for INR)
    const options: any = {
      amount: finalAmount, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

export default router;
