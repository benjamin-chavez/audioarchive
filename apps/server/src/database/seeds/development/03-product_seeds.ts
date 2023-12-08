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
//       daw: 'Ableton',
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
//       daw: 'Ableton',
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
genre_id: 'Breaks / Breakbeat / UK Bass';
// genre_id: 'Breaks',
//       daw: 'Ableton',
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
//       daw: 'Ableton',
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
// genre_id: 'House',
//       daw: 'Ableton',
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
// genre_id: 'Deep House',
//       daw: 'Ableton',
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
//       daw: 'Ableton',
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

import { Knex } from 'knex';
// import StripeService from '../../../services/stripe.service';

const TABLE_NAME = 'products';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date();

  const productSeeds = [
    {
      appUserId: 2,
      accountId: 1,
      name: 'The Look',
      genre_id: 1,
      daw: 'Ableton',
      bpm: 126,
      key: '',
      label: 'Seasonal Frequency',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'amin-chavez-the-look-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 2,
      accountId: 1,
      name: 'Booty',
      genre_id: 1,
      daw: 'Ableton',
      bpm: 127,
      key: '',
      label: '',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'amin-chavez-Booty-seed.png',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Dred 84',
      // genre_id: 'Breaks / Breakbeat / UK Bass'
      genre_id: 3,
      daw: 'Ableton',
      bpm: 99,
      key: 'F Minor',
      label: 'Hardcore Energy',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'keefe-dred-84-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Friction',
      // genre_id: 'Techno (Raw / Deep / Hypnotic)',
      genre_id: 9,
      daw: 'Ableton',
      bpm: 145,
      key: 'F Major',
      label: 'Fantastic Voyage',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'keefe-friction-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Let Me - KEEFE Roller Mix',
      genre_id: 7,
      daw: 'Ableton',
      bpm: 135,
      key: 'F Major',
      label: 'Vassnova',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'Keefe-let-me-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 4,
      accountId: 3,
      name: 'Translation',
      genre_id: 4,
      daw: 'Ableton',
      bpm: 117,
      key: 'F Major',
      label: 'Vassnova',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      appUserId: 4,
      accountId: 3,
      name: 'Division',
      genre_id: 4,
      daw: 'Ableton',
      bpm: 120,
      key: 'F Major',
      label: '',
      description: 'product description',
      price: 29.99,
      imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
  ];

  // const { data: stripeProducts } = await StripeService.getProducts();

  // productSeeds.forEach(async (seed) => {
  //   const stripeProductId = await StripeService.createProduct(seed);
  //   await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
  // });

  for (const seed of productSeeds) {
    // const stripeProductId = await StripeService.createProduct(seed);
    // await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
    await knex(TABLE_NAME).insert({ ...seed });
  }
}
