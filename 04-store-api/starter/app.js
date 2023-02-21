require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')

// async errors

const express = require('express')
const app = express()

const productsRouter = require('./routes/products')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const { getAllProducts } = require('./controllers/products')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products" >Products routue</a>')
})

app.use('/api/v1/products',productsRouter)


//products route


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//port setup
const port = process.env.PORT || 3000


const start = async () => {
  try {
    //connect to DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log('listening to port ' + port);
    })
  } catch (error) {
    console.log(error);
  }
}

start()