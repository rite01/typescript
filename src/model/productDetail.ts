import mongoose, { Document } from 'mongoose';

export interface IProductDetail {
  courseId: string,
  courseAuthor: string,
  courseTitle: string,
  numReview: number,
  courseSummary: string,
  aboutProduct: string,
  description: string,
  hours: string,
}

export interface IDetail extends IProductDetail, Document { }

const detailSchema = new mongoose.Schema({
  courseAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  courseTitle: { type: String, require: true },
  description: { type: String, require: true },
  numReview: { type: Number, require: true },
  hours: { type: Number, require: true },
  courseSummary: { type: String, require: true },
  aboutProduct: { type: String, require: true },
});

export const ProductDetail = mongoose.model<IDetail>('productDetail', detailSchema);
