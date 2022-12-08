import { Route, Routes } from 'react-router-dom';
import { AddProduto } from './pages/AddProduto';
import { Cardapio } from './pages/Cardapio';
import { DataClient } from './pages/DataClient';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Pedidos } from './pages/Pedidos';
import { PedidosClient } from './pages/PedidosClient';
import { Signup } from './pages/Signup';
import { LoginAdm } from './pages/LoginAdm';

export function Router(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Cardapio/>} />
            <Route path='/adm/product' element={<AddProduto/>}/>
            <Route path="/dados" element={<DataClient/>} />
            <Route path="/shop/adm" element={<Pedidos/>}/>
            <Route path="/pedidos" element={<PedidosClient/>}/>
            <Route path="/adm/login" element={<LoginAdm/>}/>
        </Routes>
    )
}