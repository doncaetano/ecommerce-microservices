import express, { ErrorRequestHandler, json } from 'express';
import { ValidationError } from 'yup';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import routes from '../../module/routes';
import logger from '../../shared/logger';
import RequestError from '../../shared/RequestError';

const swaggerDocument = require('../../../docs/swagger.json');

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (!err) next();

  if (err instanceof RequestError) {
    const { status, body } = err.response();
    res.status(status).json(body);
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: {
        code: err.path,
        message: err.message,
      },
    });
    return;
  }

  logger.error(err.message);
  res.status(500).json({ code: 'server', message: 'Internal Server Error' });
};

const run = async (port: number) => {
  const app = express();

  app.use(json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(routes);
  app.use(errorHandler);

  const server = createServer(app);
  server.listen(port, () => {
    console.info(`🚀 REST API started at http://localhost:${port}`);
  });
};

export default run;
