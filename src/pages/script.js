const API_URL = "http://localhost:3000/tasks"

const taskList = document.querySelector(".task-list")

async function loadTasks () {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        function renderTasks(tasks) {
            taskList.innerHTML = '';

            tasks.forEach((task) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <h4 onclick = "completeTask()" >title: ${task.title}</h4>
                    <p>${task.description ?? ""}</p>
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


loadTasks();