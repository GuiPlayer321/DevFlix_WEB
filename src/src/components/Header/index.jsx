import { Link } from 'react-router-dom'
import styles from './index.module.css'
import {BiSolidCameraMovie} from 'react-icons/bi'

export default function Header(){
    return(
        <header>
            <BiSolidCameraMovie size={20} color='white'/>
            <Link className={styles.logo} to='/'>DevFlix</Link>
            <Link className={styles.favoritos} to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}