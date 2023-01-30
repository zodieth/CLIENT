import React, { useState } from "react";
import { createProducts, algo, categoryBrands, addBrand  } from "../../app/actionsCreators";
import {formData} from './types'
import { Button } from "@chakra-ui/react";
import style from "./crear.module.css";
// import {useAppDispatch, useAppSelector } from "../../app/hooks";
// import { Select} from "@chakra-ui/react";
// import interfaceBrand from  "../../features/brands/interfaceBrand";
// import interfaceCategory from  "../../features/categories/interfaceCategory";

interface FormState{
  inputValues:formData
}

function AddProdu() {

  // const dispatch = useAppDispatch();
  // const brands = useAppSelector((state) => state.brands)
  // const categories = useAppSelector((state) => state.categories)
  // const handleSearch = () => {
  //   const category = document.querySelector("#category") as HTMLInputElement;
  //   const brand = document.querySelector("#brand") as HTMLInputElement;
   
  //   dispatch(categoryBrands( category.value, brand.value));
  // }


  const[inputProducts,setInputValues]=useState<FormState['inputValues']>({
    name:'',
    description:'',
    price: 0,
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

  // const handleSelect= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setInputValue({
  //       ...inputValues,
  //       formData.category:[ e.target.value]
  //   })

const handeleSubmit= (e:React.ChangeEvent<HTMLFormElement>) => {
  console.log('hola2', inputProducts);
  e.preventDefault();
  algo(inputProducts)
  createProducts()
  alert('Creado')
  
}
    return (
      <div >
        <form className={style.form} onSubmit={handeleSubmit}>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.name} type='text' name='name' placeholder="name"/>
          <textarea className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.description}  name='description' placeholder="description"/>
          <input className={style.input} onChange={(e) => handleChange(e)} value={inputProducts.price} type='number' name='price' placeholder="price"/>
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
        {/* <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Categorias"
            color="Gray"
            id="category"
            borderColor="Gray"
            onChange={handleSearch}
          >
            { categories.allCategories.map((category:interfaceCategory) => {
              return <option key={category._id} value={category.name}>{category.name}</option>
            })}
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Marcas"
            color="Gray"
            id="brand"
            borderColor="Gray"
            onChange={handleSearch}
          >
            { brands.allBrands.map((brand:interfaceBrand) => {
              return <option key={brand._id} value={brand.name}>{brand.name}</option>
            })}
          </Select>
        </div> */}
        
        
      </div>
    );
  }
  
  export default AddProdu;
  