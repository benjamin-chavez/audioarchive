// import { Knex } from 'knex';
// // import StripeService from '../../../services/stripe.service';

// const TABLE_NAME = 'products';

// export async function seed(knex: Knex): Promise<void> {
//   // Deletes ALL existing entries
//   await knex(TABLE_NAME).del();

//   const currentTimestamp = new Date();

//   const productSeeds = [
//     {
//       appUserId: 2,
//       accountId: 1,
//       name: 'The Look',
// genre_id: 'Bass House',
// daw: 'Ableton',
// daw: 'ableton'
//       bpm: 126,
//       key: '',
//       label: 'Seasonal Frequency',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'amin-chavez-the-look-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 2,
//       accountId: 1,
//       name: 'Booty',
// genre_id: 'Bass House',
// daw: 'Ableton',
// daw: 'ableton'
//       bpm: 127,
//       key: '',
//       label: '',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'amin-chavez-Booty-seed.png',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Dred 84',
// genre_id: 'Breaks / Breakbeat / UK Bass';
// genre_id: 'Breaks',
// daw: 'Ableton',
// daw: 'ableton'
//       bpm: 99,
//       key: 'F Minor',
//       label: 'Hardcore Energy',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'keefe-dred-84-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Friction',

// genre_id: 'Techno (Raw / Deep / Hypnotic)',
// genre_id: 'Techno',
// daw: 'Ableton',
// daw: 'ableton'
//       bpm: 145,
//       key: 'F Major',
//       label: 'Fantastic Voyage',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'keefe-friction-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Let Me - KEEFE Roller Mix',

// genre_id:
// daw: 'Ableton',
// daw: 'ableton'
//       bpm: 135,
//       key: 'F Major',
//       label: 'Vassnova',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'Keefe-let-me-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 4,
//       accountId: 3,
//       name: 'Translation',
// genre_id:

// daw: 'Ableton',
//       bpm: 117,
//       key: 'F Major',
//       label: 'Vassnova',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 4,
//       accountId: 3,
//       name: 'Division',

// genre_id: 'Deep House',

// daw: 'ableton'
//       bpm: 120,
//       key: 'F Major',
//       label: '',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       // created_at: currentTimestamp,
//       // updated_at: currentTimestamp,
//     },
//   ];

//   // const { data: stripeProducts } = await StripeService.getProducts();

//   // productSeeds.forEach(async (seed) => {
//   //   const stripeProductId = await StripeService.createProduct(seed);
//   //   await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
//   // });

//   for (const seed of productSeeds) {
//     // const stripeProductId = await StripeService.createProduct(seed);
//     // await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
//     await knex(TABLE_NAME).insert({ ...seed });
//   }
// }
import axios from 'axios';
import fs from 'fs';
import { Knex } from 'knex';
import S3Service from '../../../services/s3.service';
import ProductService from '../../../services/product.service';
// import StripeService from '../../../services/stripe.service';
import productData from '../data/good-product-seed-data-with-spotify-data.json';

