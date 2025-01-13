import express from 'express'
import { connectDB } from './src/config/mongodb.js'
import usersRouter from '../'
import bookRouter from './routes/books.js'

process.loadEnvFile()
const { PORT } = process.env ?? 3501
const { CONNECTION_STRING } = process.env

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', usersRouter)

app.use('/api/books', bookRouter)

app.use("*", (req, res) => {
  res.status(404).json({ error: "resource not found" })
})

app.listen(PORT, () => {
  console.log(`Server running and listening on http://localhost:${PORT}`)
  connectDB(CONNECTION_STRING)
})
