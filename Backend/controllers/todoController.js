const db = require('../model/db');

exports.createTask = (req, res) => {
    const { userId, taskName, taskDescription } = req.body;
    const INSERT_TASK_QUERY = `INSERT INTO tasks (userId, taskName, taskDescription) VALUES (?, ?, ?)`;
    db.query(INSERT_TASK_QUERY, [userId, taskName, taskDescription], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Task added successfully' });
        }
    });
};

exports.getAllTasksForUser = (req, res) => {
    const userId = req.params.userId;
    const SELECT_TASKS_QUERY = `SELECT * FROM tasks WHERE userId = ?`;
    db.query(SELECT_TASKS_QUERY, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(result);
        }
    });
};

exports.getAllTasks = (req, res) => {
    const SELECT_TASKS_QUERY = `SELECT * FROM tasks`;
    db.query(SELECT_TASKS_QUERY, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(result);
        }
    });
};


exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const { taskName, taskDescription } = req.body;
    const UPDATE_TASK_QUERY = `UPDATE tasks SET taskName = ?, taskDescription = ? WHERE id = ?`;
    db.query(UPDATE_TASK_QUERY, [taskName, taskDescription, taskId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Task updated successfully' });
        }
    });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;
    const DELETE_TASK_QUERY = `DELETE FROM tasks WHERE id = ?`;
    db.query(DELETE_TASK_QUERY, [taskId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    });
};
