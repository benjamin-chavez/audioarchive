// apps/client/src/app/(features)/pokemon/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useGetPokemonByNameQuery } from './pokemon-api.slice';
import Container from '@/components/container';

function Page() {
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetPokemonByNameQuery(page);
  const pokemon = data?.results ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom && !isFetching) {
        console.log('Fetching Data');
        setPage(page + 1);

        console.log(JSON.stringify(pokemon, null, 2));
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching]);

  return (
    <Container>
      <h1>RTK Query: Infinite Pokemon Scroll</h1>

      <div className="mt-4 space-y-4">
        {pokemon.map((pokemon) => (
          <div className="h-20 bg-orange-800 rounded w-96">
            <h3 key={pokemon.name}>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Page;
