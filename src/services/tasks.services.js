import { pool } from "../db/server.js"

async function getTasks () {
    const result = await pool.query("SELECT * FROM tasks");

    return result.rows;
};

async function getTaskById (id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    return result.rows[0];
};

async function createTask (title, description) {
    const result = await pool.query("INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *", [title, description]);

    return result.rows[0];
};

async function updateTask (id, completed) {
    const result = await pool.query("UPDATE task SET completed = $1 WHERE id = $2", [completed, id]);

    return result.rows[0];
};

async function deleteTask (id) {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    return result.rows[0];
};

export default {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};