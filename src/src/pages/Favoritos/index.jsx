
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete, MdInfoOutline } from "react-icons/md";

export default function Favoritos() {
  const [filmes, setFIlmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@devflix");
    setFIlmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilmes(id, nome) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    toast.error(`Filme ${nome}, excluído com sucesso`);
    setFIlmes(filtroFilmes);
    localStorage.setItem("@devflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className={styles.myFilms}>
      <h3 style={{color:'whitesmoke', marginBottom: 15}}>Favoritos</h3>

      {filmes.length === 0 ? (
        <span style={{color:'whitesmoke'}}>Você não possui nenhum filme salvo...</span>
      ) : (
        <ul>
          {filmes.map((film) => {
            return (
              <li key={film.id}>
                <div style={{gap:10}}>
                <img
                  src={`https:image.tmdb.org/t/p/original${film.poster_path}`}
                  alt={film.title}
                  className={styles.imagem}
                />
                <span>{film.title}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to={`/filme/${film.id}`}>
                    <MdInfoOutline size={25} color="white" />
                  </Link>
                  <MdDelete
                    className={styles.delete}
                    onClick={() => excluirFilmes(film.id, film.title)}
                    color="red"
                    size={25}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

