import express from "express";

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
})

app.listen(3000, () => {
    console.log("O servidor está rodando a porta 3000");
});
