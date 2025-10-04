process.loadEnvFile("./.env");

export const config = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.MODE || "DEV",
};
