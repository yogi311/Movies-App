import { createContext, useReducer } from "react";

const CartContext = createContext({
    movies: [],
    addMovie: (item) => { },
    removeMovie: (id) => { },
});

function cartReducer(state, action) {

    if (action.type === "ADD_MOVIE") {
        const existingCartItemIndex = state.movies.findIndex(
            (movie) => movie.id === action.movie.id
        );

        const updatedMovies = [...state.movies];
        if (existingCartItemIndex > -1) {
            const existingMovie = state.movies[existingCartItemIndex];
            const updatedMovie = {
                ...existingMovie,
                quantity: existingMovie.quantity + 1,
            };
            updatedMovies[existingCartItemIndex] = updatedMovie;
        } else {
            updatedMovies.push({ ...action.movie, quantity: 1 })
        }

        return { ...state, movies: updatedMovies }
    }

    if (action.type === "REMOVE_MOVIE") {
        const existingCartItemIndex = state.movies.findIndex(
            (movie) => movie.id === action.id
        );

        const existingCartItem = state.movies[existingCartItemIndex];

        const updatedMovies = [...state.movies];

        if (existingCartItem.quantity === 1) {
            updatedMovies.splice(existingCartItemIndex, 1);
        } else {
            const updatedMovie = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedMovies[existingCartItemIndex] = updatedMovie;
        }

        return { ...state, movies: updatedMovies };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { movies: [] });

    function addMovie(movie) {
        dispatchCartAction({ type: "ADD_MOVIE", movie });
    }

    function removeMovie(id) {
        dispatchCartAction({ type: "REMOVE_MOVIE", id });
    }

    const cartContext = {
        movies: cart.movies,
        addMovie,
        removeMovie
    };

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}

export default CartContext;