import mongoose, {
  Schema, Document,
} from 'mongoose';

export interface ICartModel {
  productId: string[],
  userId: string,
  active: string,
  modifiedOn: string,
  total: number,
}

export interface ICart extends ICartModel, Document {
  data: string
}

const cartSchema = new Schema(
  {
    productId: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    total: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    active: { type: Boolean, default: true },
    modifiedOn: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Cart = mongoose.model<ICart>('cart', cartSchema);
