const express = require('express')
const router = express.Router()
const controller = require('../src/controllers/index')

router.get('/', controller.getAll)

router.get('/:studentId', controller.getById)

router.post('/', controller.create)

router.put('/:studentId', controller.update)

router.delete('/:studentId', controller.delete)

module.exports = router