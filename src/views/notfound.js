import { Link } from 'react-router-dom';
import styles from '../styles/notfound.module.css';

const NotFound = () => {

  return (
    <div className={styles.notFound}>
        <span>404 Error</span>
        <span>Unfortunately, this page doesn't exist</span>
        <Link to="/">Return Home</Link>
    </div>
  )
}

export default NotFound;
