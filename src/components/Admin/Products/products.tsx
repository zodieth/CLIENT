import style from "./products.module.css";
import { Input, Select } from "@chakra-ui/react";
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
    images: "",
    category: "",
    brand: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInputValues({
      ...inputProducts,
      [e.target.name]: e.target.value,
    });
    
  };

  const handeleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(test)
    createProduct(inputProducts);
    createdAlert();
    setInputValues({
      name: "",
      description: "",
      price: 0.0,
      images: "",
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
    <form className={style.container} onSubmit={handeleSubmit}>
      <div className={style.groupInputs}>
        <label>Name</label>
        <Input
          onChange={(e) => handleChange(e)}
          value={inputProducts.name}
          type="text"
          name="name"
          placeholder="Nombre del producto"
          width='sm'
        />
      </div>
      <div className={style.groupInputs}>
        <label>Description</label>
        <Input
          width='sm'
          type="text"
          placeholder="Descripcción del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.description}
          name="description"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Price</label>
        <Input
          width='sm'
          type="number"
          placeholder="Precio del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.price}
          name="price"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Images</label>
        <CloudinaryUploadWidget />
        <Input
          id="images"
          width='sm'
          type="text"
          placeholder="Imagen del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.images}
          name="images"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Brand</label>
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
      </div>
      <div className={style.groupInputs}>
        <label>Category</label>
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
      </div>
      <img id="uploadedimage" src=""></img>
      <hr className={style.hrLineDashed} />
      <div className={style.groupButtons}>
        <button className={style.btnWhite}>Cancelar</button>
        <button className={style.btnPrimary}>Guardar</button>
      </div>
    </form>
  );
}
