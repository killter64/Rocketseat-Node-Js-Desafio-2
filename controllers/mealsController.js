const { v4: uuidv4 } = require('uuid')
const storage = require('../utils/storage')

async function criarRefeicao(req, res) {
  const { nome, descricao, dataHora, dentroDaDieta } = req.body
  if (!nome || !descricao || !dataHora || typeof dentroDaDieta !== 'boolean') {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, descricao, dataHora, dentroDaDieta (boolean)' })
  }

  const refeicoes = await storage.ler('refeicoes.json')
  const novaRefeicao = {
    id: uuidv4(),
    userId: req.userId,
    nome,
    descricao,
    dataHora,
    dentroDaDieta,
  }
  refeicoes.push(novaRefeicao)
  await storage.salvar('refeicoes.json', refeicoes)

  res.status(201).json(novaRefeicao)
}

async function listarRefeicoes(req, res) {
  const refeicoes = await storage.ler('refeicoes.json')
  const refeicoesUsuario = refeicoes.filter(r => r.userId === req.userId)
  res.json(refeicoesUsuario)
}

async function obterRefeicao(req, res) {
  const { id } = req.params
  const refeicoes = await storage.ler('refeicoes.json')
  const refeicao = refeicoes.find(r => r.id === id && r.userId === req.userId)
  if (!refeicao) {
    return res.status(404).json({ error: 'Refeição não encontrada' })
  }
  res.json(refeicao)
}

async function atualizarRefeicao(req, res) {
  const { id } = req.params
  const { nome, descricao, dataHora, dentroDaDieta } = req.body
  if (!nome || !descricao || !dataHora || typeof dentroDaDieta !== 'boolean') {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, descricao, dataHora, dentroDaDieta (boolean)' })
  }

  const refeicoes = await storage.ler('refeicoes.json')
  const index = refeicoes.findIndex(r => r.id === id && r.userId === req.userId)
  if (index === -1) {
    return res.status(404).json({ error: 'Refeição não encontrada' })
  }

  refeicoes[index] = {
    ...refeicoes[index],
    nome,
    descricao,
    dataHora,
    dentroDaDieta,
  }
  await storage.salvar('refeicoes.json', refeicoes)
  res.json(refeicoes[index])
}

async function deletarRefeicao(req, res) {
  const { id } = req.params
  const refeicoes = await storage.ler('refeicoes.json')
  const index = refeicoes.findIndex(r => r.id === id && r.userId === req.userId)
  if (index === -1) {
    return res.status(404).json({ error: 'Refeição não encontrada' })
  }
  refeicoes.splice(index, 1)
  await storage.salvar('refeicoes.json', refeicoes)
  res.status(204).send()
}

module.exports = {
  criarRefeicao,
  listarRefeicoes,
  obterRefeicao,
  atualizarRefeicao,
  deletarRefeicao,
}
