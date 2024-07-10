import { useState, useEffect } from "react";
import MovieItem from "./Movieitem";

export default function Films() {
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const response = await fetch('http://localhost:3000/movies')

            const movies = await response.json();
            setLoadedMovies(movies);
        }

        fetchMovies();
    }, []);

    return (
        <ul id="movies">
            {loadedMovies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}