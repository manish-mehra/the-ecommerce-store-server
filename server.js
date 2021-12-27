require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
//import db
const connectDB = require('./db/connect')

app.use(express.json())

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