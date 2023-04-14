import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import db from './config/database.js'
import userRoute from './router/user.js'
import authRoute from './router/auth.js'


dotenv.config()
const app = express()
const port = process.env.PORT
const corsOptions = {
    origin: true,
    credentials: true
}

db.sync({ force: false })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.listen(port, () => {
    console.log("Server listening on port:", port)
})