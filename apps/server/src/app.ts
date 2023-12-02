// // apps/server/src/app.ts

// // import dotenv from 'dotenv';
// // dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// import { json, urlencoded } from 'body-parser';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import express, { ErrorRequestHandler, Express, NextFunction } from 'express';
// import flash from 'express-flash';
// import helmet from 'helmet';
// import morgan from 'morgan';
// // import errorHandler from './middleware/errorMiddleware';
// import routes from './routes';

// export const app: Express = express();

// // Error handling middleware
// const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
//   console.error(error); // Log the error for debugging

//   const statusCode =
//     res.statusCode === 200 ? error.statusCode || 500 : res.statusCode;
//   const message = error.message || 'Internal Server Error';

//   res.status(statusCode).json({
//     error: message,
//   });
// };

// // const baseUrl = process.env.AUTH0_BASE_URL;
// // const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
// // const audience = process.env.AUTH0_AUDIENCE;

// // const corsOptions = {
// //   origin: 'http://localhost:3000',
// // };

// // if (!baseUrl || !issuerBaseUrl) {
// //   throw new Error(
// //     `Please make sure that the file .env.${process.env.NODE_ENV} is in place and populated`
// //   );
// // }

// // if (!audience) {
// //   console.log(
// //     'AUTH0_AUDIENCE not set in .env.local. Shutting down API server.'
// //   );
// //   process.exit(1);
// // }

// app
//   .disable('x-powered-by')
//   .use(morgan('dev'))
//   .use(helmet())
//   // .use(urlencoded({ extended: true }))
//   // .use(json())
//   // .use(cors(corsOptions))
//   .use(
//     cors({
//       origin: [
//         // TODO: REMOVE WILDCARD
//         '*',
//         // baseUrl,
//       ],
//     })
//   )
//   // .use(express.json());
//   .use(
//     json({
//       // We need the raw body to verify webhook signatures.
//       // Let's compute it only when hitting the Stripe webhook endpoint.
//       verify: (req, res, buf) => {
//         // @ts-ignore
//         if (req.originalUrl.startsWith('/api/webhook')) {
//           // @ts-ignore
//           req.rawBody = buf.toString();
//         }
//       },
//     })
//   )
//   .use(urlencoded({ extended: false }))
//   .use(cookieParser())
//   .use(flash())
//   // .use((req, res, next) => {
//   //   console.log('Request Headers: ', req.headers);
//   //   next();
//   // })
//   .get('/message/:name', (req: any, res: any) => {
//     return res.json({ message: `hello ${req.params.name}` });
//   })
//   .get('/healthz', (req: any, res: any) => {
//     return res.json({ ok: true });
//   })
//   .use('/', (req: any, res: any) => {
//     return res.json({ ok: true });
//   })
//   .use('/api', routes);

// app.use(errorHandler);

// export default app;

// // apps/server/src/server.ts

// import app from './app';

// // const PORT = process.env.PORT || 5000;
// const PORT = 5000;

// app.listen(PORT, () => {
//   // console.log('Current NODE_ENV:', process.env.NODE_ENV);
//   console.log(`Server listening on port: ${PORT}!`);
// });

// // const server = app.listen(PORT, () => {
// //   console.log('Current NODE_ENV:', process.env.NODE_ENV);
// //   console.log(`Server listening on port: ${PORT}!`);
// // });

// // process.on('SIGINT', () => server.close());
// import dotenv from 'dotenv';
// dotenv.config();
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import flash from 'express-flash';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorMiddleware'; // notFoundHandler, // generalErrorHandler,
import routes from './routes/index';

// export const createServer: any = () => {
//   const app = express();
//   app
//     .disable('x-powered-by')
//     .use(morgan('dev'))
//     .use(urlencoded({ extended: true }))
//     .use(json())
//     .use(cors())
//     .get('/message/:name', (req, res) => {
//       return res.json({ message: `hello ${req.params.name}` });
//     })
//     .get('/healthz', (req, res) => {
//       return res.json({ ok: true });
//     });

//   return app;
// };

const app: Express = express();

const baseUrl = process.env.AUTH0_BASE_URL;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

if (!baseUrl || !issuerBaseUrl) {
  throw new Error(
    'Please make sure that the file .env.local is in place and populated'
  );
}

if (!audience) {
  console.log(
    'AUTH0_AUDIENCE not set in .env.local. Shutting down API server.'
  );
  process.exit(1);
}

console.log('baseUrl: ', baseUrl);
console.log('issuerBaseUrl: ', issuerBaseUrl);
console.log('audience: ', audience);

app
  .disable('x-powered-by')
  .use(
    morgan('dev')
    // morgan('combined')
  )
  .use(helmet())
  .use(
    cors({
      origin: '*',
    })
  )
  // .use(json())
  .use(
    express.json({
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
  // .use(urlencoded({ extended: true }))
  .use(urlencoded({ extended: false }))
  .use(cookieParser())
  .use(flash())
  .get('/healthz', (req: any, res: any) => {
    return res.json({ ok: true });
  })
  .get('/api/health', (req: any, res: any) => {
    // return res.json({ ok: 'hello' });
    return res
      .status(200)
      .json({ message: `Healthy! | ${process.env.NODE_ENV}` });
  })
  .use('/api', routes)
  .use(errorHandler);

export default app;
