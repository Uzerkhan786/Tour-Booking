import React, { useState } from 'react'
import { BASE_URL } from '../utils/config'
const TourCreate = () => {
    const[tour,setTour]=useState({
        title:'',
        city:'',
        address:'',
        desc:'',
        price:'',
        distance:'',
        maxGroupSize:'',
        photo:''
    })
    const createTour=async()=>{
        const response=await fetch(`${BASE_URL}`,{
            method:'POST'
        ,
        body:JSON.stringify({
            title:tour.title,
            city:tour.city,
            address:tour.address,
            desc:tour.desc,
            price:tour.price,
            distance:tour.distance,
            maxGroupSize:tour.maxGroupSize,
            photo:tour.photo
        } ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json=await response.json();
    console.log(json.data);
        
    }
    const submitForm=(e)=>{
         e.preventDefault();
         createTour();
        console.log(tour);

    }
    const change=(e)=>{
        setTour({...tour,[e.target.id]:e.target.value})
    }
  return (
    <div>
     <form   onSubmit={submitForm} enctype="multipart/form-data" >
        <input type="text"  id='title' name='title' onChange={change}/>
        <input type="text"  id='city' name='city' onChange={change}/>
        <input type="text"  id='address' name='address' onChange={change}/>
        <input type="text"  id='desc' name='desc' onChange={change}/>
        <input type="number"  id='price' name='price' onChange={change}/>
        <input type="number"  id='distance' name='distance' onChange={change}/>
        <input type="number"  id='maxGroupSize' name='maxGroupSize' onChange={change}/>
        <input type="file"  id='photo' name='photo' onChange={change}/>
       
        <button type='submit'>Submit</button>
     </form>
    </div>
  )
}

export default TourCreate
