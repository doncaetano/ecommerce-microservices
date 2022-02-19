import * as grpc from '@grpc/grpc-js';
import { ValidationError } from 'yup';

import logger from '../../shared/logger';

const serviceErrorHandler = () => {
  return <Input, Output>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (
        call: grpc.ServerUnaryCall<Input, Output>,
        callback: grpc.sendUnaryData<Output>
      ) => Promise<void>
    >
  ) => {
    if (!descriptor?.value) return;

    const originalMethod = descriptor.value;
    async function method(
      this,
      call: grpc.ServerUnaryCall<Input, Output>,
      callback: grpc.sendUnaryData<Output>
    ) {
      try {
        await originalMethod.apply(this, [call, callback]);
      } catch (err) {
        if (err instanceof ValidationError) {
          callback(
            {
              code: grpc.status.INVALID_ARGUMENT,
              details: err.message,
            },
            null
          );
        }

        if (err instanceof Error) logger.error(err.message);
        else logger.error(err);

        callback(
          {
            code: grpc.status.INTERNAL,
            details: 'Server Error',
          },
          null
        );
      }
    }

    Object.assign(descriptor, { value: method });
  };
};

export default serviceErrorHandler;
