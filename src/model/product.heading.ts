import mongoose, { Document, Schema } from 'mongoose';

export interface IProductTitle {
    title: string
}

export interface ITitle extends IProductTitle, Document { }

export const productHeadingSchema = new Schema(
    {
        title: { type: String, require: true },
    },
);

export const Title = mongoose.model<ITitle>('title', productHeadingSchema);
