import mongoose, { Document } from 'mongoose';

export interface IProductImg {
  public_id: string,
  url: string,
}

export interface IProduct {
  productId: string
  heading: string,
  title: string,
  image: IProductImg,
  price: number,
  updateDate: Date,
  bestSeller: boolean
}

export interface IProductCreate extends IProduct, Document { }

const productSchema = new mongoose.Schema({
  heading: { type: String, require: true },
  title: { type: String, require: true },
  image: {
    public_id: { type: String, require: true },
    url: { type: String, require: true },
  },
  price: { type: Number, require: true },
  updateDate: { type: String, require: true },
  bestSeller: { type: Boolean, default: false },
  detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productdetail',
  },
});

export const Product = mongoose.model<IProductCreate>('products', productSchema);
