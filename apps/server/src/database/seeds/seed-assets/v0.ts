Untitled - 3;

// v0
//  apps/server/src/database/seeds/creaet-product-seeds-from-spotify-api

const artists = [
  // {
  //   auth_id: 'auth0|6519fd529745d9c63c2975ae',
  //   display_name: 'KEEFE',
  //   first_name: 'Evan',
  //   last_name: 'Keefe',
  //   username: 'keefe',
  //   email: 'keefe.music@keefe.com',
  //   avatarS3Key: 'keefe-avatar-seed.webp',
  //   spotify_id: '4hXPtXUp0fPQZ2xpq3v8oU',
  //   links: {
  //     spotify: 'https://open.spotify.com/artist/4hXPtXUp0fPQZ2xpq3v8oU',
  //   },
  // },
  // {
  //   auth_id: 'auth0|6519fe7fe51e9baa2514460d',
  //   display_name: 'Safety or Numbers',
  //   first_name: 'Nate',
  //   last_name: 'Pawelczyk',
  //   username: 'safety-or-numbers',
  //   email: 'router.music@router.com',
  //   spotify_id: '1QNgopvt8ILfNVIXGU8k6g',
  //   links: {
  //     spotify: 'https://open.spotify.com/artist/1QNgopvt8ILfNVIXGU8k6g',
  //   },
  // },
  // {
  //   auth_id: 'auth0|6519fe7fe51e9baa2514460d',
  //   display_name: 'Nathaniel Pavel',
  //   first_name: 'Nathaniel',
  //   last_name: 'Pavel',
  //   username: 'nathaniel_pavel',
  //   email: 'router.music@router.com',
  //   avatarS3Key: 'nathaniel_pavel-avatar-seed.jpg',
  //   spotify_id: null,
  //   links: {},
  // },
  // {
  //   auth_id: 'auth0|15bc5778036ff1ddd3670124',
  //   display_name: 'AC Slater',
  //   first_name: 'AC',
  //   last_name: 'Slater',
  //   username: 'ac-slater',
  //   email: 'ac-slater@faker-mail.dev',
  //   avatarS3Key: 'ac-slater-avatar-seed.webp',
  //   spotify_id: '6EqFMCnVGBRNmwPlk2f3Uc',
  //   links: {
  //     spotify: 'https://open.spotify.com/artist/6EqFMCnVGBRNmwPlk2f3Uc',
  //   },
  // },
  // {
  //   auth_id: 'auth0|d419ef8f8b97b027e13adefa',
  //   display_name: 'Aluna',
  //   first_name: 'Aluna',
  //   last_name: '',
  //   username: 'aluna',
  //   email: 'aluna@faker-mail.dev',
  //   avatarS3Key: 'aluna-avatar-seed.webp',
  //   spotify_id: '5ITI6SEoUZMIXXkzCfr4oE',
  //   links: {
  //     spotify: 'https://open.spotify.com/artist/5ITI6SEoUZMIXXkzCfr4oE',
  //   },
  // },
  // {
  //   auth_id: 'auth0|926c18935acc534e5c0aaa22',
  //   display_name: 'Bassjackers',
  //   first_name: 'Bassjackers',
  //   last_name: '',
  //   username: 'bassjackers',
  //   email: 'bassjackers@faker-mail.dev',
  //   avatarS3Key: 'bassjackers-avatar-seed.webp',
  //   spotify_id: '6xQvQwZQQuq9R3TdPNbcR8',
  //   links: {
  //     spotify: 'https://open.spotify.com/artist/6xQvQwZQQuq9R3TdPNbcR8',
  //   },
  // },
  // {
  //   auth_id: 'auth0|eaf3b0df387a1e36b7b407c4',
  //   display_name: 'Ben Miller (Aus)',
  //   first_name: 'Ben',
  //   last_name: 'Miller (Aus)',
  //   username: 'ben-miller-(aus)',
  //   email: 'ben-miller-(aus)@faker-mail.dev',
  //   avatarS3Key: 'ben-miller-(aus)-avatar-seed.webp',
  //   spotify_id: null,
  //   links: {},
  // },
  {
    auth_id: 'auth0|650caf196371a502e0233912',
    display_name: 'Amin Chavez',
    first_name: 'Amin',
    last_name: 'Chavez',
    username: 'amin-chavez',
    email: 'aminchavez.music@gmail.com',
    avatarS3Key: 'amin-chavez-avatar-seed.jpeg',
    spotify_id: '1HBoMknv2KI9eI7tTnb6vZ',
    links: {
      spotify: 'https://open.spotify.com/artist/1HBoMknv2KI9eI7tTnb6vZ',
    },
  },
];

