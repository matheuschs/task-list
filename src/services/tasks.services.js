import { pool } from "../db/server.js"

async function getTasks () {
    const result = await pool.query("SELECT * FROM tasks");

    return result.rows;
};

async function getTaskById (id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    return result.rows[0];
}

export default {
    getTasks,
    getTaskById
};