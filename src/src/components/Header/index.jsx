
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { BiSearch, BiSolidCameraMovie, BiUserCircle } from "react-icons/bi";
import { useState } from "react";

export default function Header() {
  
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
    <header>
      <div className={styles.icons}>
        <BiSolidCameraMovie size={45} color="rgb(238, 238, 49)" />
        <Link className={styles.logo} to="/">
          DevFlix
        </Link>
      </div>
      <div className={styles.entrada}>
      <input type="text"  placeholder="Digite um filme" onChange={(e) => setSearch(e.target.value)} value={search}/>
      <button className={styles.botao} onClick={handleSubmit}><BiSearch size={15} color="white"/></button>
      </div>
      <div className={styles.user}>
        <Link className={styles.favoritos} to="/favoritos">
          Meus Filmes
        </Link>
        <BiUserCircle size={45} color="white" />
      </div>
    </header>
  );
}

