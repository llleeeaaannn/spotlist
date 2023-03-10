import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Searchbar from '../components/searchbar/searchbar';
import { linkRegex, backendAPI } from '../variables.js';
import { AppContext } from '../App.js';
import { parseSetlistLink, getNowTime } from '../methods/methods.js'

const Home = () => {

  const { setPlaylistID, setPlaylistLink, setUnfoundSongs, setCoverSongs, setCreatingPlaylist, playlistName, setPlaylistName, playlistDescription, setPlaylistDescription, setAuthenticated, setAuthenticating, setSetlistError, setAuthError } = useContext(AppContext);

  let accessToken;
  const navigate = useNavigate();
  const TOKEN = "https://accounts.spotify.com/api/token";

  useEffect(() => {
    checkForAccessToken();
    onPageLoad();
  }, [])

  // Function which checks for valid Spotify access token in localStorage and sets 'authenticated' accordingly
  function checkForAccessToken() {
    const access = localStorage.getItem('access');
    if (access === null) return setAuthenticated(false);
    const accessJSON = JSON.parse(access);
    if (accessJSON.expiry > getNowTime()) {
      accessToken = accessJSON.value;
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }

  function checkAccessTokenExists() {
    const access = localStorage.getItem('access');
    // If accessToken not stored, return false
    if (access === null) {
      setAuthenticated(false)
      return false;
    }
    // Parse object in localStorage to JSON
    const accessJSON = JSON.parse(access);
    // If accessToken has expired, return false
    if (accessJSON.expiry < getNowTime()) {
      setAuthenticated(false);
      return false;
    }
    // If accessToken value is falsy, return false
    if (!accessJSON.value) {
      setAuthenticated(false);
      return false;
    }
    // If above conditions not met, accessToken is valid. Set it and return true
    accessToken = accessJSON.value;
    setAuthenticated(true);
    return true;
  }

  // Function which calls spotlistAPI auth route to retrieve Spotify authorization screen URL and then goes to said URL
  async function requestAuthLink() {
    try {
      const data = await fetch(backendAPI + '/auth');
      const json = await data.json();
      const url = json.auth;
      window.location.href = url; // Show Spotify's authorization screen
    } catch(error) {
      setAuthError('Unable to connect to Spotify, please try again!');
    }
  }

  // Function to check if query exists in URL, if so call handleRedirect()
  function onPageLoad() {
    if (window.location.search.length > 0) {
      handleRedirect();
    }
  }

  function handleRedirect() {
    if (!verifyAuthorisation()) {
      setAuthError('Spotify account not connected, please try again!');
      setAuthenticating(false);
      setAuthenticated(false);
      navigate('/');
      return;
    }
    setAuthError('');
    setSetlistError('');
    const code = getCode();
    navigate('/');
    setAuthenticating(true);
    fetchAccessToken(code);
  }

  // Function to verify if user granted authorization on Spotify's auth screen.
  function verifyAuthorisation() {
    // Get url query
    const queryString = window.location.search;
    // If no query, return false
    if (queryString.length === 0) return false;
    const urlParams = new URLSearchParams(queryString);
    const error = urlParams.get('error');
    // If query contains error parameter (user didnt authorise or other error), return false
    if (error) return false;
    // Otherwise return true
    return true;
  }

  // Function which gets 'code' parameter from URL and returns it
  function getCode() {
    let code;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
    }
    return code;
  }

  async function fetchAccessToken(code) {
    const data = await fetch(backendAPI + '/access');
    const json = await data.json();
    const query1 = json.query1;
    const query2 = json.query2;
    const query = query1 + '&code=' + code + query2;
    callAuthorizationApi(query);
  }

  function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('0d453f304c284edca80fef86ba63f57c' + ":" + 'd4a0686ea42f418a92521bd7e884d221'));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
  }

  function handleAuthorizationResponse() {
    if (this.status === 200) {
      var data = JSON.parse(this.responseText);
      let access_token = data.access_token;
      let refresh_token = data.refresh_token;
      let expiry = data.expires_in;
      setAuthenticated(true);
      setAuthenticating(false);
      storeAccessToken(access_token, expiry);
    } else {
      setAuthError('Unable to connect to your Spotify account, please try again!');
    }
  }

  function storeAccessToken(key, expiry) {
    const access = {
      value: key,
      expiry: getNowTime() + ((expiry - 300) * 1000)
    }
    localStorage.setItem('access', JSON.stringify(access));
  }

  function makePlaylistData(setlist) {
    setPlaylistID(setlist.playlistID); //Not instant
    setPlaylistLink(setlist.playlistLink); //Not instant
    setUnfoundSongs(setlist.unfoundSongs); //Not instant
    setCoverSongs(setlist.coverSongs); //Not instant
  }

  // Function which resets error messages
  function removeErrors() {
    setAuthError('');
    setSetlistError('');
  }

  async function createPlaylist(url) {
    if (!url.length) return setSetlistError('No setlist link entered, please try again!');
    if (!linkRegex.test(url)) return setSetlistError('Not a valid setlist.fm link, please try again!')
    if (!checkAccessTokenExists()) return setSetlistError('Your Spotify account is not connected, please try again!');
    setCreatingPlaylist(true);
    removeErrors();
    const setlistID = parseSetlistLink(url);
    try {
      const data = await fetch(backendAPI + '/setlist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          setlistID: setlistID,
          accessToken: accessToken,
          name: playlistName,
          description: playlistDescription
        })
      })
      if (data.ok) {
        const json = await data.json();
        makePlaylistData(json);
        navigate('/playlist');
        setPlaylistName('');
        setPlaylistDescription('');
        setCreatingPlaylist(false);
      } else {
        // Response returned but unsuccesful (playlist not created)
        setCreatingPlaylist(false);
        setSetlistError('Unable to create playlist, please ensure your setlist.fm link is correct and try again!');
      }
    } catch(error) {
      // Unable to fetch from backend API
      setCreatingPlaylist(false);
      setSetlistError('Unable to connect to Spotify, please try again!');
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h2>Instantly create a Spotify playlist from any setlist!</h2>
        <span> All you have to do is paste a setlist link from <a href='https://www.setlist.fm' className={styles.underline} target='_blank' rel='noopener noreferrer'>setlist.fm</a>, we look after the rest.</span>
      </div>
      <div className={styles.searchbar}>
        <Searchbar requestAuthLink={requestAuthLink} createPlaylist={createPlaylist}/>
      </div>
    </div>
  )
}

export default Home;

// Make website offline compatible as seen in: https://www.youtube.com/watch?v=cmGr0RszHc8
// Handle user clicking enter when searching (use form better)
// Implement refresh tokens
// Add screenshots to manifest.json as seen in https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots
// Add comments
// Test all errors and add further error handling
