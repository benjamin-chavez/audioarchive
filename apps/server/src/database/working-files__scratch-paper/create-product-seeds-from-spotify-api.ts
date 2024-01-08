//  apps/server/src/database/seeds/creaet-product-seeds-from-spotify-api
import path from 'path';
const envPath = path.resolve(__dirname, '../../../.env');
import dotenv from 'dotenv';
dotenv.config({ path: envPath });
import { faker } from '@faker-js/faker';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import fs from 'fs';
import artists from '../seeds/data/app-user-seed-data-with-spotify.json';

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.error(
    'Missing required environment variables: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET'
  );
  process.exit(1);
}

let spotifyClient;
try {
  spotifyClient = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
  );
} catch (error) {
  console.error('Error initializing Spotify client:', error);
  process.exit(1);
}

// console.log(spotifyClient.artists);
// const artists = [
//   // {
//   //   auth_id: 'auth0|6519fd529745d9c63c2975ae',
//   //   display_name: 'KEEFE',
//   //   first_name: 'Evan',
//   //   last_name: 'Keefe',
//   //   username: 'keefe',
//   //   email: 'keefe.music@keefe.com',
//   //   avatarS3Key: 'keefe-avatar-seed.webp',
//   //   spotify_id: '4hXPtXUp0fPQZ2xpq3v8oU',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/4hXPtXUp0fPQZ2xpq3v8oU',
//   //   },
//   // },
//   // {
//   //   auth_id: 'auth0|6519fe7fe51e9baa2514460d',
//   //   display_name: 'Safety or Numbers',
//   //   first_name: 'Nate',
//   //   last_name: 'Pawelczyk',
//   //   username: 'safety-or-numbers',
//   //   email: 'router.music@router.com',
//   //   spotify_id: '1QNgopvt8ILfNVIXGU8k6g',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/1QNgopvt8ILfNVIXGU8k6g',
//   //   },
//   // },
//   // {
//   //   auth_id: 'auth0|6519fe7fe51e9baa2514460d',
//   //   display_name: 'Nathaniel Pavel',
//   //   first_name: 'Nathaniel',
//   //   last_name: 'Pavel',
//   //   username: 'nathaniel_pavel',
//   //   email: 'router.music@router.com',
//   //   avatarS3Key: 'nathaniel_pavel-avatar-seed.jpg',
//   //   spotify_id: null,
//   //   links: {},
//   // },
//   // {
//   //   auth_id: 'auth0|15bc5778036ff1ddd3670124',
//   //   display_name: 'AC Slater',
//   //   first_name: 'AC',
//   //   last_name: 'Slater',
//   //   username: 'ac-slater',
//   //   email: 'ac-slater@faker-mail.dev',
//   //   avatarS3Key: 'ac-slater-avatar-seed.webp',
//   //   spotify_id: '6EqFMCnVGBRNmwPlk2f3Uc',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/6EqFMCnVGBRNmwPlk2f3Uc',
//   //   },
//   // },
//   // {
//   //   auth_id: 'auth0|a96bed71d217ce41b9e0f1cd',
//   //   display_name: 'KREAM',
//   //   first_name: 'KREAM',
//   //   last_name: '',
//   //   username: 'kream',
//   //   email: 'kream@faker-mail.dev',
//   //   avatarS3Key: 'kream-avatar-seed.webp',
//   //   spotify_id: '0DdDnziut7wOo6cAYWVZC5',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/0DdDnziut7wOo6cAYWVZC5',
//   //   },
//   // },
//   // {
//   //   auth_id: 'auth0|926c18935acc534e5c0aaa22',
//   //   display_name: 'Bassjackers',
//   //   first_name: 'Bassjackers',
//   //   last_name: '',
//   //   username: 'bassjackers',
//   //   email: 'bassjackers@faker-mail.dev',
//   //   avatarS3Key: 'bassjackers-avatar-seed.webp',
//   //   spotify_id: '6xQvQwZQQuq9R3TdPNbcR8',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/6xQvQwZQQuq9R3TdPNbcR8',
//   //   },
//   // },
//   // {
//   //   auth_id: 'auth0|eaf3b0df387a1e36b7b407c4',
//   //   display_name: 'Ben Miller (Aus)',
//   //   first_name: 'Ben',
//   //   last_name: 'Miller (Aus)',
//   //   username: 'ben-miller-(aus)',
//   //   email: 'ben-miller-(aus)@faker-mail.dev',
//   //   avatarS3Key: 'ben-miller-(aus)-avatar-seed.webp',
//   //   spotify_id: null,
//   //   links: {},
//   // },
//   // {
//   //   auth_id: 'auth0|650caf196371a502e0233912',
//   //   display_name: 'Amin Chavez',
//   //   first_name: 'Amin',
//   //   last_name: 'Chavez',
//   //   username: 'amin-chavez',
//   //   email: 'aminchavez.music@gmail.com',
//   //   avatarS3Key: 'amin-chavez-avatar-seed.jpeg',
//   //   spotify_id: '1HBoMknv2KI9eI7tTnb6vZ',
//   //   links: {
//   //     spotify: 'https://open.spotify.com/artist/1HBoMknv2KI9eI7tTnb6vZ',
//   //   },
//   // },
// ];

