import dotenv from 'dotenv';
dotenv.config();

import { generateSignedDownloadUrl } from './src/services/s3';

async function testUrl() {
  const url = await generateSignedDownloadUrl('the-1-page-action-playbook.zip');
  console.log('URL: ' + url);
}

testUrl();
