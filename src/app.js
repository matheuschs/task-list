import express from "express";
//import swaggerUi from "swagger-ui-express";
//import YAML from "yamljs";

const app = express();
app.use(express.json());

//const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
//app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import tasksRouter from "./routes/tasks.routes.js";

app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "internal server error"
    });
})

app.listen(3000, () => {
    console.log("O servidor está rodando a porta 3000");
});
