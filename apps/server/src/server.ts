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
  .use(cors())
  .get('/message/:name', (req: any, res: any) => {
    return res.json({ message: `hello ${req.params.name}` });
  })
  .get('/healthz', (req: any, res: any) => {
    return res.json({ ok: true });
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
