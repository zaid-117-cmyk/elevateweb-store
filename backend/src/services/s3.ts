import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

export const generateSignedDownloadUrl = async (fileKey: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  });

  // The URL will expire in 24 hours (86400 seconds)
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
  return signedUrl;
};
