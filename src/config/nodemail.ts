import { config } from 'dotenv';

config();
export interface IConfig {
  secret: string,
  user: string,
  pass: string,
}

export const nodemailerConfig = {
  secret: process.env.SECRET,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
};
