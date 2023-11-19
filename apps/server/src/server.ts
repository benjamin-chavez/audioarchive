// apps/server/src/server.ts

import app from './app';

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log('Current NODE_ENV:', process.env.NODE_ENV);
//   console.log(`Server listening on port: ${PORT}!`);
// });

const server = app.listen(PORT, () => {
  console.log('Current NODE_ENV:', process.env.NODE_ENV);
  console.log(`Server listening on port: ${PORT}!`);
});

process.on('SIGINT', () => server.close());
