import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Carrinho } from "./components/Carrinho"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { Router } from "./Router"

import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Router />
            <Carrinho />
            <ToastContainer
              position="bottom-right"
              autoClose={2600}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="dark"
              toastClassName="!bg-smoke !text-cream !border !border-grill !rounded-xl !font-sans"
            />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  ) 
}

export default App
