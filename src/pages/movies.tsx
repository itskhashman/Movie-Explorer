import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useMovieStore } from '../store/movieStore'; // ✅ import Zustand store

const Movies = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = useMovieStore((state) => state.movie);
  const fetchMovieById = useMovieStore((state) => state.fetchMovieById);

  useEffect(() => {
    if (id) {
      fetchMovieById(id);
    }
  }, [id, fetchMovieById]);

  if (!movie) return <p className="text-center text-light">Loading...</p>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
            }
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 text-light">
          <h2>{movie.title}</h2>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p><strong>Runtime:</strong> ⏱️ {movie.runtime} mins</p>
          <p>{movie.overview}</p>
        </div>
        <div className="col-2">
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => navigate(-1)}
          >
             Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
