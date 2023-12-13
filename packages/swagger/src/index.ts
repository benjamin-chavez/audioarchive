// packages/swagger/src/index.ts

import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { Api } from './myApi';
// import { RequestHandler } from 'express';
// TODO: GET EXPRESS TYPES

export const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8')
);

export function swaggerMiddleware(): any {
  return swaggerUi.serveFiles(swaggerDocument, {
    swaggerOptions: {},
  });
}

export function setupSwagger(app, basePath = '/api-docs') {
  app.use(basePath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export const api = new Api();
