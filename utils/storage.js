const fs = require('fs').promises
const path = require('path')

const dataDir = path.resolve(__dirname, '..', 'data')

async function ler(filename) {
  try {
    const filePath = path.join(dataDir, filename)
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function salvar(filename, data) {
  const filePath = path.join(dataDir, filename)
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

module.exports = {
  ler,
  salvar,
}
