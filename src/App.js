import Films from './Films';
import Header from './Header';
import { CartContextProvider } from './store/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Films />
    </CartContextProvider>
  );
}

export default App;
