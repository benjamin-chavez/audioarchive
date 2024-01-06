// apps/client/src/app/dogs/page.tsx
'use client';

import Container from '@/components/container';
import { useFetchBreedsQuery } from './dogs-api.slice';
import { useState } from 'react';

function Page() {
  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  return (
    <Container>
      <h1>Dogs Page</h1>

      <div className="text-black">
        <p>Dogs to fetch:</p>

        <select
          value={numDogs}
          onChange={(e) => setNumDogs(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <h2>Number of dogs fetched: {data.length}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
export default Page;
