import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovieStore } from '../../store/movieStore';



const MovieCards = () => {
    const navigate = useNavigate();
    const {
        movies,
        favoriteIds,
        hasMore,
        page,
        searchName,
        mode,
        toggleFavorite,
        fetchPopularMovies,
        fetchSearchResults
    } = useMovieStore();

    const loadMore = () => {
        const nextPage = page + 1;
        if (mode === 'popular') fetchPopularMovies(nextPage);
        else fetchSearchResults(searchName, nextPage);
    };
    return (
        <div className="row">
            {movies.length === 0 && (
                <div className="text-center text-light my-4">
                    Nothing to display.
                </div>
            )}
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="col-12 col-sm-6 col-md-5 col-lg-3 d-flex align-items-stretch my-2"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                >
                    <div className="card px-4 pt-2 pb-4 bg-light rounded w-100">

                        <div className="row mb-2">
                            <div className="col-5 d-flex justify-content-start " >

                                <span className= " btn btn-outline-dark m-1 fs-6 text-nowrap">Year  : {movie.release_date && movie.release_date.trim() !== ""
                                    ? movie.release_date?.split('-')[0]
                                    : "Unknown"}</span>
                            </div>
                            <div className="col-2 " >
                                </div>
                            <div className="col-5 d-flex justify-content-end">
                                <span className="btn btn-outline-dark m-1 fs-6 text-nowrap"> ⭐ {movie.vote_average}</span>

                            </div>
                        </div>

                        <div className="row " >
                            <div className="col-12 text-center">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
                                    }
                                    alt={movie.title}
                                    className="rounded hover-zoom w-100"
                                />
                            </div>
                        </div>

                        <div className="row mt-2 text-center" >
                            <div className="col-12">
                                <h5><strong>{movie.title}</strong></h5>
                            </div>
                        </div>



                        <div className="row mt-2">
                            <div className="col-12 text-center">
                                <button
                                    className={`btn btn-sm ${favoriteIds.includes(movie.id)
                                        ? 'btn-danger'
                                        : 'btn-outline-danger'
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(movie);
                                    }}
                                >
                                    {favoriteIds.includes(movie.id)
                                        ? '❌ Remove from Favorites'
                                        : '❤️ Add to Favorites'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            ))}
            {hasMore && movies.length > 0 && (
                <div className="text-center my-4">
                    <button className="btn btn-secondary" onClick={loadMore}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieCards;
