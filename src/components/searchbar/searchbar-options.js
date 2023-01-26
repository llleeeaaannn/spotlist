import { useContext } from 'react';
import { AppContext } from '../../App.js';
import styles from '../../styles/searchbar.module.css';

const Options = () => {

  const { playlistName, setPlaylistName, playlistDescription, setPlaylistDescription } = useContext(AppContext);

  return (
      <div className={styles.options}>
        <input
          type="text"
          name="name-searchbar"
          id="name-searchbar"
          className={styles.name}
          spellCheck="false"
          autoComplete="off"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <input
          type="text"
          name="description-searchbar"
          id="description-searchbar"
          className={styles.description}
          spellCheck="false"
          autoComplete="off"
          placeholder="Playlist Description"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
      </div>
  )
}

export default Options
