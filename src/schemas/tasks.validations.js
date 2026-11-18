const validateGet = (req, res, next) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "id must be a number"
        });
    };

    next();
};

const validateCreate = (req, res, next) => {
    const { title, description } = req.body;

    if (title === undefined) {
        return res.status(400).json({
            message: "title don't can be empty"
        });
    };

    next();
};

const validateUpdate = (req, res, next) => {
    const id = Number(req.params.id);
    const { completed } = req. body;

    if (isNaN(id)) {
        return res.status(400).json({
            message: "id must be a number"
        });
    };

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "completed must be a boolean"
        });
    };

    next();
};

const validateDelete = (req, res, next) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "id must be a number"
        });
    };

    next();
};

export default {
    validateGet,
    validateCreate,
    validateUpdate,
    validateDelete
};