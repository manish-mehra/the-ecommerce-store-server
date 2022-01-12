require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');
const cookieParser = require('cookie-parser')
//import db
const connectDB = require('./db/connect')

//router
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(cors())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
//router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('connected to mongodb...')
        app.listen(port, ()=>{
            console.log(`Server running at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()