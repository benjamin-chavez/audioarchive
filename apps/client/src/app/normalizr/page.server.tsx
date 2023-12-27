import Container from '@/components/container';
import { normalize, schema } from 'normalizr';
import ClientPage from './page.client';

async function getData() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/search/test`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export const modifyData = (dataFilters) => {
  // console.log('dataFilters.filters:', dataFilters.filters);
  if (dataFilters) {
    const modifiedData = Object.keys(dataFilters).map((key) => {
      return {
        id: key,
        name: key.toUpperCase(),
        options: dataFilters[key]?.map((option) => {
          return {
            id: option.toLowerCase(),
            label: option.toUpperCase().replace('_', ' '),
            checked: false,
          };
        }),
      };
    });

    return modifiedData;
  }
};

// apps/client/src/app/normalizr/page.tsx
export default async function Page() {
  const { data } = await getData();

  if (!data) {
    return <div>No Data</div>;
  }
  const dataFilters = data.filters;
  const modifiedData = modifyData(dataFilters);

  const bpmRangeEntity = new schema.Entity('bpmRange');
  const option = new schema.Entity('options');
  const category = new schema.Entity('categories', {
    options: [option],
  });

  const normalizedData = normalize(modifiedData, [category]);

  // console.log('data: ', JSON.stringify(normalizedData, null, 2));

  return (
    <Container>
      <h1>Normalizr Server Page</h1>

      <div className="mt-10">
        <ClientPage normalizedData={normalizedData} />
      </div>
    </Container>
  );
}
