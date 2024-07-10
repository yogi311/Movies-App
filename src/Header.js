import { useContext } from "react"
import CartContext from "./store/CartContext"

export default function Header() {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.movies.reduce((totalNumberOfMovies, movie) => {
        return totalNumberOfMovies + movie.quantity
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg" alt="My Movies" />
                <h1>Movies</h1>
            </div>
            <nav>
                <button>Cart ({totalCartItems})</button>
            </nav>
        </header>
    )
}