import dotenv from 'dotenv';
dotenv.config();

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

async function listFiles() {
  const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'ap-south-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    forcePathStyle: true,
  });

  try {
    const data = await s3Client.send(new ListObjectsV2Command({ Bucket: 'elevateweb-products' }));
    console.log('Files in bucket:', data.Contents?.map(c => c.Key) || 'Empty bucket');
  } catch (error) {
    console.error('Error:', error);
  }
}

listFiles();
