import  React from 'react'
import {useState,useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import TourCard from '../shared/TourCard';
const Image = () => {
const[img,setImg]=useState([]);
useEffect(()=>{
    fetch('http://localhost:4000/')
    .then(res=>res.json())
    .then(user=>{
        setImg(user.data);
    })
   
   
},[])
console.log(img);
  return (
    <div>
      {
       img.map(val=>(
        <img src={`http://localhost:4000/images/${val.photo}`} alt=""  style={{width:'200px'}}/>
       ))
     }
    </div>
  )
}

export default Image
