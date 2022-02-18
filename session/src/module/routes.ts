import express from 'express';

import getSessionCartHandler from './useCases/getSessionCart';
import createSessionHandler from './useCases/createSession';

const sessionRouter = express.Router();

sessionRouter.get('/:id/cart', getSessionCartHandler);
sessionRouter.post('/', createSessionHandler);

export default sessionRouter;
