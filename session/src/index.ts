import 'dotenv/config';

import { REST_API_PORT } from './shared/environment';

import restApi from './infra/http/rest';

(async () => {
  console.log('📡 Server starting...');
  await restApi(REST_API_PORT);
})();
