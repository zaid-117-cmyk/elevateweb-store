import { Router, Request, Response, NextFunction } from "express";
import prisma from "../db";

const router = Router();

// Simple admin middleware using an ADMIN_API_KEY from environment variables
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers["x-admin-key"];
  const expectedKey = process.env.ADMIN_API_KEY || "super_secret_admin_key";

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).json({ error: "Unauthorized: Invalid admin key" });
  }
  next();
};

// Create a new product
router.post("/products", adminAuth, async (req, res) => {
  try {
    const { name, description, price, fileKey, imageUrl } = req.body;

    if (!name || !description || price === undefined || !fileKey) {
      return res.status(400).json({ error: "Name, description, price, and fileKey are required." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price), // in paise (e.g., 49900 = ₹499)
        fileKey,
        imageUrl,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update a product
router.put("/products/:id", adminAuth, async (req, res) => {
  try {
    const id = req.params.id as string;
    const { name, description, price, fileKey, imageUrl } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(fileKey && { fileKey }),
        ...(imageUrl && { imageUrl }),
      },
    });

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    const id = req.params.id as string;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Admin stats: total revenue & sales
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalOrders = await prisma.order.count({
      where: { status: "PAID" },
    });

    const orders = await prisma.order.findMany({
      where: { status: "PAID" },
      include: { product: true },
    });

    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.product?.price || 0), 0);

    res.json({
      totalSales: totalOrders,
      totalRevenuePaise: totalRevenue,
      totalRevenueINR: totalRevenue / 100,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to calculate stats" });
  }
});

export default router;
