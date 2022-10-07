import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Postagem from "../../../model/Postagem";
import Tema from "../../../model/Tema";
import { buscaId, deleteId } from "../../../service/Service";



function DeletarPostagem() {

  let navigate = useNavigate();
    const { id } = useParams<{id: string}>(); // caaptura parametros
    const [token, setToken] = useLocalStorage('token');
    const [post, setPosts] = useState<Postagem>()
    
    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagem/${id}`, setPosts, {
            headers: {
              'Authorization': token
            }
          })
        }
        function sim() {
          navigate('/posts')
          deleteId(`/postagem/${id}`, {
            headers: {
              'Authorization': token
            }
          });
          alert('Postagem deletado com sucesso');
        } 
      
        function nao() {
          navigate('/posts')
        }
   
    return (
      <>
        <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button  onClick={nao} variant="contained" size='large' color="secondary">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;