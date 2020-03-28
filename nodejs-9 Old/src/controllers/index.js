const model = require('./models')['students']

let Students = {}

Students.getAll = async (request, response, next) => {
  const result = await model.findAll()

  response.status(200).json(result)
}

Students.getById = async (request, response, next) => {
  const  id   = request.params
  const result = await model.findById(id)

  response.status(200).json(result[0])
}

Students.create = (request, response, next) => {
  const result = model.create(request.body)

  response.status(201).json(
    {
      success: 'A new record has been created.'
    }
  )
}

Students.update = (request, response, next) => {
  const { studentId } = request.params
  const result = model.update(request.body, studentId)

  response.status(200).json(
    {
      success: 'The record has been updated.'
    }
  )
}

Students.delete = (request, response, next) => {
  const { studentId } = request.params
  const result = model.delete(studentId)

  response.status(204).json({ result })
}

module.exports = Students
