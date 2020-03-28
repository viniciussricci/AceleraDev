const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { animals } = require('./model/')

app.use(bodyParser.json())

app.get('/v1/animals', async (req, res, next) => {
  const result = await animals.findAll({})

  res.status(200).json({
    total: result.length,
    data: result
  })
})

app.get('/v1/animals/:animalId', async (req, res, next) => {
  const { animalId } = req.params
  const result = await animals.findOne({
    where: { id: animalId }
  })

  res.status(200).send(result)
})

app.post('/v1/animals', async (req, res, next) => {
  const result = await animals.create(req.body)

  res.status(201).send(result)
})

app.patch('/v1/animals/:animalId', async (req, res, next) => {
  const { animalId } = req.params
  const result = await animals.update(req.body, {
    where: { id : animalId }
  })

  res.status(200).json(result)
})

app.delete('/v1/animals/:animalId', async (req, res, next) => {
  const { animalId } = req.params
  const result = await animals.destroy({
    where: { id: animalId }
  })

  res.status(204).json({})
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
