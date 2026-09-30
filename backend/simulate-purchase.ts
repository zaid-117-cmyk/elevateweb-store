import prisma from "./src/db";
import { sendDownloadEmail } from "./src/services/email";
import { generateSignedDownloadUrl } from "./src/services/s3";

async function simulate() {
  const email = "zaidwork1802@gmail.com";
  const productId = "prod-action-masterplan";
  
  console.log(`Simulating purchase for ${email} on product ${productId}...`);
  
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    console.error("Product not found!");
    return;
  }

  console.log(`Found product: ${product.name}`);
  console.log(`File Key (Notion URL): ${product.fileKey}`);

  // Create order in DB (optional, but good for realism)
  const order = await prisma.order.create({
    data: {
      razorpayOrderId: `hypothetical_order_${Date.now()}`,
      status: "PAID",
      paymentId: `hypothetical_payment_${Date.now()}`,
      productId: product.id,
      guestEmail: email,
    }
  });

  console.log(`Created Order in Supabase DB: ${order.id}`);

  // Generate URL (should just return the Notion URL)
  const downloadUrl = await generateSignedDownloadUrl(product.fileKey);
  console.log(`Generated Link (Bypassing S3): ${downloadUrl}`);

  // Send Email
  console.log(`Sending delivery email via SMTP...`);
  await sendDownloadEmail(email, product.name, downloadUrl);
  console.log(`✅ Success! Delivery email sent to ${email}. Check your inbox!`);
}

simulate().catch(console.error).finally(() => prisma.$disconnect());
