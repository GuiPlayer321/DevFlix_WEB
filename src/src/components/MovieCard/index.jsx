import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import {FaHeart, FaStar} from 'react-icons/fa6'

export default function MovieCard({ id, title, img, pop, vote}) {
  return (
    <Link to={`/filme/${id}`} className={styles.card}>
      <div key={id} >
        <img src={`https:image.tmdb.org/t/p/original${img}`} alt={title} />
        <div className={styles.votes}>
            <FaStar size={15} style={{margin: '2 5 2 0'}}/>
            <h5>{vote}</h5>
            <FaHeart size={15} style={{margin: '2 5 2 40'}}/>
            <h5>{pop}</h5>
        </div>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}
