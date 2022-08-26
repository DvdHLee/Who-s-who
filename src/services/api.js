import toPairs from "lodash/toPairs";
import "whatwg-fetch";

const SPOTIFY_ROOT = "https://api.spotify.com/v1";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = (response) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
};

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const request = (url, options) => {
  // eslint-disable-next-line no-undef
  return fetch(url, options).then(checkStatus).then(parseJSON);
};

const fetchFromSpotify = ({ token, endpoint, params }) => {
  let url = [SPOTIFY_ROOT, endpoint].join("/");
  if (params) {
    const paramString = toPairs(params)
      .map((param) => param.join("="))
      .join("&");
    url += `?${paramString}`;
  }
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return request(url, options);
};

export const getSingleArtistByGenre = async (token, genre) => {
  const artist = await getListOfArtistsByGenre(token, genre, 1);
  return artist;
};

export const getArtistNameById = async (token, artistID) => {
  const artist = await fetchFromSpotify({
    token: token,
    endpoint: `artists/${artistID}`,
  });
  console.log("ARTIST NAME");
  console.log(artist.name);
  return artist.name;
};

export const getArtistTopSongs = async (token, artistId) => {
  const param = {
    market: "US",
  };
  const topSongs = await fetchFromSpotify({
    token: token,
    endpoint: `artists/${artistId}/top-tracks`,
    params: param,
  });
  return topSongs;
};

export const getListOfArtistsByGenre = async (
  token = "",
  genre = "alt-rock",
  max = 100
) => {
  const fetchedSongs = await fetchFromSpotify({
    token: token,
    endpoint: `recommendations?seed_genres=${genre}&limit=100`,
  });

  const listOfSongObjects = fetchedSongs.tracks
    .filter((song) => song.preview_url)
    .map((song) => ({
      previewUrl: song.preview_url,
      artistid: song.artists[0].id,
      artistname: song.artists[0].name,
    }));

  const artistIDs = [
    ...new Set(listOfSongObjects.map((song) => song.artistid)),
  ];

  const names = [...new Set(listOfSongObjects.map((song) => song.artistname))];

  const artists = [...Array(artistIDs.length)].map((artist, i) => ({
    artistid: artistIDs[i],
    artistname: names[i],
  }));

  return artists.sort(() => 0.5 - Math.random()).slice(0, max);
};

export default fetchFromSpotify;
