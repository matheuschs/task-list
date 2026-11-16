import express from "express";
import { Pool } from 'pg';

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const app = express();

app.use(express.json());

app.get("/tasks", async (req, res) => {
    const result = await pool.query(`SELECT * FROM tasks`);

    res.json(result.rows);
});

app.get("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const search = tasks.find(task => task.id === id);

    if(!search){
        res.status(404).json({
            message: "task not found"
        });
    };

    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);

    res.json(result.rows[0]);
});

app.post("/tasks", async (req, res) => {
    const { title, description } = req.body;

    const result = await pool.query(
        `INSERT INTO tasks (title, description)
        VALUES ($1, $2)
        RETURNING *`, 
        [title, description]
    );

    res.status(201).json(result.rows[0]);

});

app.patch("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    const result = await pool.query(
        `UPDATE tasks
        SET completed = $1
        WHERE id = $2
        RETURNING *`,
        [completed, id]
    );

    if(result.rows.length === 0){
        return res.status(404).json({
            message: "task not found"
        });
    }

    res.json(result.rows[0]);

});

app.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const result = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);

    if(result.rows.length === 0){
        res.status(404).json({
            message: "task not found"
        });
    };

    res.json({
        message: "task deleted sucessfully",
        task: result.rows[0]
    });
});

app.listen(3000, () => {
    console.log("O servidor está rodando a porta 3000");
});
