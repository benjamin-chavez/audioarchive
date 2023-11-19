// apps/server/src/app.ts

import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import flash from 'express-flash';
import helmet from 'helmet';
import morgan from 'morgan';
// import errorHandler from './middleware/errorMiddleware';
import routes from './routes';

const app: Express = express();

// const baseUrl = process.env.AUTH0_BASE_URL;
// const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
// const audience = process.env.AUTH0_AUDIENCE;

// const corsOptions = {
//   origin: 'http://localhost:3000',
// };

// if (!baseUrl || !issuerBaseUrl) {
//   throw new Error(
//     `Please make sure that the file .env.${process.env.NODE_ENV} is in place and populated`
//   );
// }

// if (!audience) {
//   console.log(
//     'AUTH0_AUDIENCE not set in .env.local. Shutting down API server.'
//   );
//   process.exit(1);
// }

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(helmet())
  // .use(urlencoded({ extended: true }))
  // .use(json())
  // .use(cors(corsOptions))
  .use(
    cors({
      origin: [
        // TODO: REMOVE WILDCARD
        '*',
        // baseUrl,
      ],
    })
  )
  // .use(express.json());
  .use(
    json({
      // We need the raw body to verify webhook signatures.
      // Let's compute it only when hitting the Stripe webhook endpoint.
      verify: (req, res, buf) => {
        // @ts-ignore
        if (req.originalUrl.startsWith('/api/webhook')) {
          // @ts-ignore
          req.rawBody = buf.toString();
        }
      },
    })
  )
  .use(urlencoded({ extended: false }))
  .use(cookieParser())
  .use(flash())
  // .use((req, res, next) => {
  //   console.log('Request Headers: ', req.headers);
  //   next();
  // })
  .use('/', (req: any, res: any) => {
    return res.json({ ok: true });
  })
  .use('/api', routes)
  .get('/message/:name', (req: any, res: any) => {
    return res.json({ message: `hello ${req.params.name}` });
  })
  .get('/healthz', (req: any, res: any) => {
    return res.json({ ok: true });
  })
  // .use(errorHandler);

// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('Invalid token');
//   } else {
//     // handle other types of errors or pass them on
//     next(err);
//   }
// });

export default app;
