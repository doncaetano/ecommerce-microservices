import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'cart-api' },
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

export default logger;
