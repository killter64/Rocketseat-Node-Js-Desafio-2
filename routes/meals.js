const express = require('express')
const router = express.Router()
const mealsController = require('../controllers/mealsController')

router.post('/', mealsController.criarRefeicao)
router.get('/', mealsController.listarRefeicoes)
router.get('/:id', mealsController.obterRefeicao)
router.put('/:id', mealsController.atualizarRefeicao)
router.delete('/:id', mealsController.deletarRefeicao)

module.exports = router
