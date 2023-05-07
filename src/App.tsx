import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Product  from './Product/Add-Fruit'
function App() {

const ApiURl='https://fruityvice.com/api/fruit/all'
const [product, setProduct]=useState([]);
useEffect(() => {
  axios.get(ApiURl).then(res=>{
    setProduct(res.data)  
  }) 
},[])
  return (
    <>
    <div>
    <Product  products={product}/>
    </div>
    </>
  )
}

export default App
