
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
require('dotenv').config()

const taskRouter = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.static('public'))


//routes

app.use('/api/v1/tasks', taskRouter)
app.use(errorHandlerMiddleware)
app.use('*', notFound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log('Task Manager App is connected on port ' + port)
})
  } catch (error) {
    console.log(error);
  }
}

start()


