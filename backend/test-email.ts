import dotenv from 'dotenv';
dotenv.config();

import { generateSignedDownloadUrl } from './src/services/s3';
import { sendDownloadEmail } from './src/services/email';

async function testEmail() {
  try {
    console.log('Generating S3 pre-signed URL...');
    const url = await generateSignedDownloadUrl('the-1-page-action-playbook.pdf');
    console.log('URL generated successfully: ' + url.substring(0, 50) + '...');
    
    console.log('Sending email to hadionlinestore107@gmail.com...');
    await sendDownloadEmail('hadionlinestore107@gmail.com', 'The 1-Page Action Playbook', url);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testEmail();
