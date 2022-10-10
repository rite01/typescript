import mongoose from 'mongoose';

export interface IPayment {
    orderId: string
    receiptId: string
    paymentId: string
    signature: string
    amount: number
    currency: string
    createdAt: Date
    status: string
}

export const paymentDetailsSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
    },
    orderId: {
        type: String,
        required: true,
    },
    receiptId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    status: {
        type: String,
    },
});

export const PaymentDetail = mongoose.model<IPayment>('PaymentDetail', paymentDetailsSchema);
