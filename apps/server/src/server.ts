// apps/server/src/index.ts

require('dotenv').config();

// import dotenv from 'dotenv';
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// dotenv.config({ path: `.env` });

import { app } from './app';
// import { log } from 'logger';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
