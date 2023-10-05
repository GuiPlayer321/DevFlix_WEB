import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "e0f7312474706c4418b37e44e7781b91",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/",{replace: true})
          return
        });
    }

    loadFilme();
  }, []);

  function SalvarFilme(){
    const minhaLista = localStorage.getItem('@devflix')
    let filmesSalvos = JSON.parse(minhaLista) || []
    const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilmes){
        alert("Filme ja adicionado")
        return
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@devflix", JSON.stringify(filmesSalvos))
    alert("Filme salvo com sucesso")

  } 

  if (loading) {
    return (
      <div className={styles.filmeInfo}>
        <h1>Carregando dados do filme...</h1>
      </div>
    );
  }

  return (
    <div className={styles.filmeInfo}>
      <h1>{filme.title}</h1>
      <img
        src={`https:image.tmdb.org/t/p/original${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliacao: {filme.vote_average} /10</strong>

      <div className={styles.areaBtn}>
        <button onClick={SalvarFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}
