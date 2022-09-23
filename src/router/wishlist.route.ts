import { getWishListProduct, removeWishList, wishList } from '../controller';
import { verifyToken } from '../middleware/authCheck';

const wishListRoute = require('express').Router();
const {
    Routes: { WISHLIST },
} = require('../constants');

/**
 * @swagger
 * components:
 *      schemas:
 *          WishList Api:
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
/api/v1/addwishlist:
 *  post:
 *      summary: Create wishlist
 *      tags: [WishList Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/WishList Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */

wishListRoute.post(WISHLIST.ADDTOWISHLIST, verifyToken, wishList);

/**
 * @swagger
 * components:
 *      schemas:
 *          WishList Api:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/getwishlist:
 *  get:
 *      summary: Get Wishlist product
 *      tags: [WishList Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/WishList Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
wishListRoute.get(WISHLIST.GETWISHLIST, verifyToken, getWishListProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          WishList Api:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/removewishlist/:id:
 *  delete:
 *      summary: Delete Product
 *      tags: [WishList Api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/WishList Api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
wishListRoute.delete(WISHLIST.REMOVEWISHLIST, verifyToken, removeWishList);

export default wishListRoute;
