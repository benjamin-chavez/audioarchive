// apps/server/src/routes/index.ts

import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import listEndpoints from 'express-list-endpoints';
import app from '../app';
import S3Service from '../services/s3.service';
import appUserRoutes from './app-user.routes';
import productRoutes from './product.routes';
import webhookRoutes from './webhook.routes';

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

router.use('/app-users', appUserRoutes);
router.use('/products', productRoutes);

// router.use(express.raw({ type: 'application/json' }));
// const captureRawBody = express.raw({ type: 'application/json' });
router.use(
  '/webhook',
  // captureRawBody,
  webhookRoutes
);

export default router;
