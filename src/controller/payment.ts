/* eslint-disable consistent-return */
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { nanoid } from 'nanoid/async';
import { PaymentDetail } from '../model/payment';

export const paymentOrder = async (_: any, res: any) => {
    try {
        // const { cartId } = req.body;
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const params = {
            amount: '100',
            currency: 'INR',
            receipt: await nanoid(),
            payment_capture: '1',
        };

        const order = await instance.orders.create(params)
            .then(async (response: any) => {
                const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
                const paymentDetail = new PaymentDetail({
                    // cartId,
                    orderId: response.id,
                    receiptId: response.receipt,
                    amount: response.amount,
                    currency: response.currency,
                    createdAt: response.created_at,
                    status: response.status,
                });
                try {
                    await paymentDetail.save();
                    return res.json({
                        title: 'Confirm Order',
                        razorpayKeyId,
                        paymentDetail,
                    });
                } catch (err) {
                    if (err) throw err;
                }
            }).catch((err: any) => {
                if (err) throw err;
            });

        if (!order) return res.status(500).send('Some error occured');
    } catch (error) {
        return res.status(500).send(error);
    }
};

// export const paymentOrder = async (_: any, res: any) => {
//     try {
//         const instance = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET,
//         });

//         const options = {
//             amount: 100, // amount in smallest currency unit
//             currency: 'INR',
//             receipt: 'receipt_order_74394',
//         };

//         const order = await instance.orders.create(options);

//         if (!order) return res.status(500).send('Some error occured');

//         res.json(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

export const paymentSuccess = async (req: any, res: any) => {
    try {
        // getting the details back from our font-end
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
