import { Knex } from 'knex';
// import argon2 from 'argon2';

const TABLE_NAME = 'app_users';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date().toISOString();

  await knex(TABLE_NAME).insert([
    {
      auth_id: 'google-oauth2|100469702973978516051',
      first_name: 'Ben',
      last_name: 'Chavez',
      username: 'benjamin-chavez',
      email: 'ben.m.chavez@gmail.com',
      // avatar: '',
      // created_at: currentTimestamp,
      // updated_at: currentTimestamp,
    },
    {
      auth_id: 'auth0|650caf196371a502e0233912',
      first_name: 'Amin',
      last_name: 'Chavez',
      username: 'amin-chavez',
      email: 'aminchavez.music@gmail.com',
      avatarS3Key: 'amin-chavez-avatar-seed.jpeg',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      auth_id: 'auth0|6519fd529745d9c63c2975ae',
      first_name: 'Evan',
      last_name: 'Keefe',
      username: 'KEEFE',
      email: 'keefe.music@keefe.com',
      avatarS3Key: 'keefe-avatar-seed.webp',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      auth_id: 'auth0|6519fe7fe51e9baa2514460d',
      first_name: 'Nate',
      last_name: 'Pawelczyk',
      username: 'SafetyOrNumbers',
      email: 'router.music@router.com',
      // avatar: '',
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
  ]);
}
