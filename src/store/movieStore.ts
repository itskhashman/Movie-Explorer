import { create } from 'zustand';
import axios from 'axios';

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

interface DetailedMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
}

interface MovieStore {
    movies: Movie[];
    page: number;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
    mode: 'popular' | 'search';
    searchName: string;
    favoriteIds: number[];
    movie: DetailedMovie | null;
    favorites: Movie[];
    loadFavorites: () => void;
    fetchMovieById: (id: string) => void;
    setSearchName: (name: string) => void;
    setMode: (mode: 'popular' | 'search') => void;
    fetchPopularMovies: (page?: number) => void;
    fetchSearchResults: (query: string, page?: number) =>void;
    toggleFavorite: (movie: Movie) => void;
    resetMovies: () => void;
}

const apiKey = '37e3693c789cb6f7b9d43086efa1ab39';
console.log("apiKey : " + apiKey);


export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    page: 1,
    hasMore: true,
    mode: 'popular',
    loading: false,
    error: null,
    searchName: '',
    movie: null,
    favoriteIds: [],
    favorites: [],

    loadFavorites: () => {
        const stored = localStorage.getItem('favorites');
        const favorites: Movie[] = stored ? JSON.parse(stored) : [];
        set({ favorites });
    },

    fetchMovieById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: { api_key: apiKey },
            });
            set({ movie: res.data });
            set({ loading: false });
        } catch (err) {
            console.error('❌ Error fetching movie:', err);
            set({ movie: null });
            set({ error: 'Failed to fetch selected movie. Please try again later.', loading: false });

        }
    },
    setSearchName: (name) => set({ searchName: name }),
    setMode: (mode) => set({ mode }),

    fetchPopularMovies: async (page = 1) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                params: { api_key: apiKey, page },
            });
            set((state) => ({
                movies: page === 1 ? res.data.results : [...state.movies, ...res.data.results],
                hasMore: page < res.data.total_pages,
                page,
                loading: false,
            }));
        } catch (err) {
            console.error("❌ Failed to fetch popular movies:", err);
            set({ error: 'Failed to fetch popular movies. Please try again later.', loading: false });
        }
    },


    fetchSearchResults: async (query, page = 1) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: { api_key: apiKey, query, page },
            });
            set((state) => ({
                movies: page === 1 ? res.data.results : [...state.movies, ...res.data.results],
                hasMore: page < res.data.total_pages,
                page,
                loading: false,
            }));
        } catch (err) {
            console.error("❌ Failed to search movies:", err);
            set({ error: 'Search failed. Please try again.', loading: false });
        }
    },


    toggleFavorite: (movie) => {
        const stored = localStorage.getItem('favorites');
        let favorites: Movie[] = stored ? JSON.parse(stored) : [];

        const exists = favorites.some((m) => m.id === movie.id);

        if (exists) {
            favorites = favorites.filter((m) => m.id !== movie.id);
        } else {
            favorites.push(movie);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        const favoriteIds = favorites.map((m) => m.id);
        set({ favorites, favoriteIds });
    },



    resetMovies: () => set({ movies: [], page: 1, hasMore: true }),
}));
