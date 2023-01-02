import './styles/App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './views/home';
import Playlist from './views/playlist';
import NotFound from './views/notfound';

export const AppContext = React.createContext();

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [playlistID, setPlaylistID] = useState();
  const [playlistLink, setPlaylistLink] = useState();
  const [coverSongs, setCoverSongs] = useState();
  const [unfoundSongs, setUnfoundSongs] = useState();
  const [authError, setAuthError] = useState('');
  const [setlistError, setSetlistError] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');


  return (
    <AppContext.Provider value={ { playlistID, setPlaylistID, playlistLink, setPlaylistLink, unfoundSongs, setUnfoundSongs, coverSongs, setCoverSongs, creatingPlaylist, setCreatingPlaylist, playlistName, setPlaylistName, playlistDescription, setPlaylistDescription, authenticated, setAuthenticated, authenticating, setAuthenticating, setlistError, setSetlistError, authError, setAuthError } }>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playlist' element={<Playlist />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
