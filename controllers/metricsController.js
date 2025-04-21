const storage = require('../utils/storage')

function calcularMelhorSequencia(refeicoes) {
  let melhorSequencia = 0
  let sequenciaAtual = 0

  for (const refeicao of refeicoes) {
    if (refeicao.dentroDaDieta) {
      sequenciaAtual++
      if (sequenciaAtual > melhorSequencia) {
        melhorSequencia = sequenciaAtual
      }
    } else {
      sequenciaAtual = 0
    }
  }

  return melhorSequencia
}

async function obterMetricas(req, res) {
  const refeicoes = await storage.ler('refeicoes.json')
  const refeicoesUsuario = refeicoes.filter(r => r.userId === req.userId)

  const totalRefeicoes = refeicoesUsuario.length
  const totalDentroDaDieta = refeicoesUsuario.filter(r => r.dentroDaDieta).length
  const totalForaDaDieta = totalRefeicoes - totalDentroDaDieta
  const melhorSequencia = calcularMelhorSequencia(refeicoesUsuario)

  res.json({
    totalRefeicoes,
    totalDentroDaDieta,
    totalForaDaDieta,
    melhorSequencia,
  })
}

module.exports = {
  obterMetricas,
}
