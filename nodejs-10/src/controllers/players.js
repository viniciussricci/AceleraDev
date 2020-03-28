const model = require('../models')['players']
const { Op } = require('sequelize')

let Players = {}

Players.getAll = async (req, res, next) => {
  const { score, nationality } = req.query

  if(nationality && score){
    const result = await model.findAll({
      where: {
        nationality,
        score:{
          [Op.gte]:score
        }
      }
    })

    res.status(200).send({
      total:result.length,
      data:result
    })

  }else if(nationality){
    const result = await model.findAll({
      where: { nationality }
    })

   res.status(200).send({
     total:result.length,
     data:result
   }) 

  }else if(score){
    const result = await model.findAll({
      where: {
        score:{
          [Op.gte]: score
        }
      }
    })

    res.status(200).send({
      total:result.length,
      data:result
    })     
  }else{
    const result = await model.findAll({})

    res.status(200).send({
      total:result.length,
      data:result
    }) 
  }
}

Players.getById = async (req, res, next) => {
  const { playerId } = req.params
  
  const result = await model.findOne({
    where: { id: playerId } 
  })

  res.status(200).send(result)  
}

Players.create = async (req, res, next) => {
  const result = await model.create(req.body)

  res.status(201).send(result)
}

Players.update = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.update(req.body, {
    where: { id: playerId }
  })

  res.status(200).json({ result })
}

Players.delete = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.destroy({
    where: { id: playerId }
  })

  res.status(204).json({ result })
}

module.exports = Players
