import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import MovieCard from "../../components/MovieCard";
import { Bars } from "react-loader-spinner";
import Navigator from "../../components/Navigator";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("discover/movie", {
        params: {
          api_key: "e0f7312474706c4418b37e44e7781b91",
          language: "pt-BR",
          page: page,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();
  }, [page]);

  return (
    <div className={styles.container}>
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

      <Navigator page={page} setPage={setPage} />
    </div>
  );
}
