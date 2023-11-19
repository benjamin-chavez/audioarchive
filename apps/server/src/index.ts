import { server } from './server';
// import { log } from 'logger';

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
