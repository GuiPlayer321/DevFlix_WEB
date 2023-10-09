import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

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
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();
  }, [navigate, id]);

  function SalvarFilme() {
    const minhaLista = localStorage.getItem("@devflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilmes) {
      toast.warn("Esse filme já está na sua lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@devflix", JSON.stringify(filmesSalvos));
    toast.success("Filme adicionado com sucesso!");
  }

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <h1>Carregando dados do filme...</h1>
          <Bars
            height="80"
            width="80"
            color="white"
            radius="6"
            wrapperStyle={{ marginTop: 20 }}
            wrapperClass=""
            visible={loading}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div className={styles.filmeInfo}>
          <img
            src={`https:image.tmdb.org/t/p/original${filme.backdrop_path}`}
            alt={filme.title}
            className={styles.imagem}
          />
          <div>
            <h1 className={styles.title}>{filme.title}</h1>
            <h4 className={styles.slogan}>{filme.tagline}</h4>
            <strong>Avaliacao: {filme.vote_average}</strong>
            <p>Data de laçamento: {filme.release_date.split("-").reverse().join("-")}</p>
            <p style={{marginTop: 15}}>Gêneros: </p>
            <div style={{ display: "flex", gap: 10 }}>
              {filme.genres.map((gn) => {
                return <p className={styles.genero}>{gn.name}</p>;
              })}
            </div>
            <p style={{marginTop:5}}>Produtoras:</p>
            <div style={{ display: "flex", gap: 10 }}>
              {filme.production_companies.map((pc) => {
                return <p className={styles.genero}>{pc.name}</p>;
              })}
            </div>
            <h3 className={styles.sinopse}>Sinopse</h3>
            <p>{filme.overview}</p>

            

            <div className={styles.areaBtn}>
              <button onClick={SalvarFilme}>Adicionar a lista</button>
              <button>
                <a
                  href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                >
                  Assista ao trailer
                </a>
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
