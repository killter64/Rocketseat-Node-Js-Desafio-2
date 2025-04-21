const express = require('express')
const router = express.Router()
const metricsController = require('../controllers/metricsController')

router.get('/', metricsController.obterMetricas)

module.exports = router
