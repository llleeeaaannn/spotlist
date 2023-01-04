import { useState, useContext } from 'react';
import { AppContext } from '../App.js';
import styles from '../styles/playlist.module.css';
import { Link } from 'react-router-dom';
import Covers from '../components/playlist/covers.js';
import Unfound from '../components/playlist/unfound.js';

const Playlist = () => {

  const { playlistLink, unfoundSongs, coverSongs } = useContext(AppContext);

  const [copiedLink, setCopiedLink] = useState(false);

  // Function which accepts a link and copies it to the devices clipboard
  function copyLink(link) {
    if ('clipboard' in navigator) {
      navigator.clipboard
      .writeText(link)
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  }

  // Function which accepts a song object and copies the song details to the devices clipboard
  function copySong(song) {
    const text = song.artist ? `${song.name} by ${song.artist}` : `${song.name}`;
    if ('clipboard' in navigator) {
      navigator.clipboard
      .writeText(text)
    }
  }

  return (
    <div className={styles.playlist}>
      { playlistLink &&
        <div className={styles.created}>
          <h2>Your playlist has been created</h2>
          <span>It's already your saved in Spotify account and you can also find it below:</span>
          <div className={styles.buttons}>
            <span onClick={() => copyLink(playlistLink)}>{ copiedLink ? 'Copied Link' : 'Copy Link' }</span>
            <a href={playlistLink} target='_blank' rel='noopener noreferrer'>Open Playlist</a>
          </div>
          { unfoundSongs.length > 0 &&
            <Unfound songs={unfoundSongs} copySong={copySong} />
          }
          { coverSongs.length > 0 &&
            <Covers songs={coverSongs} copySong={copySong} />
          }
        </div>
      }
      { !playlistLink &&
        <div className={styles.failed}>
          <span>Cannot find playlist, please return <Link to="/">home</Link> and try again</span>
        </div>
      }
    </div>
  )
}

export default Playlist;
