import { Knex } from 'knex';

const TABLE_NAME = 'plugins';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  // const currentTimestamp = new Date().toISOString();

  await knex(TABLE_NAME).insert([
    {
      name: 'Serum',
      company: 'Xfer Records',
      version: '',
      daw_id: '',
      product_url: 'https://xferrecords.com/products/serum/',
    },
    {
      name: 'Ozone 11',
      company: 'iZotope',
      version: '9',
      daw_id: '',
      product_url: 'https://www.izotope.com/en/products/ozone.html',
    },
    {
      name: 'Massive',
      company: 'Native Instuments',
      version: '',
      daw_id: '',
      product_url:
        'https://www.native-instruments.com/en/products/komplete/synths/massive/',
    },
    {
      name: 'Massive X',
      company: 'Native Instuments',
      version: '9',
      daw_id: '',
      product_url:
        'https://www.native-instruments.com/en/products/komplete/synths/massive-x/',
    },
  ]);
}
