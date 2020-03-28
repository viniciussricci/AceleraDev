const NODE_ENV = process.env.NODE_ENV || 'production'
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (request, response) => {
  const result = await queryHelper(`Select * from ${table};`)

  response.status(200).json(result)
}

const getById = async (request, response) => {
  const { id } = request.params
  const result = await queryHelper(`Select * From ${table} where id = ${id};`)

  response.status(200).json(result)
}

const create = async (request, response) => {
  const data = insertFormatter(request.body)
  const result = await queryHelper(`Insert into ${table}(id, ${data.columns}) values (null, ${data.values});`)

  response.status(201).send({ success: 'A new record has been created.' })
}

const updateById = async (request, response) => {
  const { id } = request.params
  const data = updateFormatter(request.body)
  const result = await queryHelper(`update ${table} set ${data} where id = ${id};`)

  response.status(200).send({ success: 'The record has been updated.' })
}

const deleteById = async (request, response) => {
  const { id } = request.params 
  const result = queryHelper(`Delete from ${table} where id = ${id};`)

  response.status(204).send({})
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
