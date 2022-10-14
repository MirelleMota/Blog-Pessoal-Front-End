import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Postagem from "../../../model/Postagem";
import Tema from "../../../model/Tema";
import { buscaId, deleteId } from "../../../service/Service";
import { TokenState } from "../../../store/tokens/tokensReducer";



function DeletarPostagem() {

  let navigate = useNavigate();
    const { id } = useParams<{id: string}>(); // caaptura parametros
    const token = useSelector<TokenState, TokenState["tokens"]>( //useSelector é um hook que acessa o store e pega o token e atribui ina constante
  (state) => state.tokens
);
    const [post, setPosts] = useState<Postagem>()
    
    useEffect(() => {
        if (token == "") {
          toast.error('Você precisa estar logado', {
            position: "top-right", 
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
          });
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
          toast.success('Postagem deletada com sucesso', {
            position: "top-right", 
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
          });
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