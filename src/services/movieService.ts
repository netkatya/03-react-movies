import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
    results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const config = {
        params: { query },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }
    const response: AxiosResponse<FetchMoviesResponse> = await axios.get(BASE_URL, config);
    return response.data.results;
}