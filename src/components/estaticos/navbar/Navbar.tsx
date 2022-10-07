import { AppBar, Toolbar, Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Navbar.css'

function Navbar() {
  const [token, setToken] = useLocalStorage('token')
  let navigate = useNavigate();

  function goLogout(){ //substitui o token por "vazio" - usuário deslogado
    setToken('')
    alert("Usuário deslogado")
    navigate('/login') // direciona p/ Login
  }
  return (
    <>
      <AppBar position="static" className="cor">
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

              <Link to="/tema" className='text-decoration-none'>
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
    </>
  );

}

export default Navbar;