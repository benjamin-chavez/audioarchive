import { Knex } from 'knex';

const TABLE_NAME = 'plugins';

export async function seed(knex: Knex): Promise<void> {
  console.log(`Seeding ${TABLE_NAME} seeds`);
  await knex(TABLE_NAME).del();

  // const currentTimestamp = new Date().toISOString();

  await knex(TABLE_NAME).insert([
    {
      plugin_name: 'Serum',
      manufacturer: 'Xfer Records',
      plugin_version: '',
      daw_id: null,
      plugin_product_url: 'https://xferrecords.com/products/serum/',
      is_approved: true,
    },
    {
      plugin_name: 'Ozone 11',
      manufacturer: 'iZotope',
      plugin_version: '9',
      daw_id: null,
      plugin_product_url: 'https://www.izotope.com/en/products/ozone.html',
      is_approved: true,
    },
    {
      plugin_name: 'Massive',
      manufacturer: 'Native Instuments',
      plugin_version: '',
      daw_id: null,
      plugin_product_url:
        'https://www.native-instruments.com/en/products/komplete/synths/massive/',
      is_approved: true,
    },
    {
      plugin_name: 'Massive X',
      manufacturer: 'Native Instuments',
      plugin_version: '9',
      daw_id: null,
      plugin_product_url:
        'https://www.native-instruments.com/en/products/komplete/synths/massive-x/',
      is_approved: true,
    },
    // {
    //   plugin_name: 'Thermal',
    //   manufacturer: 'Output',
    //   plugin_version: '',
    //   daw_id: '',
    //   plugin_product_url: 'https://output.com/products/thermal',
    // is_approved: true,
    // },
    {
      plugin_name: 'Krush',
      manufacturer: 'Tritik',
      plugin_version: '',
      daw_id: null,
      plugin_product_url: 'https://www.tritik.com/product/krush/',
      is_approved: false,
    },
  ]);
}
