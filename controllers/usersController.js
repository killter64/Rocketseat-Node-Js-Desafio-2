const { v4: uuidv4 } = require('uuid')
const storage = require('../utils/storage')

async function criarUsuario(req, res) {
  const { nome } = req.body
  if (!nome) {
    return res.status(400).json({ error: 'O campo nome é obrigatório' })
  }

  const usuarios = await storage.ler('usuarios.json')
  const novoUsuario = {
    id: uuidv4(),
    nome,
  }
  usuarios.push(novoUsuario)
  await storage.salvar('usuarios.json', usuarios)

  res.status(201).json(novoUsuario)
}

module.exports = {
  criarUsuario,
}
