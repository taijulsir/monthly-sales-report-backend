/* eslint-disable no-undef */
// imports
import cors from 'cors'
import environment from 'dotenv'
import colors from 'colors'
import express from 'express'
import fileUpload from 'express-fileupload'

import connectDB from './config/db.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import routes from './routes/routes.js'


const dotenv = environment.config()
const port = process.env.PORT
connectDB()
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, //5MB max file(s) size
}))

app.use(express.static('public'))

app.use('/api', routes)

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port} at ${new Date}.`))




app.get('/', (req, res) => {
    res.send('API is running...')
})




