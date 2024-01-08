import axios from 'axios';
import { Knex } from 'knex';
import ProductService from '../../../services/product.service';
// import StripeService from '../../../services/stripe.service';
import productData from '../data/good-product-seed-data-with-spotify-data.json';
import { faker } from '@faker-js/faker';
import { GENRE_VALUES } from '../../migrations/20230902000001_create_genre_lookup_table';

const TABLE_NAME = 'products';
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date();

  const productSeeds = productData;

  for (const seed of productSeeds) {
    try {
      // const stripeProductId = await StripeService.createProduct(seed);
      // await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
      // await knex(TABLE_NAME).insert({ ...seed });

      const product = seed;
      const pictureBuffer = await axios.get(product.imageUrl, {
        responseType: 'arraybuffer',
      });
      const pictureFile = {
        mimetype: pictureBuffer.headers['content-type'],
        buffer: Buffer.from(pictureBuffer.data),
      };
      const newImgS3Key = `${seed.name
        .replace(/\s+/g, '-')
        .toLowerCase()}-product-img-seed`;
      const newFileType = pictureFile.mimetype.split('/')[1];
      // product.imgS3Key = await S3Service.uploadFile(
      //   pictureFile,
      //   newImgS3Key,
      //   newFileType
      // );
      product.imgS3Key = `${newImgS3Key}.${newFileType}`;

      const { id: appUserId } = await knex('app_users')
        .first('id')
        .where('spotify_id', product.artistId);

      let { id: accountId } = await knex('accounts').select('id').first();

      accountId =
        product.spotifyId === '1HBoMknv2KI9eI7tTnb6vZ'
          ? accountId + 1
          : accountId;

      const price = seed.price > 50 ? 29.99 : seed.price;
      const genre =
        GENRE_VALUES[
          faker.number.int({ min: 0, max: GENRE_VALUES.length - 1 })
        ];

      const productToCreate = {
        appUserId: appUserId,
        accountId: accountId,
        name: seed.name,
        // genre_id: 4,
        genre_name: genre,
        daw: seed.daw,
        bpm: seed.bpm,
        key: seed.key,
        label: '',
        description: seed.description,
        price,
        imgS3Key: seed.imgS3Key,
        status: 'published',
        imgS3Url: '',
        digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      };

      // productToCreate.imgS3Url = await S3Service.getObjectSignedUrl(

      const newProduct = await ProductService.addNewProduct(productToCreate);
    } catch (error) {
      console.log(error, seed);
    }
  }
}
