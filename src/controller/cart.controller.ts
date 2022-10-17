/* eslint-disable no-restricted-syntax */
import { Response } from 'express';
import { RequestB } from 'src/middleware/authCheck';
import { IProduct } from '../model';
import { HttpMessage, HttpMessageCode } from '../constants';
import { Cart } from '../model/cart.model';

/**
 * api end point api/v1/addcart
 *
 * @param {String} userId
 * @param {String} productId
 * @returns {message}
 * @access public
 * @discription add to cart controller.
 */
/** */
export const addCart = async (req: RequestB, res: Response): Promise<object> => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.PLEASE_ADD_PRODUCT });
    }
    const cartFound = await Cart.findOne({ userId });
    if (cartFound) {
      const productAdd = cartFound.productId.find((i: string) => {
        const item = i
          .toString()
          .replace(/ObjectId\("(.*)"\)/, '$1');
        return item === productId;
      });
      if (productAdd) {
        return res.json({
          statusCode: HttpMessageCode.NOT_ACCEPTABLE,
          message: 'already added',
        });
      }
      cartFound.productId.push(productId);
      const createCart = await cartFound.save();
      return res.status(HttpMessageCode.CREATED).json({
        statusCode: HttpMessageCode.CREATED,
        message: HttpMessage.ADD_PRODUCT_SUCCESSFULLY,
        data: createCart,
      });
    }
    const addCart = new Cart({ productId, userId });
    const createCart = await addCart.save();
    return res.status(HttpMessageCode.CREATED).json({
      statusCode: HttpMessageCode.CREATED,
      message: HttpMessage.ADD_PRODUCT_SUCCESSFULLY,
      data: createCart,
    });
  } catch (err: any) {
    console.log(err);
    return res
      .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
      .json({ error: err.message });
  }
};

/**
 * api end point api/v1/getcart
 *
 * @param {String} userId
 * @returns {message}
 * @access public
 * @discription get cart controller.
 */

/** */
export const getCartProduct = async (req: RequestB, res: Response): Promise<object> => {
  try {
    const cartData = await Cart.find({ userId: req.user._id }).populate('productId');
    for (const obj of cartData) {
      const test = obj.productId as unknown as IProduct[];
      console.log(test);
      for (const hello of test) {
        console.log(hello.price);
      }
    }
    return res.status(HttpMessageCode.OK).json({ message: HttpMessage.GET_CART_PRODUCT, data: cartData });
  } catch (err: any) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

/**
 * api end point api/v1/removecart/:id
 *
 * @param {String} userId
 * @param {String} _id
 * @returns {message}
 * @access public
 * @discription Remove cart product by Id update cart model.
 */

export const removeCart = async (req: RequestB, res: Response): Promise<object> => {
  try {
    const { id: userId } = req.user;
    const { id: _id } = req.params;
    const data = await Cart.findOne({ userId });
    if (!data) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.NO_CART });
    }
    const found = data.productId.find((i: string) => {
      const item = i
        .toString()
        .replace(/ObjectId\("(.*)"\)/, '$1');
      console.log('>>>', item, _id);
      return item === _id;
    });
    if (!found) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.NO_DATA_FOUND_FROM_THIS_ID });
    }

    const updateData: any = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { productId: _id } },
      { new: true },
    );
    await updateData.save();
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      data: updateData,
    });
  } catch (error: any) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: error.message });
  }
};
