import 'dotenv/config';

import { REST_API_PORT, GRPC_API_PORT } from './shared/environment';

import restApi from './infra/http/rest';
import gRPCApi from './infra/http/grpc';

(async () => {
  console.log('📡 Server starting...');
  await restApi(REST_API_PORT);
  await gRPCApi(GRPC_API_PORT);
})();
