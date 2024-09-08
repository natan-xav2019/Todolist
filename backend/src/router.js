const express = require('express')
const tasksController = require('./controllers/tasksControlles')
const tasksMiddleware = require('./middlewares/tasksMiddleware')
const router = express.Router()

router.get('/tasks', tasksController.getAll)
router.post('/tasks', tasksMiddleware.validateBody, tasksController.createTask)
router.delete('/tasks/:id',tasksController.deleteTask)

module.exports = router