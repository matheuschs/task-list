import { pool } from "../db/server.js";
import tasksServices from "../services/tasks.services.js";

async function getTasks (req, res, next) {
    try {
        const task = await tasksServices.getTasks();
        
        res.json(task);
    } catch (error) {
        next(error);
    };
};

async function getTaskById (req, res, next) {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                message: "id must be a number"
            });
        };

        const task = await tasksServices.getTaskById(id);

        res.json(task);
        
    } catch (error) {
        next(error);
    };
};

async function createTask (req, res, next) {
    try {
        const { title, description } = req.body;
        
        if (title === undefined) {
            return res.status(400).json({
                message: "title don't can be empty"
            });
        };

        const task = tasksServices.createTask(title, description);

        res.status(201).json({
            message: "task created",
            task: task
        });

    } catch (error) {
        next(error);
    };
};

async function updateTask (req, res, next) {
    try {
        const id = Number(req.params.id);
        const { completed } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "id must be a number"
            });
        };

        if(typeof completed !== "boolean") {
            return res.status(400).json({
                message: "completed must be a boolean"
            });
        };

        const task = tasksServices.updateTask(id, completed);

        res.status(200).json({
            message: "task modified",
            task: task
        });
        
    } catch (error) {
        next(error);
    };
};

async function deleteTask (req, res, next) {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                message: "id must be a number"
            });
        };

        const task = tasksServices.deleteTask(id);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "task not found"
            });
        };

        res.json({
            message: "task deleted",
            task: task
        });

    } catch (error) {
        next(error);
    };
};

export default {
    getTasks,
    getTaskById,
    updateTask,
    createTask,
    deleteTask
};
