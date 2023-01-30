import React, { useState } from "react";
import { createProduct, categoryBrands, addBrand  } from "../../app/actionsCreators";
import {formData} from './types'
import { Button } from "@chakra-ui/react";
import style from "./crear.module.css";



interface FormState{
  inputValues:formData
}

function AddProdu() {



  const[inputProducts,setInputValues]=useState<FormState['inputValues']>({
    name:'',
    description:'',
    price: 0.000,
    images: '',
    category:'',
    brand:'',

  })

  const handleChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValues({
      ...inputProducts,
      [e.target.name]: e.target.value
      
    })
    console.log(inputProducts);
  }


const handeleSubmit= (e:React.ChangeEvent<HTMLFormElement>) => {
  console.log('hola2', inputProducts);
  e.preventDefault();
  // algo(inputProducts)
  createProduct(inputProducts)
  alert('Creado')
  
}
    return (
      <div >
        <form className={style.form} onSubmit={handeleSubmit}>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.name} type='text' name='name' placeholder="name"/>
          <textarea className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.description}  name='description' placeholder="description"/>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.price} type='number' name='price' placeholder="0"/>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.images} type='text' name='images' placeholder="images"/>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.brand} type='text' name='brand' placeholder="brand"/>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.category} type='text' name='category' placeholder="category"/>
          <Button 
        color='black' 
        type="submit"
        >
          CrearProducto
          </Button>
        </form>
        
      </div>
    );
  }
  
  export default AddProdu;
  