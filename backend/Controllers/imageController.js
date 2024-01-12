import Tour from "../models/Tour.js";
export const createImage=async(req,res)=>{
    const user=new Tour({
        title:req.body.title,
        desc:req.body.desc,
        address:req.body.address,
        city:req.body.city,
        distance:req.body.distance,
        featured:req.body.featured,
        reviews:req.body.reviews,
        price:req.body.price,
        maxGroupSize:req.body.maxGroupSize,
        photo:req.file.filename
    })
    
    try {
        await user.save();
        console.log(user);
        res.json({
            data:user
        })
    } catch (error) {
        console.log(error);
    }
}

export const getImage=async(req,res)=>{
    
    try {
        const user=await Tour.find();
        console.log(user);
        res.json({
            data:user
        })
    } catch (error) {
        console.log(error);
    }
}