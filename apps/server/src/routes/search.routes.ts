// apps/server/src/routes/search.routes.ts

import express, { Router } from 'express';
import * as searchController from '../controllers/search.controller';

const router: Router = express.Router();
// router.use('/search', (req, res) => {
//   // console.log(req);

//   res.status(200).send('received');
// });

router.get(
  '/app-users/:query',
  searchController.searchAppUsers
  // router.get('/app-users/:query', (req, res) => {
  // const searchQuery = req.params.query;
  // console.log(searchQuery);

  // res.status(200).send('');
  // }
);

router.get('/products/:query', searchController.searchProducts);

export default router;
