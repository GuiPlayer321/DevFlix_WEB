import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Favoritos(){

    const [filmes, setFIlmes] =useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@devflix")
        setFIlmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilmes(id, nome){
        let filtroFilmes = filmes.filter((item)=>{
            return item.id !== id
        })

        toast.error(`Filme ${nome}, excluído com sucesso`)
        setFIlmes(filtroFilmes)
        localStorage.setItem("@devflix", JSON.stringify(filtroFilmes))
    }

    return(
        <div className={styles.myFilms}>
            <p>Favoritos</p>

            {filmes.length ===0 ? <span>Você não possui nenhum filme salvo...</span> : 
            <ul>
                {filmes.map((film)=>{
                    return(
                        <li key={film.id}>
                            <span>{film.title}</span>
                            <div>
                                <Link to={`/filme/${film.id}`}>Ver detalhes</Link>
                                <button onClick={()=> excluirFilmes(film.id, film.title)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
}
        </div>
    )
}