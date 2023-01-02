import styles from '../../styles/navbar.module.css';
import { useState } from 'react';

const Navbar = () => {

  const [selected, setSelected] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        <h1>Spotlist</h1>
      </div>
      <div className={selected ? styles.selectedHamburger : styles.hamburger} onClick={() => setSelected(!selected)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  )
}

export default Navbar
