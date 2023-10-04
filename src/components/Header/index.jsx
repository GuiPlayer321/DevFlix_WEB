import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Header(){
    return(
        <header>
            <Link className={styles.logo} to='/'>DevFlix</Link>
            <Link className={styles.favoritos} to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}