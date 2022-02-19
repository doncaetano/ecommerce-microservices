import express from 'express';

import createProductHandler from './useCases/createProduct/restHandler';
import getProductHandler from './useCases/getProduct/restHandler';
import listProductsHandler from './useCases/listProducts/restHandler';
import createProductPromotionHandler from './useCases/createProductPromotion/restHandler';
import listProductPromotionsHandler from './useCases/listProductPromotions/restHandler';

const productRouter = express.Router();

productRouter.post('/', createProductHandler);
productRouter.get('/', listProductsHandler);
productRouter.get('/:id', getProductHandler);
productRouter.post('/:id/promotion', createProductPromotionHandler);
productRouter.get('/:productId/promotion', listProductPromotionsHandler);

export default productRouter;
