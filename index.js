const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Middleware para identificar usuário pela header 'user-id'
app.use((req, res, next) => {
  const userId = req.header('user-id')
  if (!userId && req.path !== '/users') {
    return res.status(400).json({ error: 'Header user-id é obrigatório' })
  }
  req.userId = userId
  next()
})

// Rotas
const usersRouter = require('./routes/users')
const mealsRouter = require('./routes/meals')
const metricsRouter = require('./routes/metrics')

app.use('/users', usersRouter)
app.use('/meals', mealsRouter)
app.use('/metrics', metricsRouter)

app.listen(port, () => {
  console.log(`API Daily Diet rodando na porta ${port}`)
})
