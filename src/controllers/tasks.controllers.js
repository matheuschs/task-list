import { pool } from "../db/server.js";

async function getTasks (req, res, next) {
    try {
        const result = await pool.query(`SELECT * FROM tasks`);  
        
        res.json(result.rows);

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

        const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);

        res.json(result.rows[0]);
        
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

        const result = await pool.query(`
            INSERT INTO tasks (title, description)
            VALUES($1, $2)
            RETURNING *`,
            [title, description]
        );

        res.status(201).json({
            message: "task created",
            task: result.rows[0]
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

        const result = await pool.query(`
            UPDATE tasks
            SET completed = $1
            WHERE id = $2
            RETURNING *`,
            [completed, id]
        );

        res.status(200).json({
            message: "task modified",
            task: result.rows[0]
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

        const result = await pool.query(`
            DELETE FROM tasks
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "task not found"
            });
        };

        res.json({
            message: "task deleted",
            task: result.rows[0]
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
