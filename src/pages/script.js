const API_URL = "http://localhost:3000/tasks"

const taskList = document.querySelector(".task-list")
const msg = document.querySelector('#msg');
const form = document.querySelector('.task-form');

async function loadTasks () {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        function renderTasks(tasks) {
            taskList.innerHTML = '';

            tasks.forEach((task) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <h4>title: ${task.title}</h4>
                    <p>${task.description ?? ""}</p>
                    <button onclick="updateTask()">Complete</button>
                    <button onclick="deleteTask()">Delete</button>
                    <hr>
                `;
                taskList.appendChild(li);
            });  
        };
        renderTasks(tasks.data);
        console.log("tasks received: ", tasks);
    } catch (erro) {
        console.error("Error getting tasks", erro);
    };
};

async function createTask (event) {
    event.preventDefault();
    const taskData = {
        title: document.getElementById("task-name").value,
        description: document.getElementById("task-description").value
    };

    try {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        const result = await response.json();

        if(response.ok){
            form.reset();
            await loadTasks();
            msg.textContent = "Task created suscessfull";
        } else{
            msg.textContent = "Erro: " + result.message;
        };
    } catch (erro) {
        console.log(erro)
        msg.textContent = "Falha ao conectar com o servidor";
    };
};

form.addEventListener("submit", createTask);
loadTasks();