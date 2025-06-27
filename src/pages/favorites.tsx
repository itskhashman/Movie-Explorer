import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import FavCards from '../componant/favorites/favCards';

const Favorites = () => {
  
  const loadFavorites = useMovieStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <div className="container min-vh-100">
      <h2 className="my-4 text-center text-light"> Your Favorite Movies</h2>

      <FavCards  />
    </div>
  );
};

export default Favorites;
