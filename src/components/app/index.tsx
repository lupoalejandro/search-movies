import React, { useState, useEffect } from 'react';
import { getMoviesData, Movie } from '../../api/getMoviesData';
import Movies from '../movies'
import styles from './app.module.css';

const App = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isFetching, setFetching] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      try {
        const response = await getMoviesData()
        if(Array.isArray(response)) {
          setMovies(response)
        } else {
          setError('Result is not a list')
        }
        setFetching(false)
      } catch (error) {
        let messageError
        if(typeof error !== 'string') {
          messageError = error.toString
            ? error.toString() 
            : 'failed'
        } else {
          messageError = error
        }
        setError(messageError)
        setFetching(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if(inputValue.length === 0) {
      setSearch('')
    }
  }, [inputValue])

  const onClick = () => {
    setSearch(inputValue)
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.toLocaleLowerCase())
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input 
            className={styles.inputSearch}
            value={inputValue}
            onChange={onChange}
            type="text"
          />
          <button
            onClick={onClick}
            className={styles.button}
          >
            SEARCH
          </button>
        </div>
        {isFetching && <p>Fetching</p>}
        {error && <p>{error}</p>}
        <Movies movies={movies} search={search} />
      </div>
    </div>
  );
}

export default App;