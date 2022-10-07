import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://blogpessoal-rkbn.onrender.com'
})

export const cadastroUsuario = async (url: any, dados: any, setDados: any) => { 
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const login = async (url: any, dados: any, setDados: any) => {  // /usuarios/logar
  const resposta = await api.post(url, dados)
  setDados(resposta.data.token)
}

export const busca = async (url: any, setDados: any, headers: any) => {  // /usuarios/logar
  const resposta = await api.get(url, headers) // Precisa autenticar
  setDados(resposta.data) //getAll -> Requisição para buscar as postagens
}

export const buscaId = async(url: any,setDados: any, header: any) => { 
  const resposta = await api.get(url,header)
  setDados(resposta.data)
}

export const post = async(url: any, dados: any, setDado: any, header: any) => { 
  const resposta = await api.post(url,dados,header)
  setDado(resposta.data)
}

export const put = async(url: any, dados: any, setDados: any, header: any) => { 
  const resposta = await api.put(url,dados,header)
  setDados(resposta.data)
}

export const deleteId = async(url: any, header: any) => { 
  await api.delete(url,header)
  
}