import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
   {    
      photo: {
         type: String,
         required: true
      },
      name:{
        type:String
      }
      
   },
   { timestamps: true }
);

const image1 =mongoose.model('images',imageSchema);
export default image1
