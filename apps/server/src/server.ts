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

import { json, urlencoded } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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

export const server: any = express();
server
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(
    cors({
      origin: '*',
    })
  )
  .get('/message/:name', (req: any, res: any) => {
    return res.json({ message: `hibi ${req.params.name}` });
  })
  .get('/healthz', (req: any, res: any) => {
    return res.json({ ok: true });
  })
  .get('/api', (req: any, res: any) => {
    return res.json({ ok: 'hello' });
  })
  .get('/api/health', (req: any, res: any) => {
    // return res.json({ ok: 'hello' });
    return res.status(200).json({ message: 'Healthy!' });
  });

// // @ts-nocheck
// import { json, urlencoded } from 'body-parser';
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';

// export const createServer: any = () => {
//   const app = express();
//   app
//     .disable('x-powered-by')
//     .use(morgan('dev'))
//     .use(urlencoded({ extended: true }))
//     .use(json())
//     .use(cors('*'))
//     .get('/message/:name', (req, res) => {
//       return res.json({ message: `hello ${req.params.name}` });
//     })
//     .get('/healthz', (req, res) => {
//       return res.json({ ok: true });
//     });

//   return app;
// };
