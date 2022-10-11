/* eslint-disable consistent-return */
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { nanoid } from 'nanoid/async';
import { PaymentDetail } from '../model/payment';

export const paymentOrder = async (_: any, res: any) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const option = {
            amount: '100',
            currency: 'INR',
            receipt: await nanoid(),
            payment_capture: '1',
        };

        const order = await instance.orders.create(option);
        if (!order) {
            return res.status(500).send('Some error occured');
        }
        const paymentDetail: any = new PaymentDetail({
            orderId: order.id,
            receiptId: order.receipt,
            amount: order.amount,
            currency: order.currency,
            createdAt: order.created_at,
            status: order.status,
        });
        await paymentDetail.save();
        return res.json(order);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const paymentSuccess = async (req: any, res: any) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const shasum: any = crypto.createHmac('sha256', '9MMSS2aMaJiwTAQwJ4eKlEwc');
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');
        if (digest !== razorpaySignature) { return res.status(400).json({ msg: 'Transaction not legit!' }); }
        return res.json({
            msg: 'success',
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
