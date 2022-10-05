import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './paginas/login/Login';
import './App.css';
import ListaTema from './components/temas/listatema/Listatema';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrousuario"element={< CadastroUsuario />} />
            <Route path="/temas"element={< ListaTema />} />
            <Route path="/posts"element={< ListaPostagem />} />
            </Routes>
          </div>
        <Footer />
    </BrowserRouter >
  );
}

export default App;