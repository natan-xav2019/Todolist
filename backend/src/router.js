const express = require('express')
const tasksController = require('./controllers/tasksControlles')
const router = express.Router()

router.get('/tasks', tasksController.getAll)

module.exports = router