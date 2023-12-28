// apps/client/src/app/normalizr/page.tsx
import 'server-only';

import { modifyData } from '@/lib/normalize';
import { normalize, schema } from 'normalizr';
import ClientPage from './client-page';

const fetchData = async () => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const res = await fetch(`${BASE_URL}/search/test`);

  if (!res.ok) {
    // Handle error appropriately
    throw new Error('Failed to fetch initial Filter data');
  }

  const { data } = await res.json();

  if (!data) {
    return;
  }

  const modifiedData = modifyData(data.filters);
  // const bpmRangeEntity = new schema.Entity('bpmRange');
  const option = new schema.Entity('options');
  const category = new schema.Entity('categories', {
    options: [option],
  });

  const normalizedData = normalize(modifiedData, [category]);
  return normalizedData;
};

async function page() {
  const normalizedFilterData = await fetchData();

  return (
    <div>
      <ClientPage normalizedFilterData={normalizedFilterData} />
    </div>
  );
}

export default page;
