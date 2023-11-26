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

if (
  !process.env.AWS_ACCESS_KEY ||
  !process.env.AWS_SECRET_KEY ||
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_BUCKET_REGION
) {
  throw new Error('One or more AWS Environment Variables are not set');
}

export const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

class S3Service {
  // FOR ONLY ONE - TODO: CONSIDER RENAMING
  static async getObjectSignedUrl(
    key: string,
    contentDisposition?: string
  ): Promise<string> {
    const params: any = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    if (contentDisposition) {
      params.ResponseContentDisposition = contentDisposition;
    }

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 86400;

    const url = await getSignedUrl(s3, command, { expiresIn: seconds });

    // console.log('key', key);
    // console.log('url', url);
    return url;
  }

  // FOR MORE THAN ONE - TODO: CONSIDER RENAMING
  static async getSignedUrlsForProducts(
    products: Product[]
  ): Promise<Product[]> {
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
  static async uploadFile(file): Promise<any> {
    // console.log('file: ', file);
    const imgS3Key = generateRandomBytes();
    const bucketName = process.env.AWS_BUCKET_NAME;
    const mimetype = file.mimetype;
    const buffer = file.buffer;

    // console.log('imgS3Key', imgS3Key);

    const uploadParams = {
      Bucket: bucketName,
      Key: imgS3Key,
      ContentType: mimetype,
      Body: buffer,
    };
    await s3.send(new PutObjectCommand(uploadParams));

    return imgS3Key;
  }

  static async deleteFile(fileName: string) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };

    return s3.send(new DeleteObjectCommand(deleteParams));
  }

  static async deleteFiles(s3Keys: string[]) {
    const keysToDelete = s3Keys.filter((key) => !key.includes('seed'));

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: keysToDelete.map((key) => ({ Key: key })),
      },
    };

    return s3.send(new DeleteObjectsCommand(deleteParams));
  }
}

export default S3Service;
