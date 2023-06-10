import React, { useState } from 'react';

export default function ArtistInput(props) {
  const [artistInput, setArtistInput] = useState('');
  const artistInputChangeHandler = (event) => {
    setArtistInput(event.target.value);
  };

  const fetchData = async () => {
    const response = await fetch(
      'https://api.spotify.com/v1/search?q=' +
        artistInput +
        '&type=artist&limit=1',
      {
        headers: {
          Authorization:
            'Bearer BQBT6aeCIlh9S-oNT5s2cEcNq5FPxr9ukGa6TDH2rhiAMg1saW71mYSjrx7N0oR_j2Q9tltJ-GEuDi7DHMSsfR2c1DTfVNQmduy7Qs0AyGlTqp55FcHsdsszyiZRFIoQ7js1JP6-YdNqjob5_gNqvBVl6YOGk-Ln4oPNySgpOdf7yI1STHgLtQZARrcdTrcRMXTOwFecUrx82ytDr3iK5suZ9mz9NM89NvYtE5zMVfJ-UMr3WiK4yrGG-rqQLzI0hEiIf2dQQnM',
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    //Collecting Artist Name, Image and ID
    const artistName = data.artists.items[0].name;
    const artistImage = data.artists.items[0].images[0].url;
    const artistId = data.artists.items[0].id;
    //Collecting Artist Genres and reducing the number of genres inside the array to the max number accepted by spotify API
    const artistGenre = data.artists.items[0].genres;
    while (artistGenre.length > 4) {
      artistGenre.pop();
    }

    props.selectedArtist(artistName, artistImage, artistGenre, artistId);
    console.log(artistGenre);
    console.log(artistId);
  };

  const artistSubmitHandler = (event) => {
    event.preventDefault();
    console.log(artistInput + ' submit value');
    fetchData();
  };

  return (
    <form onSubmit={artistSubmitHandler}>
      <input type="text" onChange={artistInputChangeHandler} />
    </form>
  );
}
