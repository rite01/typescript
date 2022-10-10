import authRouter from './auth.routes';
import cartRoute from './cart.route';
import educatorRoute from './educator.route';
import { paymentRoute } from './paymentRoute';
import productRoute from './product.route';
import wishListRoute from './wishlist.route';

const restRouter = require('express').Router();
const {
  Routes: {
    AUTH, EDUCATOR, PRODUCT, CART, WISHLIST, PAYMENT,
  },
} = require('../constants');

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(EDUCATOR.DEFAULT, educatorRoute);
restRouter.use(PRODUCT.DEFAULT, productRoute);
restRouter.use(CART.DEFAULT, cartRoute);
restRouter.use(WISHLIST.DEFAULT, wishListRoute);
restRouter.use(PAYMENT.DEFAULT, paymentRoute);

export default restRouter;
