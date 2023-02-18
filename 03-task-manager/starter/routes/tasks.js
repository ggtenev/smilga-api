const express = require('express')
const router = express.Router()

const  {getAllTasks,addOneTask,deleteTask,editOneTask,getOneTask} = require('../controllers/tasks') 

router.route('/').get(getAllTasks).post(addOneTask)
router.route('/:id').get(getOneTask).delete(deleteTask).patch(editOneTask)

module.exports = router

