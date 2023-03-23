import { S3Client } from '@aws-sdk/client-s3';
import appConfig from '../../app.config';

const s3 = new S3Client({});

export const checkBucket = async (s3: S3Client, bucket: string) => {
  try {
    console.log('bucket exists');

    return true;
  } catch (error) {
    console.log('bucket doesnt exist');

    return false;
  }
};
