// apps/server/src/index.ts

import { app } from './server';
// import { log } from 'logger';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
