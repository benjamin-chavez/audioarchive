// apps/server/src/services/s3.service.ts

import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';
import { generateRandomBytes } from '../lib/utils';
import { AppUser, Product } from '@shared/src';
import { s3 } from '../config/aws-config';
// import ParameterStoreService from './parameter-store.service';

const CONTEXT = 'S3Service';

// if (
//   !process.env.AWS_ACCESS_KEY ||
//   !process.env.AWS_SECRET_KEY ||
//   !process.env.AWS_BUCKET_NAME ||
//   !process.env.AWS_REGION
// ) {
//   throw new Error('One or more AWS Environment Variables are not set');
// }

// async () => {
//   if (!process.env.AWS_ACCESS_KEY) {
//     const param = await ParameterStoreService.getEncryptedParameterW(
//       '/audioarchive/production/server/AWS_ACCESS_KEY'
//     );
//     const AWS_ACCESS_KEY = param;

//     process.env[AWS_ACCESS_KEY] = AWS_ACCESS_KEY;
//     // throw new Error('AWS_BUCKET_NAME environment variable is not set');
//   }

//   if (!process.env.AWS_SECRET_KEY) {
//     const param = await ParameterStoreService.getEncryptedParameterW(
//       '/audioarchive/production/server/AWS_SECRET_KEY'
//     );
//     const AWS_SECRET_KEY = param;

//     process.env[AWS_SECRET_KEY] = AWS_SECRET_KEY;
//     // throw new Error('AWS_BUCKET_NAME environment variable is not set');
//   }

//   if (!process.env.AWS_BUCKET_NAME) {
//     const param = await ParameterStoreService.getEncryptedParameterW(
//       '/audioarchive/production/server/AWS_BUCKET_NAME'
//     );
//     const AWS_BUCKET_NAME = param;

//     process.env[AWS_BUCKET_NAME] = AWS_BUCKET_NAME;
//     // throw new Error('AWS_BUCKET_NAME environment variable is not set');
//   }

//   if (!process.env.AWS_REGION) {
//     const param = await ParameterStoreService.getEncryptedParameterW(
//       '/audioarchive/production/server/AWS_REGION'
//     );
//     const AWS_REGION = param;

//     process.env[AWS_REGION] = AWS_REGION;
//     // throw new Error('AWS_BUCKET_NAME environment variable is not set');
//   }
// };

// console.log('process.env.AWS_REGION: ', process.env.AWS_REGION);
// console.log('process.env.AWS_ACCESS_KEY: ', process.env.AWS_ACCESS_KEY);
// console.log('process.env.AWS_SECRET_KEY: ', process.env.AWS_SECRET_KEY);

// export const s3 = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   },
//   region: process.env.AWS_REGION,
// });

// export const s3 = new S3Client({
//   // region: process.env.AWS_REGION,
//   region: 'us-east-2',
// });

class S3Service {
  // FOR ONLY ONE - TODO: CONSIDER RENAMING
  static async getObjectSignedUrl(
    key: string,
    contentDisposition?: string
  ): Promise<string> {
    const params: any = {
      // Bucket: process.env.AWS_BUCKET_NAME,
      Bucket: 'audio-archive-initial-dev-setup',
      Key: key,
    };

    if (contentDisposition) {
      params.ResponseContentDisposition = contentDisposition;
    }

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    // const seconds = 86400;
    const seconds = 60;

    const url = await getSignedUrl(s3, command, { expiresIn: seconds });

    // console.log('key', key);
    // console.log('url', url);
    return url;
  }

  // FOR MORE THAN ONE - TODO: CONSIDER RENAMING
  static async getSignedUrlsForProducts(
    products: Product[]
  ): Promise<Product[] | any> {
    const productsWithSignedUrls = await Promise.all(
      products.map(async (product) => ({
        ...product,
        // @ts-ignore
        imgS3Url: await this.getObjectSignedUrl(product.imgS3Key),

        digitalFileS3Url: await this.getObjectSignedUrl(
          // @ts-ignore
          product.digitalFileS3Key
        ),
      }))
    );
    return productsWithSignedUrls;
  }

