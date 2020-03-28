const teamsModel = require('../models')['teams']
const playersModel = require('../models')['players']

let Teams = {}

Teams.getAll = async (req, res, next) => {
  const result = await teamsModel.findAll({
    include: playersModel
  })

  res.status(200).send({
    total: result.length,
    data: result
  })
}

Teams.getById = async (req, res, next) => {
  const { teamId } = req.params

  const result = await teamsModel.findOne({
    where: { id: teamId },
    include : playersModel
  })

  res.status(200).send(result)
}

Teams.getTeamPlayers = async (req, res, next) => {
  const { teamId } = req.params;

  const result = await playersModel.findAll({
    where: { teamId: teamId }
  });

  res.status(200).send({
    total: result.length,
    data: result
  });
};

Teams.create = async (req, res, next) => {
  const result = await teamsModel.create(req.body)

  res.status(201).send(result)
}

Teams.update = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.update(req.body, {
    where: { id: teamId }
  })

  res.status(200).json({ result })
}

Teams.delete = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.destroy({
    where: { id: teamId }
  })

  res.status(204).json({ result })
}

module.exports = Teams
