import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import appConfig from '../../app.config';

const s3 = new S3Client({
  endpoint: 'http://localhost:9000',
  region: 'test',
  credentials: {
    accessKeyId: appConfig.AwsAccessKey,
    secretAccessKey: appConfig.AwsSecretKey
  },
  forcePathStyle: true
});

export const uploadObject = async () => {
  const command = new PutObjectCommand({
    Bucket: appConfig.BucketName,
    Key: 'test',
    Body: 'test'
  });

  try {
    const response = await s3.send(command);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
