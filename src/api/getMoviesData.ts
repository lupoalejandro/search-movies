export interface Movie {
  id: string,
  overview: string,
  title: string,
  backdrop_path: string,
  poster_path: string
}

export const getMoviesData = async (): Promise<Movie[]> => {
  const result = await fetch('https://api.themoviedb.org/4/list/1',{
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDQwMTA0NmMxYmJkNDM3NzFlODQ0YmU4YzQxNGFjYiIsInN1YiI6IjVmOTgzODJmZTE4Yjk3MDAzNGQwMzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UXcm8LSGmfBILHmAZwdHac3aMU2_7Avb2t_D94CZxQQ'
    }
  })
  const data = await result.json();
  return data.results
}
