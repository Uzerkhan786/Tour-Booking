import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from "body-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import multer from 'multer'
import { createImage, getImage } from "./Controllers/imageController.js";
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 8000


mongoose.set("strictQuery", false)
const connect = async () => {
   try {
      await mongoose.connect(process.env.MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./public/images")
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
   },
})

const uploadStorage = multer({ storage: storage })
app.post('/', uploadStorage.single("photo"), createImage)
app.get('/', getImage)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/tours", tourRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/booking", bookingRoute)

app.listen(port, async () => {
   await connect()
   console.log('server listening on port', port)
})