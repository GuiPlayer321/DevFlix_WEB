import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

export default function Error(){
    return(
        <div className={styles.notFound}>
            <h1>Erro 404</h1>
            <h2>Página não encontrada!</h2>
            <Link to='/'>Veja todos os links aqui.</Link>
        </div>
    )
}