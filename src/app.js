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

const tasks = [
    {
        id: 1,
        title: 'study Node.js',
        description: 'learn express from api',
        completed: false
    }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const search = tasks.find(task => task.id === id);

    if(!search){
        res.status(404).json({
            message: "task not found"
        });
    };

    res.json(search);
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body;
    const search = tasks.find(tasks => tasks.id === id);

    if(!search){
        res.status(404).json({
            message: "task not found"
        });
    };

    if(search.completed === false){
        search.completed = true;    
    }else{
        search.completed = false;
    };

    res.json(search);
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const search = tasks.findIndex(tasks => tasks.id === id);

    if(search === -1){
        res.status(404).json({
            message: "task not found"
        });
    };

    const deletedTask = tasks.splice(search, 1);

    res.json({
        message: "task deleted sucessfully",
        task: deletedTask[0]
    });
});

app.listen(3000, () => {
    console.log("O servidor está rodando a porta 3000");
});
