import React, { useState } from 'react';
import ArtistInput from './ArtistInput';
import ArtistRecommend from './ArtistRecommend';
import Card from './UI/Card';

export default function ArtistSelected() {
  //Artist values from the user input
  const [artist, setArtist] = useState('');
  const [artistImg, setArtistImg] = useState('');
  const [artistGenre, setArtistGenre] = useState();
  const [artistId, setArtistId] = useState('');

  //Artist values from recommended artists
  const [tracks, setTracks] = useState();
  const [display, setDisplay] = useState(false);

  const selectedArtistHandler = (
    artistNameCaptured,
    artistImageCaptured,
    artistGenreCaptured,
    artistIdCaptured
  ) => {
    setArtist(artistNameCaptured);
    setArtistImg(artistImageCaptured);
    setArtistGenre(artistGenreCaptured);
    setArtistId(artistIdCaptured);
  };

  const artistClickHandler = async () => {
    const response = await fetch(
      'https://api.spotify.com/v1/recommendations?seed_artists=' +
        artistId +
        '&seed_genres=' +
        artistGenre +
        '&limit=3&max_popularity=30',
      {
        headers: {
          Authorization:
            'Bearer BQBT6aeCIlh9S-oNT5s2cEcNq5FPxr9ukGa6TDH2rhiAMg1saW71mYSjrx7N0oR_j2Q9tltJ-GEuDi7DHMSsfR2c1DTfVNQmduy7Qs0AyGlTqp55FcHsdsszyiZRFIoQ7js1JP6-YdNqjob5_gNqvBVl6YOGk-Ln4oPNySgpOdf7yI1STHgLtQZARrcdTrcRMXTOwFecUrx82ytDr3iK5suZ9mz9NM89NvYtE5zMVfJ-UMr3WiK4yrGG-rqQLzI0hEiIf2dQQnM',
        },
      }
    );
    const data = await response.json();
    // console.log(data.tracks);
    setTracks(data.tracks);
  };

  return (
    <div>
      <ArtistInput selectedArtist={selectedArtistHandler} />
      {artist ? (
        <Card className="limit" onClick={artistClickHandler}>
          <img src={artistImg} height="160" width="160" />
          <p>{artist}</p>
        </Card>
      ) : (
        <></>
      )}

      <br />
      {tracks ? (
        <div>
          {tracks.map((artist) => (
            <ArtistRecommend recommendations={artist} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
