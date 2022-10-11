import { AppBar, Toolbar, Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { addToken } from '../../../store/tokens/actions';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './Navbar.css'

function Navbar() {
  const token = useSelector<TokenState, TokenState["tokens"]>( //useSelector é um hook que acessa o store e pega o token e atribui ina constante
  (state) => state.tokens
);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function goLogout(){ //substitui o token por "vazio" - usuário deslogado
   dispatch(addToken(''));
    alert("Usuário deslogado")
    navigate('/login') // direciona p/ Login
  }
  var navbarComponent;
  if(token != ""){
    navbarComponent = <AppBar position="static" className="cor">
    <Toolbar variant="dense">
      <Box className="cursor">
        <Typography variant="h5" color="inherit">
          BlogPessoal
        </Typography>
      </Box>

      <Grid container justifyContent="flex-end">
        <Box display="flex" justifyContent="start">
          <Link to="/home" className='text-decoration-none'>
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Home
            </Typography>
          </Box>
          </Link>

          <Link to="/posts" className='text-decoration-none'>
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Postagens
            </Typography>
          </Box>
          </Link>

          <Link to="/temas" className='text-decoration-none'>
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Temas
            </Typography>
          </Box>
          </Link>

          <Link to="/formularioTema" className='text-decoration-none'>
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Cadastrar Temas
            </Typography>
          </Box>
          </Link>

              <Box mx={1} className="cursor" onClick={goLogout}>
                  <Typography variant="h6" color="inherit">
                    Logout
                  </Typography>
              </Box>
            
        </Box>
      </Grid>
    </Toolbar>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );

}

export default Navbar;

function setToken(arg0: string) {
  throw new Error('Function not implemented.');
}
