// apps/client/src/app/dogs2/page.tsx
// import axios from 'axios';
// // export function getDogs() {
// //   return axios
// //     .get(`${DOGS_API_URL}`, {
// //       params: { _sort: 'tite' },
// //     })
// //     .then((res) => res.data);
// // }

// apps/client/src/app/dogs/page.tsx
'use client';

import Container from '@/components/container';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Breed } from '../dogs/dogs-api.slice';

// API details
const DOGS_API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311';
const DOGS_API_URL = 'https://api.thedogapi.com/v1/breeds';

async function getDogs(numDogs: number): Promise<Breed[]> {
  const response = await fetch(`${DOGS_API_URL}?limit=${numDogs}`, {
    headers: {
      'x-api-key': DOGS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function Page() {
  const [numDogs, setNumDogs] = useState(10);

  const dogsQuery = useQuery({
    queryKey: ['dogs', numDogs],
    queryFn: () => getDogs(numDogs),
    staleTime: 60 * 1000,
  });

  if (dogsQuery.isLoading) return <h1>Loading...</h1>;
  if (dogsQuery.isError) {
    return <pre>{JSON.stringify(dogsQuery.error)}</pre>;
  }

  const dogs = dogsQuery.data || [];

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
        <h2>Number of dogs fetched: {dogs.length}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((breed) => (
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
