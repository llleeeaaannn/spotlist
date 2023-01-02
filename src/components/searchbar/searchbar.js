import { useState, useContext } from 'react';
import styles from '../../styles/searchbar.module.css';
import Error from '../error/error.js';
import Options from './searchbar-options';
import LoadingSVG from '../svg/loading.js';
import { AppContext } from '../../App.js';

const Searchbar = ({ requestAuthLink, createPlaylist }) => {

  const { creatingPlaylist, authenticated, authenticating, setlistError, authError } = useContext(AppContext);

  const [url, setUrl] = useState('');
  const [arrow, setArrow] = useState(false);
  const [options, setOptions] = useState(false);

  function toggleOptions() {
    setArrow(!arrow);
    setOptions(!options);
  }

  return (
    <div className={styles.searchbar}>
      { !authenticated &&
        <div className={styles.auth}>
          <button type="button" className={styles.authButton} onClick={requestAuthLink}>
            { authenticating &&
              <div>
                <span>Connecting</span>
                <LoadingSVG />
              </div>
            }
            { !authenticating &&
              <span>First, Connect Your Spotify Account</span>
            }
          </button>
          { authError &&
            <Error className={styles.authError} value={authError} />
          }
        </div>
      }
      <form className={styles.form}>
        <input
          type="text"
          className={styles.url}
          name="searchbar"
          spellCheck="false"
          autoComplete="off"
          placeholder="Setlist Link"
          pattern=".*setlist\.fm.*"
          title="Must be a setlist.fm link"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className={styles.urlError}>Not a valid setlist.fm link</span>
        <div className={styles.optionsButton} onClick={toggleOptions}>
          <span>Options</span>
          <svg className={arrow ? styles.arrow : ''} viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4Z"/>
          </svg>
        </div>
        { options && <Options /> }
        <button type="button" className={styles.searchButton} onClick={() => createPlaylist(url)}>
          { creatingPlaylist &&
            <div>
              <span>Creating</span>
              <LoadingSVG />
            </div>
          }
          { !creatingPlaylist &&
            'Create Playlist'
          }
        </button>
        { setlistError &&
          <Error value={setlistError} />
        }
      </form>
    </div>
  )
}

export default Searchbar
