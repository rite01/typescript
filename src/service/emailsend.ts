import nodemailer from 'nodemailer';
import { nodemailerConfig } from '../config/nodemail';

const { user, pass }: any = nodemailerConfig;
export const sendMail = async (email: string, newCode: number) => {
  const mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user,
      pass,
    },
  });

  const mailDetails = {
    from: user,
    to: email,
    subject: 'Test mail',
    html: `
    <p>OTP for email verification ${newCode}</p>`,
  };

  return mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
};
