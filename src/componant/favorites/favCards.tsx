import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovieStore } from '../../store/movieStore';



const FavCards = () => {
    const navigate = useNavigate();

    const favorites = useMovieStore((state) => state.favorites);
    const loadFavorites = useMovieStore((state) => state.loadFavorites);
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);

    return (
        <div className="row">
            {favorites.length === 0 ? (
                <div className="text-center text-light">No favorite movies yet.</div>
            ) : (
                favorites.map((movie) => (
                    <div
                        key={movie.id}
                        className="col-12 col-sm-6 col-md-5 col-lg-3 d-flex align-items-stretch my-2"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <div className="card p-4 bg-light rounded w-100">

                            <div className="row mb-2">
                                <div className="col-5 d-flex justify-content-start " >

                                    <span className=" btn btn-outline-dark m-1 fs-6 text-nowrap">Year  : {movie.release_date && movie.release_date.trim() !== ""
                                        ? movie.release_date?.split('-')[0]
                                        : "Unknown"}</span>
                                </div>
                                <div className="col-2 " >
                                </div>
                                <div className="col-5 d-flex justify-content-end">
                                    <span className="btn btn-outline-dark m-1 fs-6 text-nowrap"> ⭐ {movie.vote_average}</span>

                                </div>
                            </div> 

                            <div className="row">
                                <div className="col-12 text-center">
                                    <img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : 'https://via.placeholder.com/300x450?text=No+Image'
                                        }
                                        alt={movie.title}
                                        width="100%"
                                        className="rounded"
                                    />
                                </div>
                            </div>

                            <div className="row mt-2 text-center">
                                <div className="col-12">
                                    <h5><strong>{movie.title}</strong></h5>
                                </div>
                            </div>

                            

                            <div className="row mt-2">
                                <div className="col-12 text-center">
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(movie);
                                        }}
                                    >
                                        ❌ Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

    );
};

export default FavCards;
