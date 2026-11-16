import { Router } from "express";
const router = Router();

import { pool } from "../db/server.js";

router.get("/", async (req, res, next) => {
    try{
        const result = await pool.query(`SELECT * FROM tasks`);

        res.json(result.rows);
    }catch(error){
        next(error)
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if(isNaN(id)){
            res.status(404).json({
                message: "id must be a number"
            });
        };

        const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);

        res.json(result.rows[0]);        
    } catch (error) {
        next(error)
    };
});

router.post("/", async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;

        if(title === ""){
            return res.status(400).json({
                message: "title don't can be empty"
            });
        };

        const result = await pool.query(
            `INSERT INTO tasks (title, description)
            VALUES ($1, $2)
            RETURNING *`, 
            [title, description]
        );

        res.status(201).json(result.rows[0]);        
    } catch (error) {
        next(error);  
    };
});

router.patch("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { completed } = req.body;

        if(isNaN(id)){
            return res.json(400).json({
                message: "id must be a number"
            });
        };

        if(typeof completed !== "boolean"){
            return res.status(400).json({
                message: "completed must be a boolean"
            });
        };

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
    } catch (error) {
        next(error)
    };
});

router.delete("/:id", async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    };
});

export default router;