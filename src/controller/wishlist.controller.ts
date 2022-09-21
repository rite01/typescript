import { Response } from 'express';
import { RequestB } from 'src/middleware/authCheck';
import { WishList } from '../model';
import { HttpMessage, HttpMessageCode } from '../constants';

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
export const wishList = async (req: RequestB, res: Response): Promise<object> => {
    try {
        const { id: userId } = req.user;
        const { productId } = req.body;
        if (!productId) {
            return res
                .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
                .json({ error: HttpMessage.PLEASE_ADD_PRODUCT });
        }
        const wishListFound = await WishList.findOne({ userId });
        if (wishListFound) {
            const productAdd = wishListFound.productId.find((i: string | number) => i === productId);
            if (productAdd) {
                return res
                    .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
                    .json({ error: HttpMessage.POST_ADD_ALREADY });
            }
            wishListFound.isWishList = true;
            wishListFound.productId.push(productId);
            const createWishlist = await wishListFound.save();
            return res.status(HttpMessageCode.CREATED).json({
                statusCode: HttpMessageCode.CREATED,
                message: HttpMessage.ADD_WISHLIST,
                data: createWishlist,
            });
        }
        const addCart = new WishList({ productId, userId });
        const createWishlist = await addCart.save();
        return res.status(HttpMessageCode.CREATED).json({
            statusCode: HttpMessageCode.CREATED,
            message: HttpMessage.ADD_WISHLIST,
            data: createWishlist,
        });
    } catch (err: any) {
        return res
            .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
            .json({ error: err.message });
    }
};

export const getWishListProduct = async (_: unknown, res: Response): Promise<object> => {
    try {
        const wishlistData = await WishList.find({}).populate('productId');
        return res.json({ status: HttpMessageCode.OK, message: HttpMessage.GET_WISHLIST_PRODUCT, data: wishlistData });
    } catch (err: any) {
        return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
    }
};

export const removeWishList = async (req: RequestB, res: Response): Promise<object> => {
    try {
        const { id: userId } = req.user;
        const { id: _id } = req.params;
        const data = await WishList.findOne({ userId });
        if (!data) {
            return res
                .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
                .json({ error: HttpMessage.NO_CART });
        }
        const found = data.productId.find((element: string) => element === _id);
        if (!found) {
            return res
                .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
                .json({ error: HttpMessage.NO_DATA_FOUND_FROM_THIS_ID });
        }
        // const removeItem = data.productId.find((element: string) => element !== _id);
        // data.productId = (removeItem as unknown as string[]);

        const updateData: any = await WishList.findOneAndUpdate(
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
