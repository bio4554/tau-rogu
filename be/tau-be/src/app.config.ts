export default {
  PostgresServer: process.env.PG_SERVER ?? '',
  PostgresUser: process.env.PG_USER ?? '',
  PostgresPassword: process.env.PG_PASS ?? '',
  PostgresDatabase: process.env.PG_DB ?? '',
  PostgresPort: process.env.PG_PORT ?? '',
  JwtAccessKey: process.env.JWT_ACCESS_KEY ?? '',
  JwtRefreshKey: process.env.JWT_REFRESH_KEY ?? '',
  JwtPrivateKey: process.env.RSA_PRIVATE_ACCESS ?? '',
  JwtPublicKey: process.env.RSA_PUBLIC_ACCESS ?? '',
  Port: process.env.PORT ?? '',
  AwsAccessKey: process.env.AWS_ACCESS_KEY_ID ?? '',
  AwsSecretKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  BucketName: process.env.BUCKET_NAME ?? ''
};
