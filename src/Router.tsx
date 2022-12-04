import { Route, Routes } from 'react-router-dom';
import { Cardapio } from './pages/Cardapio';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function Router(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Cardapio/>} />
        </Routes>
    )
}