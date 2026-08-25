import { Navigate, Route, Routes } from 'react-router-dom';
import { RotaProtegida } from './components/RotaProtegida';
import { AddProduto } from './pages/AddProduto';
import { Cardapio } from './pages/Cardapio';
import { DataClient } from './pages/DataClient';
import { Login } from './pages/Login';
import { LoginAdm } from './pages/LoginAdm';
import { Pedidos } from './pages/Pedidos';
import { PedidosClient } from './pages/PedidosClient';
import { Signup } from './pages/Signup';

export function Router(){
    return (
        <Routes>
            <Route path="/" element={<Cardapio/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />

            <Route path="/pedidos" element={
                <RotaProtegida papel="cliente"><PedidosClient/></RotaProtegida>
            }/>
            <Route path="/dados" element={
                <RotaProtegida papel="cliente"><DataClient/></RotaProtegida>
            }/>

            <Route path="/adm/login" element={<LoginAdm/>}/>
            <Route path="/shop/adm" element={
                <RotaProtegida papel="restaurante"><Pedidos/></RotaProtegida>
            }/>
            <Route path="/adm/product" element={
                <RotaProtegida papel="restaurante"><AddProduto/></RotaProtegida>
            }/>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
