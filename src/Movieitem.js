import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";

export default function MovieItem({ movie }) {
    const cartCtx = useContext(CartContext);
    function handleAddMovieToCart() {
        cartCtx.addMovie(movie);
    }
    return (
        <li className="movie-item">
            <article>
                <img src={movie.Image} alt="movie poster" />
                <div>
                    <h3>{movie.Title}</h3>
                    <div className="movie-item-description">
                        <p>Released: {movie.Released}</p>
                        <p>Director: {movie.Director}</p>
                        <p>Languange: {movie.Language}</p>
                        <p>{movie.Plot}</p>
                        <p>imdbRating: {movie.imdbRating}</p>
                    </div>
                </div>
                <p className="movie-item-actions">
                    <Button onClick={handleAddMovieToCart}>Rent</Button>
                </p>
            </article>
        </li>
    )
}