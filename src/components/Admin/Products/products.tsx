import style from "./products.module.css";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { formData } from "./types";
import { createProduct } from "../../../app/actionsCreators";
import Swal from "sweetalert2";

interface FormState {
  inputValues: formData;
}

export default function ProductAdmin() {
  const [inputProducts, setInputValues] = useState<FormState["inputValues"]>({
    name: "",
    description: "",
    price: 0.0,
    images: "",
    category: "",
    brand: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValues({
      ...inputProducts,
      [e.target.name]: e.target.value,
    });
    console.log(inputProducts);
  };

  const handeleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log("hola2", inputProducts);
    e.preventDefault();
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
        <label>Nombre</label>
        <Input
          onChange={(e) => handleChange(e)}
          value={inputProducts.name}
          type="text"
          name="name"
          placeholder="Nombre del producto"
          width="200"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Descripción</label>
        <Input
          width="200"
          type="text"
          placeholder="Descripción del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.description}
          name="description"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Precio (US$)</label>
        <Input
          width="200"
          type="number"
          placeholder="Precio del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.price}
          name="price"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Imagen</label>
        <Input
          width="200"
          type="text"
          placeholder="Imagen del producto"
          onChange={(e) => handleChange(e)}
          value={inputProducts.images}
          name="images"
        />
      </div>
      <div className={style.groupInputs}>
        <label>Marca</label>
        <Input
          width="200"
          type="text"
          placeholder="Marca del producto"
          onChange={(e) => handleChange(e)}
          name="brand"
          value={inputProducts.brand}
        />
      </div>
      <div className={style.groupInputs}>
        <label>Categoría</label>
        <Input
          width="200"
          type="text"
          placeholder="Categoría del producto"
          onChange={(e) => handleChange(e)}
          name="category"
          value={inputProducts.category}
        />
      </div>
      <hr className={style.hrLineDashed} />
      <div className={style.groupButtons}>
        <button className={style.btnWhite}>Cancelar</button>
        <button className={style.btnPrimary}>Crear</button>
      </div>
    </form>
  );
}
