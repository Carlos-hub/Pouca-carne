import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Router } from "./Router"

import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
      <BrowserRouter>
        <Router />
        <ToastContainer/>
      </BrowserRouter>
  ) 
}

export default App

