import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import './CadastroTema.css';
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../model/Tema";
import { buscaId, post, put } from "../../../service/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>(); // captura parametros
    const token = useSelector<TokenState, TokenState["tokens"]>( //useSelector é um hook que acessa o store e pega o token e atribui ina constante
  (state) => state.tokens
);
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })
    
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
        buscaId(`/tema/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("tema " + JSON.stringify(tema))
    
            if (id !== undefined) {
                console.log(tema)
                put(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token // atualizar tema
                    }
                })
                alert('Tema atualizado com sucesso');
            } else {
                post(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token // criar novo tema
                    }
                })
                alert('Tema cadastrado com sucesso');
            }
            back()
    
        }
    
        function back() {
           navigate('/temas') // retorna p/ Temas
        }


    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;