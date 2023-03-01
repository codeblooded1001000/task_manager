const signupRoutes = require("./src/routes/userRoute");
const tasksRoutes = require("./src/routes/taskManagerRoute");

const router = {
    '/users': signupRoutes,
    '/tasks': tasksRoutes
};
module.exports = router