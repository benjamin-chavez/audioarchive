// import { Knex } from 'knex';
// import StripeService from '../../../services/stripe.service';

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
//       genre: 'Bass House',
//       software: 'Ableton',
//       bpm: 126,
//       key: '',
//       label: 'Seasonal Frequency',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'amin-chavez-the-look-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 2,
//       accountId: 1,
//       name: 'Booty',
//       genre: 'Bass House',
//       software: 'Ableton',
//       bpm: 127,
//       key: '',
//       label: '',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'amin-chavez-Booty-seed.png',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Dred 84',
//       // genre: 'Breaks / Breakbeat / UK Bass'
//       genre: 'Breaks',
//       software: 'Ableton',
//       bpm: 99,
//       key: 'F Minor',
//       label: 'Hardcore Energy',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'keefe-dred-84-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Friction',
//       // genre: 'Techno (Raw / Deep / Hypnotic)',
//       genre: 'Techno',
//       software: 'Ableton',
//       bpm: 145,
//       key: 'F Major',
//       label: 'Fantastic Voyage',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'keefe-friction-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 3,
//       accountId: 2,
//       name: 'Let Me - KEEFE Roller Mix',
//       genre: 'House',
//       software: 'Ableton',
//       bpm: 135,
//       key: 'F Major',
//       label: 'Vassnova',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'Keefe-let-me-seed.webp',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 4,
//       accountId: 3,
//       name: 'Translation',
//       genre: 'Deep House',
//       software: 'Ableton',
//       bpm: 117,
//       key: 'F Major',
//       label: 'Vassnova',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//     {
//       appUserId: 4,
//       accountId: 3,
//       name: 'Division',
//       genre: 'Deep House',
//       software: 'Ableton',
//       bpm: 120,
//       key: 'F Major',
//       label: '',
//       description: 'product description',
//       price: 29.99,
//       imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
//       digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
//       created_at: currentTimestamp,
//       updated_at: currentTimestamp,
//     },
//   ];

//   // const { data: stripeProducts } = await StripeService.getProducts();

//   // productSeeds.forEach(async (seed) => {
//   //   const stripeProductId = await StripeService.createProduct(seed);
//   //   await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
//   // });
//   for (const seed of productSeeds) {
//     const stripeProductId = await StripeService.createProduct(seed);
//     await knex(TABLE_NAME).insert({ ...seed, stripeProductId });
//   }
// }

import { Knex } from 'knex';

const TABLE_NAME = 'products';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date();

  // Inserts seed entries
  await knex(TABLE_NAME).insert([
    {
      appUserId: 2,
      accountId: 1,
      name: 'The Look',
      genre: 'Bass House',
      software: 'Ableton',
      bpm: 126,
      key: '',
      label: 'Seasonal Frequency',
      description: '',
      price: 29.99,
      imgS3Key: 'amin-chavez-the-look-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 2,
      accountId: 1,
      name: 'Booty',
      genre: 'Bass House',
      software: 'Ableton',
      bpm: 127,
      key: '',
      label: '',
      description: '',
      price: 29.99,
      imgS3Key: 'amin-chavez-Booty-seed.png',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Dred 84',
      // genre: 'Breaks / Breakbeat / UK Bass'
      genre: 'Breaks',
      software: 'Ableton',
      bpm: 99,
      key: 'F Minor',
      label: 'Hardcore Energy',
      description: '',
      price: 29.99,
      imgS3Key: 'keefe-dred-84-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Friction',
      // genre: 'Techno (Raw / Deep / Hypnotic)',
      genre: 'Techno',
      software: 'Ableton',
      bpm: 145,
      key: 'F Major',
      label: 'Fantastic Voyage',
      description: '',
      price: 29.99,
      imgS3Key: 'keefe-friction-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 3,
      accountId: 2,
      name: 'Let Me - KEEFE Roller Mix',
      genre: 'House',
      software: 'Ableton',
      bpm: 135,
      key: 'F Major',
      label: 'Vassnova',
      description: '',
      price: 29.99,
      imgS3Key: 'Keefe-let-me-seed.webp',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 4,
      accountId: 3,
      name: 'Translation',
      genre: 'Deep House',
      software: 'Ableton',
      bpm: 117,
      key: 'F Major',
      label: 'Vassnova',
      description: '',
      price: 29.99,
      imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      appUserId: 4,
      accountId: 3,
      name: 'Division',
      genre: 'Deep House',
      software: 'Ableton',
      bpm: 120,
      key: 'F Major',
      label: '',
      description: '',
      price: 29.99,
      imgS3Key: 'safety-or-numbers-cohesionep-seed.jpg',
      digitalFileS3Key: 'ableton-audio-archive-demo-file-project-seed.zip',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
  ]);
}
