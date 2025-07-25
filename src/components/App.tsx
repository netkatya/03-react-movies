import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import type { Movie } from "../types/movie";
import { fetchMovies } from "../services/movieService";
import MovieGrid from "./MovieGrid";
import css from './App.module.css';

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSearch = async (query: string) => {
        setMovies([]);
        setIsLoading(true);
        setHasError(false);

        try {
            const results = await fetchMovies(query);
            if (results.length === 0) {
                toast.error('No movies found for your request.');
            }
            setMovies(results);
        } catch (error) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {hasError && <ErrorMessage />}
        {!isLoading && !hasError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
        {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
    </div>
    )
}

export default App;