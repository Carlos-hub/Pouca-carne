import { Route, Routes } from 'react-router-dom';
import { AddProduto } from './pages/AddProduto';
import { Cardapio } from './pages/Cardapio';
import { DataClient } from './pages/DataClient';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function Router(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Cardapio/>} />
            <Route path='/signup/product' element={<AddProduto/>}/>
            <Route path="/dados" element={<DataClient/>} />
        </Routes>
    )
}