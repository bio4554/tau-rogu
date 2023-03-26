import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
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

export const getUploadUrl = async () => {
  const newKey = uuidv4();
  const command = new PutObjectCommand({
    Bucket: appConfig.BucketName,
    Key: newKey
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { url: url, key: newKey };
};

export const getDownloadUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: appConfig.BucketName,
    Key: key
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

export const blobExists = async (key: string): Promise<boolean> => {
  const command = new HeadObjectCommand({
    Bucket: appConfig.BucketName,
    Key: key
  });

  const result = await s3.send(command);
  return result.$metadata.httpStatusCode === 200 && result.ContentLength > 0;
};
