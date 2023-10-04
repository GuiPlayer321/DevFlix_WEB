import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Home(){

    const [filmes, setFilmes] =useState([])

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:"e0f7312474706c4418b37e44e7781b91",
                    language:"pt-BR",
                    page:1
                }
            })

            setFilmes(response.data.results.slice(0,10))
        }

        loadFilmes()
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.filmList}>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong >{filme.title}</strong>
                            <img src={`https:image.tmdb.org/t/p/original${filme.poster_path}`} alt="" />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}