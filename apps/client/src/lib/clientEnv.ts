// apps/client/src/lib/clientEnv.ts
import ParameterStoreService from 'parameter-store';

// Load environment variables here
export async function loadEnvVariables() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    return;
  }

  const paramUrls = {
    general: [
      '/audioarchive/config/node_env',
      '/audioarchive/github_token',
      '/audioarchive/production/client/NEXT_PUBLIC_COMPANY_NAME',
    ],
    auth0: [
      '/audioarchive/production/server/AUTH0_AUDIENCE',
      '/audioarchive/production/server/AUTH0_BASE_URL',
      '/audioarchive/production/server/AUTH0_CLIENT_ID',
      '/audioarchive/production/server/AUTH0_CLIENT_SECRET',
      '/audioarchive/production/server/AUTH0_ISSUER_BASE_URL',
      '/audioarchive/production/server/AUTH0_SCOPE',
      '/audioarchive/production/server/AUTH0_SECRET',
      '/audioarchive/production/server/CLIENT_URL',
    ],
  };
  ParameterStoreService.initialize('us-east-2');
  // ParameterStoreService.initialize(process.env.AWS_REGION || 'us-east-2');
  try {
    let parameters = [];

    for (const key of Object.keys(paramUrls)) {
      const res = await ParameterStoreService.getParameters({
        Names: paramUrls[key],
        WithDecryption: true,
      });

      parameters = parameters.concat(res);
    }

    parameters.forEach((param) => {
      if (!param.Name || !param.Value) {
        return;
      }

      console.log('param.Name: ', param.Name, 'param.Value: ', param.Value);

      const name = param.Name.split('/').pop();

      if (name) {
        process.env[name] = param.Value;
      }

      console.log(`process.env[name]: `, process.env[name]);
    });
  } catch (error) {
    console.error('Error fetching parameters:', error);
    throw error;
  }
}
