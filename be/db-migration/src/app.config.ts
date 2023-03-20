export default {
  PostgresServer: process.env.PG_SERVER ?? "",
  PostgresUser: process.env.PG_USER ?? "",
  PostgresPassword: process.env.PG_PASS ?? "",
  PostgresDatabase: process.env.PG_DB ?? "",
  PostgresPort: process.env.PG_PORT ?? "",
  JwtAccessKey: process.env.JWT_ACCESS_KEY ?? "",
  JwtRefreshKey: process.env.JWT_REFRESH_KEY ?? "",
  JwtPublicKey: process.env.RSA_PUBLIC_ACCESS ?? "",
  Port: process.env.PORT ?? "",
};
