// // import axios from 'axios';
// import artists from './app-user-seed-data.json';

// // const artists = [
// //   {
// //     auth_id: 'auth0|15bc5778036ff1ddd3670124',
// //     display_name: 'AC Slater',
// //     first_name: 'AC',
// //     last_name: 'Slater',
// //     username: 'ac-slater',
// //     email: 'ac-slater@faker-mail.dev',
// //     avatarS3Key: 'ac-slater-avatar-seed.webp',
// //   },
// //   {
// //     auth_id: 'auth0|d419ef8f8b97b027e13adefa',
// //     display_name: 'Aluna',
// //     first_name: 'Aluna',
// //     last_name: '',
// //     username: 'aluna',
// //     email: 'aluna@faker-mail.dev',
// //     avatarS3Key: 'aluna-avatar-seed.webp',
// //   },
// //   {
// //     auth_id: 'auth0|926c18935acc534e5c0aaa22',
// //     display_name: 'Bassjackers',
// //     first_name: 'Bassjackers',
// //     last_name: '',
// //     username: 'bassjackers',
// //     email: 'bassjackers@faker-mail.dev',
// //     avatarS3Key: 'bassjackers-avatar-seed.webp',
// //   },
// //   {
// //     auth_id: 'auth0|eaf3b0df387a1e36b7b407c4',
// //     display_name: 'Ben Miller',
// //     first_name: 'Ben',
// //     last_name: 'Miller (Aus)',
// //     username: 'ben-miller-(aus)',
// //     email: 'ben-miller-(aus)@faker-mail.dev',
// //     avatarS3Key: 'ben-miller-(aus)-avatar-seed.webp',
// //   },
// //   {
// //     auth_id: 'auth0|510a47a6d4e1bd0ca45e1c8e',
// //     display_name: 'Big Gigantic',
// //     first_name: 'Big',
// //     last_name: 'Gigantic',
// //     username: 'big-gigantic',
// //     email: 'big-gigantic@faker-mail.dev',
// //     avatarS3Key: 'big-gigantic-avatar-seed.webp',
// //   },
// // ];

// const spotifyToken =
//   'BQCG5vAVO-145AL0qDa2aTpAPlKpuGdFX_24fAJQAbIbv5t_MIMFOI81cwCARWC8s_5qnYS0EY7axa9mbAQVIuuxsaWQdTaepPR-E5MapTTXIbAaNrc';
// const finalArtistData = {};
// const failed = [];

// const getSpotifyArtistIds = async () => {
//   for (const artist of artists) {
//     // @ts-ignore
//     const artistName = artist.display_name;
//     console.log(artistName);

//     const res = await fetch(
//       `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=30&offset=0`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${spotifyToken}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw Error('err');
//     }

//     const spotifyArtists: any = await res.json();

//     let found = false;
//     for (const spArtist of spotifyArtists.artists.items) {
//       if (spArtist.name.toLowerCase() === artistName.toLowerCase()) {
//         // @ts-ignore
//         finalArtistData[artistName] = spArtist.id;
//         found = true;
//         break;
//       }
//     }

//     if (!found) {
//       failed.push(artist);
//     }
//   }

//   console.log('Not Found: ', failed.length, failed);
//   console.log(finalArtistData);
// };

// // const main = async () => {
// //   const await getSpotifyArtistIds();
// // };
// getSpotifyArtistIds();

/////////////////////////////////
import fs from 'fs';
import artists from './app-user-seed-data.json';

const spotifyToken = '';

const getSpotifyArtistIds = async () => {
  const results = await Promise.allSettled(
    artists.map(async (artist) => {
      const artistName = artist.display_name;
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=30&offset=0`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch Spotify data for ${artistName}`);
        }

        const spotifyArtists: any = await res.json();

        const matchingArtist = spotifyArtists.artists.items.find(
          (spArtist) => spArtist.name.toLowerCase() === artistName.toLowerCase()
        );
        console.log(matchingArtist);
        return matchingArtist
          ? {
              ...artist,
              spotify_id: matchingArtist.id,
              links: matchingArtist.external_urls,
            }
          : { ...artist, spotify_id: null, links: {} };
      } catch (error) {
        return { ...artist, spotify_id: null };
      }
    })
  );

  // console.log('Not Found: ', failed.length, failed);
  return results.map((res) => {
    // @ts-ignore
    return res.value;
  });
  return results;
};

(async () => {
  const updatedData = await getSpotifyArtistIds();
  // console.log(updatedData);
  const jsonData = JSON.stringify(updatedData, null, 2);

  const filename =
    './apps/server/src/database/seeds/app-user-seed-data-with-spotify.json';
  fs.writeFileSync(filename, jsonData, 'utf8');
  console.log('data printed to: ', filename);
})();
