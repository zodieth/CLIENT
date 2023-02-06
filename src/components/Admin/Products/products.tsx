import style from "./products.module.css";
import { Box, Button, Input, Select, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { formData } from "./types";
import { createProduct } from "../../../app/actionsCreators";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import interfaceBrand from  "../../../features/brands/interfaceBrand";
import CloudinaryUploadWidget from "../../Cloudinary/CloudinaryUploadWidget";

interface FormState {
  inputValues: formData;
}

export default function ProductAdmin() {
  const Store = useAppSelector((state) => state)
  const [inputProducts, setInputValues] = useState<FormState["inputValues"]>({
    name: "",
    description: "",
    price: 0.0,
    images: [],
    category: "",
    brand: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if((document.getElementById('images') as HTMLInputElement).value !== ""){
      let img = (document.getElementById('images') as HTMLInputElement).value;
      (document.getElementById('images') as HTMLInputElement).value = "";
      if(!inputProducts.images.find((image) => image === img)){
        setInputValues({
          ...inputProducts,
          'images': inputProducts.images.concat(img),
        });
      }
    }else{
      setInputValues({
        ...inputProducts,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handeleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(inputProducts);
    createdAlert();
    setInputValues({
      name: "",
      description: "",
      price: 0.0,
      images: [],
      category: "",
      brand: "",
    });
  };

  const createdAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Creado Correctamente",
    });
  };
  return (
    <Box bg={useColorModeValue("white", "whiteAlpha.100")} className={style.container}>
    <form   onSubmit={handeleSubmit}>
      <Box  className={style.groupInputs}>
        <label>Nombre</label>
        <Input
          onChange={(e) => handleChange(e)}
          value={inputProducts.name}
          type="text"
          name="name"
          placeholder="Nombre del producto"
          width='sm'
          
        />
      </Box>
      <Box  className={style.groupInputs}>
        <label>Descripción</label>
        <Input
          width='sm'
          type="text"
          placeholder="Descripción del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.description}
          name="description"
          
        />
      </Box>
      <Box  className={style.groupInputs}>
        <label>Precio (US$)</label>
        <Input
          width='sm'
          type="number"
          placeholder="Precio del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.price}
          name="price"
          
        />
      </Box>
      <Box  className={style.groupInputs}>
        <label>Imagen</label>
        <CloudinaryUploadWidget  />
        <Input
          id="images"
          width='sm'
          type="hidden"
          placeholder="Imagen del producto"
          name="images"
          
        />
      </Box>
      <Box   className={style.groupInputs}>
        <label>Marca</label>
        <Select
            name='brand'
            onChange={(e) => handleChange(e)}
            placeholder="Marca del producto"
            value={inputProducts.brand}
            width='sm' 
            >
            { Store.brands.allBrands.map((brand:interfaceBrand) => {
                return <option key={brand._id} value={brand._id}>{brand.name}</option>
              })}
          </Select>
      </Box>
      <Box  className={style.groupInputs}>
        <label>Categoria</label>
        <Select
          name='category'
          onChange={(e) => handleChange(e)}
          placeholder="Categoría del producto"
          value={inputProducts.category}
          width='sm' 
          >
          { Store.categories.allCategories.map((category:interfaceCategory) => {
              return <option key={category._id} value={category._id}>{category.name}</option>
            })}
        </Select>
      </Box>
      <img id="uploadedimage" src=""></img>
      <hr className={style.hrLineDashed} />
      <Box className={style.groupButtons}>
        <Button className={style.btnWhite}>Cancelar</Button>
        <button type="submit" className={style.btnPrimary}>Crear</button>
      </Box>
    </form>
    </Box>
  );
}
