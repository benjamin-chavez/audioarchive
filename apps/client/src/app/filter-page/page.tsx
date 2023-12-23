// apps/client/src/app/filter-page/page.tsx

import Container from '@/components/container';
import container from '@/components/container';

export const filters = {
  genre_name: {
    name: 'genre',
    options: {
      bass_house: {
        label: 'labbass house',
        checked: false,
      },
      breakbeat: {
        label: 'breakbeat',
        checked: true,
      },
    },
  },
  key: {
    name: 'key',
    options: {
      b_major: {
        label: 'b major',
        checked: false,
      },
      'f♯/g♭ major': {
        label: 'f♯/g♭ major',
        checked: false,
      },
      'd♭ major': {
        label: 'D♭ Major',
        checked: false,
      },
    },
  },
  DAW: {
    name: 'DAW',
    options: {
      ableton: {
        label: 'Ableton',
        checked: false,
      },
      'fl studio': {
        label: 'FL Studio',
        checked: false,
      },
    },
  },
};

export default function Page() {
  return (
    <>
      <Container>
        <h1 className="font-bold text-xl underline">Filters</h1>
        {Object.entries(filters).map(([key, val]) => {
          return (
            <div>
              <p className="text-red-500/50">{key}</p>
              {Object.entries(val.options).map(([key1, val1]) => {
                return (
                  <div className="pl-5 ">
                    <input type="checkbox" checked={val1['checked']} />
                    <p className="pl-2">{key1}</p>
                    {/* {val1['checked'].toString()} */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Container>
    </>
  );
}
