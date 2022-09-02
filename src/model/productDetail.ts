import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDetail {
  courseId: string,
  courseAuther: string,
  courseTitle: string,
  numReview: number,
  courseSummary: string,
  aboutProduct: string,
  discription: string,
  hours: string,
  courseSummry: string
}

export interface IDetail extends IProductDetail, Document { }

const detailSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
  courseAuther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  courseTitle: { type: String, require: true },
  discription: { type: String, require: true },
  numReview: { type: Number, require: true },
  hours: { type: Number, require: true },
  courseSummary: { type: String, require: true },
  aboutProduct: { type: String, require: true },
});

export const ProductDetail = mongoose.model<IDetail>('productdetail', detailSchema);
