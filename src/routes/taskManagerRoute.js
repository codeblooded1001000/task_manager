const express = require('express')
const {addNewTask, getAll, updateTask, getPendingTasks, getCompletedTasks, deleteTask} = require('../controllers/taskManagerController')
const router = express.Router();
var cacheService = require("express-api-cache");
var cache = cacheService.cache;

router.post('/addNewTask', addNewTask)
router.get('/getAllTasks', cache("10 minutes"), getAll)
router.patch('/updatetask', updateTask)
router.get('/getPendingTasks',cache("10 minutes"), getPendingTasks)
router.get('/getCompletedTasks',cache("10 minutes"), getCompletedTasks)
router.delete('/deleteTask', deleteTask)

module.exports = router