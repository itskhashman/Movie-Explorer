import { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import { useNavigate } from 'react-router-dom';
import MovieCards from '../componant/movies/movieCard';

const Welcome = () => {
  const navigate = useNavigate();
  const {
    searchName,
    setSearchName,
    fetchPopularMovies,
    fetchSearchResults,
    setMode,
    resetMovies
  } = useMovieStore();


  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMovies();
    setMode('search');
    await fetchSearchResults(searchName, 1);
  };

  

  return (
    <div className="container min-vh-100">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4"> <h1 className="mt-4 text-center text-light">🎬 Movie Explorer</h1></div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">      <h6 className="mt-4 text-center text-light">The Movie Search Website is a responsive web application that allows users to search for movies by title and view detailed information about them. It integrates with the TMDb API to fetch real-time movie data including titles, posters, release dates, ratings, and descriptions.</h6>
        </div>
        <div className="col-2"></div>
      </div>

      <div className="row">
        <form className="d-flex my-4" onSubmit={handleSearch}>
          <div className="col-8">
            <input
              className="form-control me-2"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search for a movie..."
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary w-100 mx-1" type="submit">Search</button>
          </div>
        </form>
      </div>

      <MovieCards />

      

    </div>
  );
}

export default Welcome;
