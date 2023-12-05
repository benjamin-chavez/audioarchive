// apps/server/src/database/factories/app-user.ts

import { faker } from '@faker-js/faker';

// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../.env' });

async function appUserFactory() {
  const randomHex = faker.string.hexadecimal({ length: 25 }).substring(2);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({
    firstName,
    lastName,
    provider: 'example.fakerjs.dev',
  });
  const password = process.env.AUTH0_PASSWORD;
  const phoneNumber = faker.phone.number();
  const pictureUrl = faker.image.avatar();

  // const auth0AppUser = {
  //   email: email,
  //   phone_number: phoneNumber,
  //   // picture: 'string',
  //   // user_id: 'string',
  //   user_metadata: {
  //     first_name: firstName,
  //     last_name: lastName,
  //     username: username,
  //     // id: ,
  //   },
  //   blocked: false,
  //   email_verified: false,
  //   phone_verified: false,
  //   app_metadata: {},
  //   given_name: firstName,
  //   family_name: lastName,
  //   name: `${firstName} ${lastName}`,
  //   nickname: username,
  //   connection: 'Username-Password-Authentication',
  //   password: password,
  //   verify_email: false,
  //   username: username,
  // };

  return {
    auth_id: `auth0|${randomHex}`,
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    picture: pictureUrl,
    avatarGithub: faker.image.avatarGitHub(),
    avatarLegacy: faker.image.avatarLegacy(),
    url: faker.image.url(), //** */
    urlLoremFlicker: faker.image.urlLoremFlickr({ category: 'people' }),
    urlPicsum: faker.image.urlPicsumPhotos(),
    palceholder: faker.image.urlPlaceholder(),
  };
}

console.log(appUserFactory());
