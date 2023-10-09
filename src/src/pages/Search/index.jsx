import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import styles from './index.module.css'
import { Bars } from "react-loader-spinner";
import api from "../../services/api";

export default function Search() {

    const [searchParams] = useSearchParams()
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true);

    const query = searchParams.get("q")

    useEffect(()=>{
        async function searchFilmes() {
            const response = await api.get("search/movie?", {
              params: {
                api_key: "e0f7312474706c4418b37e44e7781b91",
                language: "pt-BR",
                page: 1,
                query: query,
              },
            });
      
            setFilmes(response.data.results);
            setLoading(false);
          }
      
          searchFilmes();
    }, [query])

  return (
    <div className={styles.container}>
        <h1>Resultados para:  <span> {query}</span></h1>
      {loading ? (
        <div className={styles.loading}>
          <h2>Carregando filmes ...</h2>
          <Bars
            height="80"
            width="80"
            color="whitesmoke"
            radius="6"
            wrapperStyle={{ marginTop: 20 }}
            wrapperClass=""
            visible={loading}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div className={styles.filmList}>
          {filmes.map((filme) => {
            return (
              <MovieCard
                id={filme.id}
                title={filme.title}
                img={filme.poster_path}
                pop={filme.popularity}
                vote={filme.vote_average}
              />
            );
          })}
        </div>
      )}

    </div>
  );
}