const artist = {
  auth_id: 'auth0|926c18935acc534e5c0aaa22',
  display_name: 'Bassjackers',
  first_name: 'Bassjackers',
  last_name: '',
  username: 'bassjackers',
  email: 'bassjackers@faker-mail.dev',
  avatarS3Key: 'bassjackers-avatar-seed.webp',
  spotify_id: '6xQvQwZQQuq9R3TdPNbcR8',
  links: {
    spotify: 'https://open.spotify.com/artist/6xQvQwZQQuq9R3TdPNbcR8',
  },
};

const SPOTIFY_TOKEN =
  'BQBLVmDr72DVs4G7PuEhTGMA8AYlPPfWXgnWoiHfLiehCbD1Gw3e0_E0nsbqoctDDnVEoNOI-hjLqP7XS1D7qGgs1BhDrCMARipm-spetzTTE0-pvDc';

// curl --request GET \
// --url 'https://api.spotify.com/v1/audio-features/6uoVKMfX6e1NcwZbzT584Y' \
// --header 'Authorization: Bearer BQCm59Lg7WcL0IpnOtBjK3KmGRX73Z1OsT-2MIz3RTq6URaT3i23xqi71hGoDw1045af2YzvL_-GTa2C8PkXQcAI2eMlaL2G4EckzKrg85x7C8jc5zY'

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

const getTracksByArtist = async () => {
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
  console.log(tracks);

  const updatedTracks = tracks.map(async (track) => {
    const name = track.name;
    const id = track.id;
    // const imageUrl = track.images ? track.album.images[0].url : '';
    const imageUrl = track.album.images[0].url;

    return {
      name,
      id,
      imageUrl,
      artistId: spotifyArtistId,
    };
  });

  // console.log(JSON.stringify(tracks, null, 2));
  // console.log(JSON.stringify(updatedTracks, null, 2));
  console.log(updatedTracks);
  return updatedTracks;
};

const getTrackAudioFeatures = async (tracks: Object[]) => {
  const res = await Promise.allSettled(
    tracks.map(async (track) => {
      // @ts-ignore
      const trackId = track.id;
      console.log(trackId);

      const res = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${SPOTIFY_TOKEN}`,
          },
        }
      );

      // const audioFeat = await res.json();
      // @ts-ignore
      const audioFeat = await res.json();
      // console.log('audioFeat', JSON.stringify(audioFeat, null, 2));
      // @ts-ignore
      console.log(audioFeat);
      // @ts-ignore
      const tempo = audioFeat.tempo;
      // @ts-ignore
      const key = musicalKeys[key];

      // // console.log(JSON.stringify(audioFeat, null, 2));
      // // console.log(tempo, musicalKeys[key]);

      const keyTypes = ['Major', 'Minor'];
      const updatedKey = `${musicalKeys[key]} ${
        keyTypes[Math.floor(Math.random() * 2)]
      }`;
      const updatedTempo = (Math.round(tempo * 100) / 100).toFixed(2);
      // console.log(track);
      const updatedTrack = {
        ...track,
        key: updatedKey,
        bpm: tempo,
      };
      // console.log(updatedTrack);
      return updatedTrack;
      // return audioFeatures;
      // return audioFeat;
    })
  );

  return res.map((res) => {
    // @ts-ignore
    return res.value;
  });
};

const getArtistGenres = async () => {
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

const assignGenresToTracks = async (tracks: Object[]) => {
  const genres = await getArtistGenres();
  const cnt = genres.length;

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

    return {
      ...track,
      price,
    };
  });

  return updatedTracks;
};

(async () => {
  const tracks: Object[] = await getTracksByArtist();
  const tracksWithFeat = await getTrackAudioFeatures(tracks);
  const tracksWGenres = await assignGenresToTracks(tracksWithFeat);
  const tracksWDaw = await assignDawToTracks(tracksWGenres);
  const tracksWPrice = await assignRandomPrice(tracksWDaw);
  // console.log(generateRandomPrice(0, 100));
  console.log(tracksWPrice);
})();
