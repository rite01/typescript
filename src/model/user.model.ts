import { config } from 'dotenv';
import mongoose, {
  Schema, Document, Types,
} from 'mongoose';
import { sign } from 'jsonwebtoken';
import { compareSync, genSalt, hashSync } from 'bcrypt';

config();

export interface IUser extends Document<Types.ObjectId> {
  fullName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  confirmationCode: number;
  isPasswordMatched: (password: string) => Promise<boolean>;
  generateAuthToken: () => string;
  body?: any
}

const userSchema: Schema = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'educator'],
      default: 'user',
    },
  },
);

userSchema.pre<IUser>('save', async function (next) {
  const token = parseInt(`${Math.random() * 1000000}`, 10);
  if (this.isModified('password')) {
    const salt = await genSalt(Number(process.env.SALT));
    this.password = hashSync(this.password, salt);
  }
  this.confirmationCode = token;
  next();
});

// Token Generater
const secret: any = process.env.JWTPRIVATEKEY;
userSchema.methods.generateAuthToken = function () {
  const token = sign({ id: this.id }, secret, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

userSchema.methods.isPasswordMatched = function (password: string) {
  return compareSync(password, this.password);
};

export const User = mongoose.model<IUser>('user', userSchema);
