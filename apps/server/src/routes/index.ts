// apps/server/src/routes/index.ts

import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import listEndpoints from 'express-list-endpoints';
import { app } from '../app';
import S3Service from '../services/s3.service';
import appUserRoutes from './app-user.routes';
import productRoutes from './product.routes';
// import webhookRoutes from './webhook.routes';
import knex from '../config/database';

// TODO: Blog post: this error =>  import { knex } from 'knex';

const router: Router = express.Router();

/**
 * @description:    Fetch Root
 * @route:          GET /api
 * @access:         Public
 */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.status(200).send('Server Running...');
  })
);

router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(app));
});

router.get('/download', async (req, res) => {
  // const params = {
  //     ResponseContentDisposition: 'attachment'  // This forces the download behavior
  // };
  const digitalFileS3Url = await S3Service.getObjectSignedUrl(
    'ableton-audio-archive-demo-file-project-seed.zip'
  );

  res.redirect(digitalFileS3Url);
});

// router.use('/app-users', appUserRoutes);
router.use('/products', productRoutes);

// router.use(express.raw({ type: 'application/json' }));
// const captureRawBody = express.raw({ type: 'application/json' });
// router.use(
//   '/webhook',
//   // captureRawBody,
//   webhookRoutes
// );

router.use(
  '/app-users',
  asyncHandler(async (req, res) => {
    const appUsers = await knex('appUsers').select('*');

    if (!appUsers.length) {
      throw new Error('No app users found');
    }

    res
      .status(200)
      .json({ data: appUsers, message: 'AppUsers retrieved succesfully' });
  })
);

export default router;
