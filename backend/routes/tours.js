import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../Controllers/tourControllers.js'
import multer from 'multer'
import { verifyAdmin } from '../utils/verifyToken.js'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
const uploadStorage = multer({ storage: storage })
const router = express.Router()

//Create new tour 
router.post('/', uploadStorage.single("photo"), createTour)

//Update tour 
router.put('/:id', verifyAdmin, updateTour)

//Delete tour 
router.delete('/:id', deleteTour)

//Get single tour 
router.get('/:id', getSingleTour)

//Get all tour 
router.get('/', getAllTour)

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getFeaturedTour", getFeaturedTour)
router.get("/search/getTourCount", getTourCount)




export default router