const TABLE_NAME = 'products';
export async function seed(knex: Knex): Promise<void> {
  // let productData: any[];
  // try {
  //   // Read the JSON file
  //   // const rawData = fs.readFileSync(
  //   //   '../data/good-product-seed-data-with-spotify-data.json',
  //   //   'utf8'
  //   // );

  //   // Parse the JSON data
  //   productData: any = JSON.parse(rawData);

  //   // Now you can use 'products' array in your code
  //   // console.log(products);
  // } catch (error) {
  //   console.error('Error reading or parsing the JSON file:', error);
  // }

  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date();

  const productSeeds = productData;
  // [
  //   // {
  //   //   appUserId: 2,
  //   //   accountId: 1,
  //   //   name: 'The Look',
  //   //   genre_id: 1,
  //   //   genre_name: 'Bass House',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 126,
  //   //   key: '',
  //   //   label: 'Seasonal Frequency',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'amin-chavez-the-look-seed.jpg',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 2,
  //   //   accountId: 1,
  //   //   name: 'Booty',
  //   //   genre_id: 1,
  //   //   genre_name: 'Bass House',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 127,
  //   //   key: '',
  //   //   label: '',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //// imgS3Key: 'amin-chavez-Booty-seed.png',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 3,
  //   //   accountId: 2,
  //   //   name: 'Dred 84',
  //   //   // genre_id: 'Breaks / Breakbeat / UK Bass'
  //   //   // genre_id: 'Breaks / Breakbeat /nameUK Bass'
  //   //   genre_id: 3,
  //   //   genre_name: 'Breaks',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 99,
  //   //   key: 'F Minor',
  //   //   label: 'Hardcore Energy',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'keefe-dred-84-seed.webp',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 3,
  //   //   accountId: 2,
  //   //   name: 'Friction',
  //   //   genre_id: 9,
  //   //   // genre_name: 'Techno (Raw / Deep / Hypnotic)',
  //   //   genre_name: 'Techno',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 145,
  //   //   key: 'F Major',
  //   //   label: 'Fantastic Voyage',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'keefe-friction-seed.webp',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 3,
  //   //   accountId: 2,
  //   //   name: 'Let Me - KEEFE Roller Mix',
  //   //   genre_id: 7,
  //   //   genre_name: 'House',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 135,
  //   //   key: 'F Major',
  //   //   label: 'Vassnova',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'Keefe-let-me-seed.webp',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 4,
  //   //   accountId: 3,
  //   //   name: 'Translation',
  //   //   genre_id: 4,
  //   //   genre_name: 'Deep House',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 117,
  //   //   key: 'F Major',
  //   //   label: 'Vassnova',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // {
  //   //   appUserId: 4,
  //   //   accountId: 3,
  //   //   name: 'Division',
  //   //   genre_id: 4,
  //   //   genre_name: 'Deep House',
  //   //   // daw: 'Ableton',
  //   //   daw: 'ableton',
  //   //   bpm: 120,
  //   //   key: 'F Major',
  //   //   label: '',
  //   //   description: 'product description',
  //   //   price: 29.99,
  //   //   imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
  //   //   digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //   //   // created_at: currentTimestamp,
  //   //   // updated_at: currentTimestamp,
  //   // },
  //   // //
  //   {
  //     appUserId: 'undefined',
  //     accountId: 'undefined',
  //     name: 'Summer',
  //     daw: 'Logic',
  //     bpm: 125.02,
  //     key: 'E Minor',
  //     label: '',
  //     description: 'Tempore bellicus cupiditas censura casso calco coadunatio.',
  //     price: 68.95,
  //     imgS3Key: 'undefined',
  //     digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //     spotifyId: '6uoVKMfX6e1NcwZbzT584Y',
  //     imageUrl:
  //       'https://i.scdn.co/image/ab67616d0000b273f8e693bb8b0a72be6615dc6e',
  //     artistId: '1HBoMknv2KI9eI7tTnb6vZ',
  //   },
  //   {
  //     appUserId: 'undefined',
  //     accountId: 'undefined',
  //     name: 'Love Me',
  //     daw: 'Logic',
  //     bpm: 125.96,
  //     key: 'C♯ Minor',
  //     label: '',
  //     description:
  //       'Conventus quae apostolus territo tollo. Cruciamentum censura conor taceo nostrum.',
  //     price: 75.95,
  //     imgS3Key: 'undefined',
  //     digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //     spotifyId: '5n4tb0yeSqUyRMkTSJl2Cn',
  //     imageUrl:
  //       'https://i.scdn.co/image/ab67616d0000b2732226e8a08698cf5aaf93e31b',
  //     artistId: '1HBoMknv2KI9eI7tTnb6vZ',
  //   },
  //   {
  //     appUserId: 'undefined',
  //     accountId: 'undefined',
  //     name: 'Shuffle Like This',
  //     daw: 'Bitwig',
  //     bpm: 124.04,
  //     key: 'F Minor',
  //     label: '',
  //     description:
  //       'Suppono magni caste terreo. Suffragium advenio dedecor trado stillicidium vomito universe. Corporis strues via statua ver conatus ter degenero.',
  //     price: 77.82,
  //     imgS3Key: 'undefined',
  //     digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
  //     spotifyId: '5RrIc4cVHPw9umzODWucDn',
  //     imageUrl:
  //       'https://i.scdn.co/image/ab67616d0000b273519d5bb0da42be4f9bdeaffc',
  //     artistId: '1HBoMknv2KI9eI7tTnb6vZ',
  //   },
  // ];

  // const { data: stripeProducts } = await StripeService.getProducts();

  // productSeeds.forEach(async (seed) => {
  //   const stripeProductId = await StripeService.createProduct(seed);
  //   await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
  // });

  for (const seed of productSeeds) {
    try {
      // const stripeProductId = await StripeService.createProduct(seed);
      // await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
      // await knex(TABLE_NAME).insert({ ...seed });

      const product = seed;
      // console.log(product);

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
      // .then((row) => (row ? row.id : null))
      // .catch((error) => {
      //   console.error('Error fetching app user ID:', error);
      //   return;
      // });
      // console.log('appUserId', appUserId);

      const newPrice = seed.price > 50 ? 29.99 : seed.price;
      const newBpm = typeof seed.bpm === 'number' ? seed.bpm : 126;

      const productToCreate = {
        appUserId: appUserId,
        accountId: 1,
        name: seed.name,
        // genre_id: 4,
        // genre_name: 'Deep House',
        // daw: 'Ableton',
        daw: seed.daw,
        bpm: seed.bpm,
        key: seed.key,
        label: '',
        description: seed.description,
        price: newPrice,
        imgS3Key: seed.imgS3Key,
        // imgS3Key: `${newImgS3Key}.${newFileType}`,
        // imgS3Key: `${seed.name
        //   .replace(/\s+/g, '-')
        //   .toLowerCase()}-product-img-seed`,

        // imgS3Key: 'amin-chavez-the-look-seed.jpg',
        status: 'published',
        imgS3Url: '',
        digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
        // created_at: currentTimestamp,
        // updated_at: currentTimestamp,
      };

      productToCreate.imgS3Url = await S3Service.getObjectSignedUrl(
        productToCreate.imgS3Key
      );
      console.log('product.imgS3Key: ', productToCreate);
      const newProduct = await ProductService.addNewProduct(productToCreate);
    } catch (error) {
      console.log(error, seed);
    }
  }
}
