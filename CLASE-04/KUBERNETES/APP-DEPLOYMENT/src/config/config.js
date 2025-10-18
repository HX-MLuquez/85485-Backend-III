import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.MODE || "DEV",
  MONGO_URI: process.env.MONGO_URI 
};
