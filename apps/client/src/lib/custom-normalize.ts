// apps/client/src/lib/custom-normalize.ts

const incomingData = [
  {
    id: 1,
    pluginName: 'Serum',
    manufacturer: 'Xfer Records',
    pluginVersion: '',
    dawId: null,
    pluginProductUrl: 'https://xferrecords.com/products/serum/',
    isApproved: true,
    createdAt: {},
    updatedAt: {},
  },
  {
    id: 2,
    pluginName: 'Ozone 11',
    manufacturer: 'iZotope',
    pluginVersion: '9',
    dawId: null,
    pluginProductUrl: 'https://www.izotope.com/en/products/ozone.html',
    isApproved: true,
    createdAt: {},
    updatedAt: {},
  },
  {
    id: 3,
    pluginName: 'Massive',
    manufacturer: 'Native Instuments',
    pluginVersion: '',
    dawId: null,
    pluginProductUrl:
      'https://www.native-instruments.com/en/products/komplete/synths/massive/',
    isApproved: true,
    createdAt: {},
    updatedAt: {},
  },
  {
    id: 4,
    pluginName: 'Massive X',
    manufacturer: 'Native Instuments',
    pluginVersion: '9',
    dawId: null,
    pluginProductUrl:
      'https://www.native-instruments.com/en/products/komplete/synths/massive-x/',
    isApproved: true,
    createdAt: {},
    updatedAt: {},
  },
];

const keys = ['plugins'];

export const normalizeData = (incomingData: unknown[], keys: unknown[]) => {
  const normalizedData = keys.reduce((acc, k) => {
    // @ts-ignore
    acc[k] = { byId: {}, allIds: [] };
    return acc;
  }, {});

  incomingData.forEach((item) => {
    // @ts-ignore
    const id = item.id;
    const key = keys[0];
    // @ts-ignore
    normalizedData[key].byId[id] = item;

    // @ts-ignore
    normalizedData[key].allIds.push(`${id}`);
    // normalizedData[key].allIds.push(`${key.slice(0, -1)}${id}`);
  });

  // console.log(JSON.stringify(normalizedData, null, 2));
  return normalizedData;
};

// console.log(JSON.stringify(normalizeData(incomingData, keys), null, 2));
