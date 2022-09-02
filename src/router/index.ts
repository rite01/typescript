import authRouter from './auth.routes';
import cartRoute from './cart.route';
import educatorRoute from './educator.route';
import productRoute from './product.route';

const restRouter = require('express').Router();
const {
  Routes: {
    AUTH, EDUCATOR, PRODUCT, CART,
  },
} = require('../constants');

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(EDUCATOR.DEFAULT, educatorRoute);
restRouter.use(PRODUCT.DEFAULT, productRoute);
restRouter.use(CART.DEFAULT, cartRoute);

export default restRouter;
