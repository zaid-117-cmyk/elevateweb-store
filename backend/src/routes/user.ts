import { Router } from "express";
import prisma from "../db";
import { authenticate, AuthRequest } from "../middleware/auth";
import { generateSignedDownloadUrl } from "../services/s3";

const router = Router();

// Get all orders for the authenticated user
router.get("/orders", authenticate, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId: req.userId },
          { guestEmail: req.userEmail }
        ],
        status: "PAID",
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Generate download link for an order owned by the user
router.get("/orders/:orderId/download", authenticate, async (req: AuthRequest, res) => {
  try {
    const orderId = req.params.orderId as string;

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        OR: [
          { userId: req.userId },
          { guestEmail: req.userEmail }
        ],
        status: "PAID",
      },
      include: { product: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found or payment not completed" });
    }

    const downloadUrl = await generateSignedDownloadUrl(order.product.fileKey);

    res.json({
      productName: order.product.name,
      downloadUrl,
      expiresIn: "24 hours",
    });
  } catch (error) {
    console.error("Generate download link error:", error);
    res.status(500).json({ error: "Failed to generate download link" });
  }
});

export default router;
