import mongoose, {
    Schema, Document,
} from 'mongoose';

export interface IWishListModel {
    productId: string[],
    userId: string,
    active: string,
    modifiedOn: string,
    isWishList: boolean,
}

export interface IWishList extends IWishListModel, Document {
    data: string
    wishListFound: any,
}

const WishListSchema = new Schema(
    {
        productId: [{ type: Schema.Types.ObjectId, ref: 'products' }],
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        active: { type: Boolean, default: true },
        isWishList: { type: Boolean, default: false },
        modifiedOn: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export const WishList = mongoose.model<IWishList>('wishlist', WishListSchema);
