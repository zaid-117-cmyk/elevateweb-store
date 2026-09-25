import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import checkoutRoutes from "./routes/checkout";
import webhookRoutes from "./routes/webhook";
import productRoutes from "./routes/product";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Webhook route must be registered BEFORE express.json() for signature verification
app.use("/api/webhook", webhookRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 NexaFlow Digital Store Backend is running on port ${PORT}`);
});