  static async getSignedUrlsForOneProduct(product: Product): Promise<Product> {
    const productWithSignedUrls = { ...product };

    productWithSignedUrls.imgS3Url = await this.getObjectSignedUrl(
      // @ts-ignore
      product.imgS3Key
    );
    productWithSignedUrls.digitalFileS3Url = await this.getObjectSignedUrl(
      // @ts-ignore
      product.digitalFileS3Key
    );

    // product.imgS3Url: await this.getObjectSignedUrl(product.imgS3Key),
    // product.digitalFileS3Url: await this.getObjectSignedUrl(product.digitalFileS3Key),

    // console.log(productWithSignedUrls);

    return productWithSignedUrls;
  }

  static async getSignedUrlsForAppUsers(
    appUsers: AppUser[]
  ): Promise<AppUser[]> {
    const appUsersWithSignedUrls = await Promise.all(
      appUsers.map(async (appUser) => ({
        ...appUser,
        // @ts-ignore
        avatarS3Url: await this.getObjectSignedUrl(appUser.avatarS3Key),
      }))
    );
    return appUsersWithSignedUrls;
  }

  static async getSignedUrlsForOneAppUser(appUser: AppUser): Promise<AppUser> {
    const appUserWithSignedUrls = { ...appUser };

    appUserWithSignedUrls.avatarS3Url = await this.getObjectSignedUrl(
      // @ts-ignore
      appUser.avatarS3Key
    );

    return appUserWithSignedUrls;
  }

  static async getSignedUrls(
    s3Keys: string[]
  ): Promise<{ [s3Key: string]: string }> {
    const signedUrls = await Promise.allSettled(
      s3Keys.map((s3Key) => this.getObjectSignedUrl(s3Key))
    );

    return s3Keys.reduce((acc, s3Key, index) => {
      const result = signedUrls[index];
      acc[s3Key] =
        result.status === 'fulfilled' ? result.value : 'Error or URL not found';

      return acc;
    }, {});
  }

  //   // const fulfilledProductValues = results
  //   //   .filter((result) => result.status === 'fulfilled')
  //   //   .map((result) => result.value);

  //   const fulfilledProductValues = results
  //     .filter(
  //       (result): result is PromiseFulfilledResult<Product> =>
  //         result.status === 'fulfilled'
  //     )
  //     .map((result) => result.value);

  //   return fulfilledProductValues;
  // }

  // static async uploadFile({ fileBuffer, fileName, mimetype }): Promise<any> {
  static async uploadFile(file, newImgS3Key?, newFileType?): Promise<any> {
    try {
      // const imgS3Key = `${newImgS3Key}.${newFileType}` || generateRandomBytes();
      const imgS3Key = generateRandomBytes();
      const bucketName =
        process.env.AWS_BUCKET_NAME || 'audio-archive-initial-dev-setup';
      const mimetype = file.mimetype;
      const buffer = file.buffer;

      const uploadParams = {
        Bucket: bucketName,
        Key: imgS3Key,
        ContentType: mimetype,
        Body: buffer,
      };
      console.log(uploadParams);

      await s3.send(new PutObjectCommand(uploadParams));

      console.log(`${CONTEXT}::uploadFile - SUCCESS`);
      return imgS3Key;
    } catch (error) {
      console.log(`${CONTEXT}::uploadFile - FAILED`);
      throw new Error(error);
    }
  }

  static async deleteFile(fileName: string) {
    const deleteParams = {
      // Bucket: process.env.AWS_BUCKET_NAME,
      Bucket: 'audio-archive-initial-dev-setup',
      Key: fileName,
    };

    return s3.send(new DeleteObjectCommand(deleteParams));
  }

  static async deleteFiles(s3Keys: string[]) {
    const keysToDelete = s3Keys.filter((key) => !key.includes('seed'));

    const deleteParams = {
      // Bucket: process.env.AWS_BUCKET_NAME,
      Bucket: 'audio-archive-initial-dev-setup',
      Delete: {
        Objects: keysToDelete.map((key) => ({ Key: key })),
      },
    };

    return s3.send(new DeleteObjectsCommand(deleteParams));
  }
}

export default S3Service;
