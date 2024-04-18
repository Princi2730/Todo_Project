const express = require('express');
const router = express.Router();
const taskController = require('../controllers/todoController');

router.post('/api/tasks', taskController.createTask);
router.get('/api/tasks/:userId', taskController.getAllTasksForUser);
router.put('/api/tasks/:taskId', taskController.updateTask);
router.delete('/api/tasks/:taskId', taskController.deleteTask);
router.get('/api/alltasks',taskController.getAllTasks)

module.exports = router;