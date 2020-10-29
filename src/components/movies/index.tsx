import React from 'react'
import { Movie } from '../../api/getMoviesData';
import styles from './movies.module.css'

interface MoviesProps {
  movies: Movie[]
  search: string,
}

const Movies: React.FC<MoviesProps> = (props) => {
  return (
    <div>
      {props.movies
        .filter((movie) => {
          if(movie.overview.toLocaleLowerCase()) {
            return movie.overview.toLocaleLowerCase().includes(props.search)
          }
          return false
        })
        .map((movie) => (
          <div className={styles.movieContainer} key={movie.id}>
            <img
              className={styles.movieImage}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie poster"
            />
            <div className={styles.info}>
              <div className={styles.title}>{movie.title}</div>
              <p className={styles.overview}>
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Movies;