import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import Tema from '../../../model/Tema';
import { busca } from '../../../service/Service';
import './ListaTema.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function ListaTema() {
   //trazer a função de navegação interna
   let navigate = useNavigate();
  
   // estado para gerenciar os temas que virão do backend
   const [tema, setTema] = useState<Tema[]>([]);
 
   // trazer o token do navegador para dentro do blog
   const token = useSelector<TokenState, TokenState["tokens"]>( //useSelector é um hook que acessa o store e pega o token e atribui ina constante
  (state) => state.tokens
);
 
   //verificar se a pessoa tem token, se não tiver, mandar pra login
   useEffect(() => {
     if (token === '') {
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
       navigate('/login')
     }
   }, [token])
 
   //função que realmente vai até o backend para buscar os temas
   async function getTema(){
     await busca('/tema', setTema, {
       headers: {'Authorization': token}
     });
   }
 
   //função para disparar a busca de temas assim que a tela for carregada
   useEffect(() => {
     getTema()
   }, [tema.length]);
 
   return (
     <>
     {/* mapeamento do array de temas, para recriar a estrutura inteira para cada tema existente (tema.map) */}
       {tema.map(tema => (
         <Box m={2} key={tema.id} >
         <Card variant="outlined">
           <CardContent>
             <Typography color="textSecondary" gutterBottom>
               Tema
             </Typography>
             <Typography variant="h5" component="h2">
               Tema {tema.id} - {tema.descricao}
             </Typography>
           </CardContent>
           <CardActions>
             <Box display="flex" justifyContent="center" mb={1.5} >
 
               <Link to={`/formularioTema/${tema.id}`} className="text-decoration-none">
                 <Box mx={1}>
                   <Button variant="contained" className="marginLeft" size='small' color="primary" >
                     atualizar
                   </Button>
                 </Box>
               </Link>
               <Link to={`/deletarTema/${tema.id}`} className="text-decoration-none">
                 <Box mx={1}>
                   <Button variant="contained" size='small' color="secondary">
                     deletar
                   </Button>
                 </Box>
               </Link>
             </Box>
           </CardActions>
         </Card>
       </Box>
       ))}
     </>
   );
 }

export default ListaTema;