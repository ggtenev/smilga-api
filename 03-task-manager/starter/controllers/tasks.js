const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
    // res.status(200).json({ tasks, amount: tasks.length })
    // res.status(200).json({ tasks, amount: tasks.length,success:true })
}) 

const getOneTask = asyncWrapper(async (req, res, next) => {
  const {id} = req.params
    const task = await Task.findOne({ _id: id })
  if (!task) {
    const err = createCustomError('Not found', 404)
    return next(err)
    }
    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const {id} = req.params
   const task = await Task.findOneAndDelete({ _id: id })
   if (!task) {
     const err = createCustomError('Not found', 404)
    return next(err)
   }
   res.json({
     data: task,
     success:true
   })
})

const editOneTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const newTask = req.body

    const task = await Task.findOneAndUpdate(
      { _id: id },
      newTask,
      { new: true, runValidators: true }
    )
    if (!task) {
      const err = createCustomError('Not found', 404)
      return next(err)
    }
    res.status(200).json({task})
})
const addOneTask = asyncWrapper (async (req, res, next) => {
     const task = new Task({ name: req.body.name, completed: false })
     const item = await task.save()
     res.status(201).json({item})
})

module.exports = {getAllTasks,getOneTask,deleteTask,editOneTask,addOneTask}