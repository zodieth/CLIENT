import style from "./products.module.css";
import { Box, Input, Select, Textarea, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import interfaceBrand from  "../../../features/brands/interfaceBrand";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { putProduct } from "../../../app/actionsCreators"
import Swal from "sweetalert2";
import CloudinaryUploadWidget from "../../Cloudinary/CloudinaryUploadWidget";
import Swiper from 'react-id-swiper';
import 'swiper/swiper.css';
import { redirect, useParams } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";

export function validate(inputs: any) {
  let errors = {
    name: "",
    description: "",
  };
  let regularExpresion = /^[A-Z]+$/i;

  if (!inputs.name) errors.name = "The name is required";
  if (inputs.name.length < 3 || inputs.name.length > 15)
    errors.name = "The name must have between 3 and 14 characters";
  if(!regularExpresion.test(inputs.name)) errors.name = "Only letters"
  
  return errors;
}

interface Props {
  urls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
}

const GrabCursor = ({ urls, setImageUrls }: Props) => {
  const params = {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  const handleClose = (index: number) => {
    setImageUrls(urls.filter((_, i) => i !== index));
  };

  return (
    <Box style={{ width: '400px', marginLeft: '100px', overflow: "hidden", zIndex: "1" }}>
      <Swiper {...params}>
        {urls.map((url, index) => (
          <Box key={index}><Box key={index} style={{ position: 'relative' }}>
            <button
              style={{ position: 'absolute', top: "-1px", right: "5px" }}
              onClick={() => handleClose(index)}
            >
              <CloseIcon color="red"/>
            </button>
            <img src={url}></img>
          </Box></Box>
        ))}
      </Swiper>
    </Box>
  )
};

export default function EditProductAdmin() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const productsStore = useAppSelector((state) => state.products)
  var productSelected:any = productsStore.allProducts.find((product:any) => product._id === id)  
  const [imageUrls, setImageUrls] = useState<string[]>(productSelected.images);
  const Store = useAppSelector((state) => state)
  
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
    category: "",
    brand: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });
  
  useEffect(() => {
    if(productSelected){
      setInputs({
        ...inputs,
        "id": productSelected._id,
        "name": productSelected.name,
        "description": productSelected.description,
        "price": productSelected.price,
        "stock": productSelected.stock,
        "category": productSelected.category._id,
        "brand": productSelected.brand._id,
      })
    }
  },[productSelected])
  
  function handleChange(e: any) {
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

  }

  const handleImageUpload = (url:any) => {
    setImageUrls((prevImageUrls) => [...prevImageUrls, url]);
  };

  function handleSubmit(e:any) {
    e.preventDefault();
    if (errors.name !== "" && errors.description !== "") {
      alert("You must correct the mistakes");
    } else {
      const product = {
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
        images: imageUrls,
        stock: inputs.stock,
        category: inputs.category,
        brand: inputs.brand,
      }

      dispatch(
        putProduct(
          inputs.id,
          product
        )
      );

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
        title: "Agregado Correctamente",
      });

      setInputs({
        id: "",
        name: "",
        description: "",
        price: 0.0,
        stock: 0,
        category: "",
        brand: "",
      });
      setErrors({
        name: "",
        description: ""
      });

      window.history.back();
    }
  }

  return (
    <Box bg={useColorModeValue("white", "whiteAlpha.100")} className={style.container}>
      <form className={style.container} onSubmit={handleSubmit}>
      <Box className={style.groupInputs}>
        <label>Nombre</label>
        <Input
          onChange={(e) => handleChange(e)}
          value={inputs.name}
          type="text"
          name="name"
          placeholder="Nombre del producto"
          width='sm'
        />
      </Box>

      <Box className={style.groupInputs}>
        <label>Descripción</label>
        <Input
          width='sm'
          type="text"
          placeholder="Descripción del producto"
          onChange={(e) => handleChange(e)}
          value={inputs.description}
          name="description"
        />
      </Box>

      <Box className={style.groupInputs}>
        <label>Precio (US$)</label>
        <Input
          width='sm'
          type="number"
          placeholder="Precio del producto"
          onChange={(e) => handleChange(e)}
          value={inputs.price}
          name="price"
        />
      </Box>

      <Box className={style.groupInputs}>
        <label>Stock</label>
        <Input
          width='sm'
          type="number"
          placeholder="Stock del producto"
          onChange={(e) => handleChange(e)}
          value={inputs.stock}
          name="stock"
        />
      </Box>

      <Box className={style.groupInputs}>
        <label>Imagen</label>
        <CloudinaryUploadWidget onSuccess={handleImageUpload}/>
      </Box>

      <GrabCursor urls={imageUrls} setImageUrls={setImageUrls}/>

      <Box className={style.groupInputs}>
        <label>Marca</label>
        <Select
            name='brand'
            onChange={(e) => handleChange(e)}
            placeholder="Marca del producto"
            value={inputs.brand}
            width='sm' >
            { Store.brands.allBrands.map((brand:interfaceBrand) => {
                return <option key={brand._id} value={brand._id}>{brand.name}</option>
              })}
          </Select>
      </Box>

      <Box className={style.groupInputs}>
        <label>Categoria</label>
        <Select
          name='category'
          onChange={(e) => handleChange(e)}
          placeholder="Categoría del producto"
          value={inputs.category}
          width='sm' >
          { Store.categories.allCategories.map((category:interfaceCategory) => {
              return <option key={category._id} value={category._id}>{category.name}</option>
            })}
        </Select>
      </Box>

      <hr className={style.hrLineDashed} />

      <Box className={style.groupButtons}>
        <a href="#" onClick={() => window.history.back()} className={style.btnWhite}>Cancelar</a>
        <button className={style.btnPrimary}>Guardar</button>
      </Box>
    </form>
    </Box>
  );
}
