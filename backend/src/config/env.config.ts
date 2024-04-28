const env = process.env;
export const appEnv = {
  SERVER_PORT: env.SERVER_PORT || 6060,
  DB_HOST: env.DB_HOST,
  DB_PORT: +(env.DB_PORT || 3306),
  DB_NAME: env.DB_NAME,
  DB_USERNAME: env.DB_USERNAME,
  DB_PASSWORD: env.DB_PASSWORD,
  JWT_KEY: env.JWT_KEY || "testjwtkey123",
};
