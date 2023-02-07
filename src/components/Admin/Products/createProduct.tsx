import style from "./products.module.css";
import { Box, Input, Select, useColorModeValue } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formData } from "./types";
import { postProduct } from "../../../app/actionsCreators";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import interfaceBrand from  "../../../features/brands/interfaceBrand";
import CloudinaryUploadWidget from "../../Cloudinary/CloudinaryUploadWidget";
import Swiper from 'react-id-swiper';
import 'swiper/swiper.css';

interface FormState {
  inputValues: formData;
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
              <CloseIcon color="white"/>
            </button>
            <img src={url}></img>
          </Box></Box>
        ))}
      </Swiper>
    </Box>
  )
};

export default function CreateProductAdmin() {
  const dispatch = useAppDispatch();
  const Store = useAppSelector((state) => state)
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inputProducts, setInputValues] = useState<FormState["inputValues"]>({
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
    category: "",
    brand: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInputValues({
      ...inputProducts,
      [e.target.name]: e.target.value,
    });
  };

  const handeleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      name: inputProducts.name,
      description: inputProducts.description,
      price: inputProducts.price,
      images: imageUrls,
      stock: inputProducts.stock,
      category: inputProducts.category,
      brand: inputProducts.brand,
    }
    
    dispatch(postProduct(product));

    createdAlert();
    setInputValues({
      name: "",
      description: "",
      price: 0.0,
      stock: 0,
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

  const handleImageUpload = (url:any) => {
    setImageUrls((prevImageUrls) => [...prevImageUrls, url]);
  };

  return (
    <Box bg={useColorModeValue("white", "whiteAlpha.100")} className={style.container}>
    <form  onSubmit={handeleSubmit}>
      <Box className={style.groupInputs}>
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

      <Box className={style.groupInputs}>
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

      <Box className={style.groupInputs}>
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

      <Box className={style.groupInputs}>
        <label>Stock</label>
        <Input
          width='sm'
          type="number"
          placeholder="Stock del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.stock}
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
            value={inputProducts.brand}
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
          value={inputProducts.category}
          width='sm' >
          { Store.categories.allCategories.map((category:interfaceCategory) => {
              return <option key={category._id} value={category._id}>{category.name}</option>
            })}
        </Select>
      </Box>

      <hr className={style.hrLineDashed} />

      <Box className={style.groupButtons}>
        <a href="#" onClick={() => window.history.back()} className={style.btnWhite}>Cancelar</a>
        <button className={style.btnPrimary}>Crear</button>
      </Box>
    </form>
    </Box>
  );
}
