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

        const task = await tasksServices.getTaskById(id);

        res.json(task);
        
    } catch (error) {
        next(error);
    };
};

async function createTask (req, res, next) {
    try {
        const { title, description } = req.body;

        const task = await tasksServices.createTask(title, description);

        if (!task) {
            return res.status(404).json({
                message: "task not found"
            });
        };

        res.json(task);

    } catch (error) {
        next(error);
    };
};

async function updateTask (req, res, next) {
    try {
        const id = Number(req.params.id);
        const { completed } = req.body;

        const task = await tasksServices.updateTask(id, completed);

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

        const task = await tasksServices.deleteTask(id);

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
