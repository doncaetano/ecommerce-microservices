import express from 'express';

import getCartHandler from './useCases/getCart/restHandler';
import listCartsHandler from './useCases/listCarts/restHandler';
import updateCartHandler from './useCases/updateCart/restHandler';
import addCartProductHandler from './useCases/addCartProduct/restHandler';
import updateCartProductHandler from './useCases/updateCartProduct/restHandler';
import listCartProductHandler from './useCases/listCartProducts/restHandler';
import deleteCartProductHandler from './useCases/deleteCartProduct/restHandler';
import getCartSummaryHandler from './useCases/getCartSummary/restHandler';

const cartRouter = express.Router();

cartRouter.get('/', listCartsHandler);
cartRouter.get('/:id', getCartHandler);
cartRouter.put('/:id', updateCartHandler);
cartRouter.get('/:id/product', listCartProductHandler);
cartRouter.post('/:id/product', addCartProductHandler);
cartRouter.put('/:id/product/:productId', updateCartProductHandler);
cartRouter.delete('/:id/product/:productId', deleteCartProductHandler);
cartRouter.get('/:id/summary', getCartSummaryHandler);

export default cartRouter;
