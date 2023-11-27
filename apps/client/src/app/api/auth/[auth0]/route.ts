// frontend/src/app/api/auth/[auth]/route.ts

import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();

// pages/api/auth/[auth0].js
// import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

// export const GET = handleAuth({
//   login: handleLogin({
//     authorizationParams: {
//       audience: process.env.AUTH0_AUDIENCE,
//       // audience: 'https://api.example.com/products', // or AUTH0_AUDIENCE
//       // Add the `offline_access` scope to also get a Refresh Token
//       scope: 'openid profile email read:messages', // or AUTH0_SCOPE
//     },
//   }),
//   logout: handleLogout({ returnTo: 'http://localhost:3000/' }),
// });
