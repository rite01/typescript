import { config } from 'dotenv';

config();
export interface IConfig {
  secret: string,
  user: string,
  pass: string,
}

export const nodemailerConfig = {
  secret: process.env.SECRET,
  user: '',
  pass: '',
};
