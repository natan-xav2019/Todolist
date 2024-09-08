const express = require('express')
const tasksController = require('./controllers/tasksControlles')
const tasksMiddleware = require('./middlewares/tasksMiddleware')
const router = express.Router()

router.get('/tasks', tasksController.getAll)
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask)
router.delete('/tasks/:id',tasksController.deleteTask)

const updateStack = [
    tasksMiddleware.validateFieldTitle,
    tasksMiddleware.validateFieldStatus,
    tasksController.updateTask] 

router.put('/tasks/:id',updateStack)

module.exports = router