// (async () => {
//   const items = await spotifyClient.search('The Beatles', ['artist']);
//   console.log(JSON.stringify(items, null, 2));
//   // console.table(
//   //   items.artists.items.map((item) => ({
//   //     name: item.name,
//   //     followers: item.followers.total,
//   //     popularity: item.popularity,
//   //   }))
//   // );
// })();

const SPOTIFY_TOKEN =
  'BQCFkNvnflNcm58OflE-4B6rDZtBEkP50zSP71y0d8pCJ5vcP_Q2ro4HqX3LwgdLg_0GJkRV-h9merostwlcP3Ywpp2x-Kg2Qk_KOG-HTMHj09OmYmU';

const musicalKeys: Record<number, string> = {
  0: 'C',
  1: 'C♯',
  2: 'D',
  3: 'D♯',
  4: 'E',
  5: 'F',
  6: 'F♯',
  7: 'G',
  8: 'G♯',
  9: 'A',
  10: 'A♯',
  11: 'B',
};

const getTracksByArtist = async (artist) => {
  const spotifyArtistId = artist.spotify_id;

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${spotifyArtistId}/top-tracks?market=US`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    }
  );

  const { tracks }: any = await res.json();

  if (!tracks) {
    return;
  }

  const updatedTracks = await Promise.allSettled(
    tracks.map(async (track) => {
      return {
        name: track.name,
        id: track.id,
        imageUrl: track.album.images[0].url,
        artistId: spotifyArtistId,
      };
    })
  );

  return updatedTracks.map((res) => {
    // @ts-ignore
    return res.value;
  });
};

// const getTracksByArtist = async (artist) => {
//   const spotifyArtistId = artist.spotify_id;
//   console.log('spotifyArtistId', spotifyArtistId);

//   try {
//     // Use SDK method to get top tracks of an artist
//     const data = await spotifyClient.artists.getTopTracks(
//       spotifyArtistId,
//       'US'
//     );

//     // Check if tracks are available
//     if (!data.body.tracks) {
//       return;
//     }

//     // Map the tracks to your desired format
//     return data.body.tracks.map((track) => ({
//       name: track.name,
//       id: track.id,
//       imageUrl: track.album.images[0].url,
//       artistId: spotifyArtistId,
//     }));
//   } catch (error) {
//     console.error('Error fetching tracks:', error);
//     throw error; // or handle error as needed
//   }
// };

const getTrackAudioFeatures = async (tracks: Object[]) => {
  const res = await Promise.allSettled(
    tracks.map(async (track) => {
      // @ts-ignore
      const trackId = track.id;

      const res = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${SPOTIFY_TOKEN}`,
          },
        }
      );
      // setTimeout(() => {}, 1000);
      const data = await res.json();
      console.log('DATA: ', data);
      // @ts-ignore
      const tempo = data.tempo;
      // @ts-ignore
      const key = data.key;

      const keyTypes = ['Major', 'Minor'];
      const updatedKey = `${musicalKeys[key]} ${
        keyTypes[Math.floor(Math.random() * 2)]
      }`;
      const updatedTempo = (Math.round(tempo * 100) / 100).toFixed(2);

      const updatedTrack = {
        ...track,
        key: updatedKey,
        bpm: updatedTempo,
      };

      return updatedTrack;
    })
  );

  return res.map((res) => {
    // @ts-ignore
    return res.value;
  });
};

