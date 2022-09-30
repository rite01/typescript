import {
  addCart, getCartProduct, removeCart,
} from '../controller';
import { verifyToken } from '../middleware/authCheck';

const cartRoute = require('express').Router();
const {
  Routes: { CART },
} = require('../constants');

/**
 * @swagger
 * components:
 *      schemas:
 *          Cart Api:
 *              type: object
 *              required :
 *                  - productId
 *                  - userId
 *                  - active
 *                  - modifiedOn
 *              properties:
 *                  productId:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  active:
 *                      type: string
 *                  modifiedOn:
 *                      type: string
 */

/**
 * @swagger
/api/v1/addcart:
 *  post:
 *      summary: Create Cart
 *      tags: [Cart Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Cart Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */

cartRoute.post(CART.ADDTOCART, verifyToken, addCart);

/**
 * @swagger
 * components:
 *      schemas:
 *          Cart Api:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/getcart:
 *  get:
 *      summary: Get cart product
 *      tags: [Cart Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Cart Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
cartRoute.get(CART.GETCART, verifyToken, getCartProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          Cart Api:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/removecart/:id:
 *  delete:
 *      summary: Delete Product
 *      tags: [Cart Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Cart Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
cartRoute.delete(CART.REMOVECART, verifyToken, removeCart);

export default cartRoute;
