import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Postagem from "../../../model/Postagem";
import Tema from "../../../model/Tema";
import { busca, buscaId, post, put } from "../../../service/Service";
import { TokenState } from "../../../store/tokens/tokensReducer";

function CadastroPost() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [Temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>( //useSelector é um hook que acessa o store e pega o token e atribui ina constante
  (state) => state.tokens
);

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
            navigate("/login") // se não estiver logado, redireciona p/ login

        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })

        const [postagem, setPostagem] = useState<Postagem>({
            id: 0,
            titulo: '',
            texto: '',
            data: '',
            tema: null
        })
    
        useEffect(() => { 
            setPostagem({
                ...postagem,
                tema: tema
            })
        }, [tema])

        useEffect(() => {
            getTemas()
            if (id !== undefined) {
                findByIdPostagem(id)
            }
        }, [id])
    
        async function getTemas() {
            await busca("/tema", setTemas, {
                headers: {
                    'Authorization': token
                }
            })
        }
    
        async function findByIdPostagem(id: string) { //faz uma busca por id
            await buscaId(`postagem/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        }
    
        function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    
            setPostagem({
                ...postagem,
                [e.target.name]: e.target.value,
                tema: tema
            })
    
        }
    
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
    
            if (id !== undefined) {
                put(`/postagem`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Postagem atualizada com sucesso', {
                    position: "top-right", 
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                  });
            } else {
                post(`/postagem`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Postagem cadastrada com sucesso', {
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
            back()
    
        }
    
        function back() {
            navigate('/posts')
        }
 
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            Temas.map(tema => (
                                <MenuItem value={tema.id} style={{display: 'block'}}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;