const getArtistGenres = async (artist) => {
  const spotifyArtistId = artist.spotify_id;

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${spotifyArtistId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    }
  );

  // @ts-ignore
  const { genres } = await res.json();

  // console.log(genres);
  return genres;
};

const assignGenresToTracks = async (tracks: Object[], artist) => {
  const genres = await getArtistGenres(artist);
  if (!genres) {
    return tracks;
  }
  const cnt = genres?.length;

  if (!cnt) {
    return tracks;
  }

  const updatedTracks = tracks.map((track) => {
    const randomGenre = genres[Math.floor(Math.random() * cnt)];

    return {
      ...track,
      genre: randomGenre,
    };
  });

  return updatedTracks;
};

const assignDawToTracks = (tracks: Object[]) => {
  const daws = ['Ableton', 'FL_Studio', 'Logic', 'Bitwig'];

  const updatedTracks = tracks.map((track) => {
    const daw = daws[Math.floor(Math.random() * daws.length)];
    return {
      ...track,
      daw: daw,
    };
  });

  return updatedTracks;
};

const assignRandomPrice = (tracks: Object[]) => {
  const updatedTracks = tracks.map((track) => {
    const price = (Math.random() * 100).toFixed(2);
    const description = faker.lorem.sentences({ min: 1, max: 3 });

    return {
      ...track,
      price,
      description,
    };
  });

  return updatedTracks;
};

const formatTrackObject = (tracks: Object[]) => {
  const updatedTracks = tracks.map((track: any) => {
    // console.log('trackz', track);
    return {
      appUserId: 'undefined',
      accountId: 'undefined',
      name: track.name,
      genre: track.genre,
      daw: track.daw,
      bpm: track.bpm,
      key: track.key,
      label: 'undefined',
      description: track.description,
      price: track.price,
      imgS3Key: 'undefined',
      digitalFileS3Key: 'undefined',
      //
      spotifyId: track.id,
      imageUrl: track.imageUrl,
      artistId: track.artistId,
    };
  });
  return updatedTracks;
};

(async () => {
  const output = [];

  for (const artist of artists) {
    console.log('output', output.length);
    let tracks: Object[];
    tracks = await getTracksByArtist(artist);

    if (!tracks) {
      continue;
    }
    // console.log('after getTracksByArtist', tracks.length);
    tracks = await getTrackAudioFeatures(tracks);
    // console.log('after getTrackAudioFeatures(tracks)', tracks.length);
    tracks = await assignGenresToTracks(tracks, artist);
    // console.log('after assignGenresToTracks(tracks, artist)', tracks.length);
    tracks = assignDawToTracks(tracks);
    // console.log('after assignDawToTracks(tracks)', tracks.length);
    tracks = assignRandomPrice(tracks);
    // console.log('after assignRandomPrice(tracks)', tracks.length);
    tracks = formatTrackObject(tracks);
    // console.log('after formatTrackObject(tracks)', tracks.length);
    // console.log(tracks);

    output.push(tracks);
  }

  const jsonData = JSON.stringify(output, null, 2);
  // console.log(output);

  const filename =
    './apps/server/src/database/seeds/data/product-seed-data-with-spotify-data.json';
  fs.writeFileSync(filename, jsonData, 'utf8');
  console.log('data printed to: ', filename);
})();
