import style from "./products.module.css"
import { Input, Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import { useState } from "react";
import { postCateogry } from "../../../app/actionsCreators"
import Swal from "sweetalert2";

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

export default function CategoryAdmin() {
  const dispatch = useAppDispatch();
  const categoriesStore = useAppSelector((state) => state.categories)
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    father: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });

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

  function handleSubmit(e:any) {
    e.preventDefault();
    if (errors.name !== "" && errors.description !== "") {
      alert("You must correct the mistakes");
    } else {
      dispatch(
        postCateogry(
          inputs.name,
          inputs.description,
          inputs.father,
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

      setInputs({ name: "", description: "", father: ""});
      setErrors({
        name: "",
        description: ""
      });
    }
  }

  return (
    <div className={style.container}>
      <form id="createActivity" onSubmit={handleSubmit}>
        <div className={style.groupInputs}>
          <label>Nombre</label>
          <Input 
            type='text'
            onChange={handleChange}
            name='name'
            placeholder="Nombre de la categoría"
            width='auto' 
            value={inputs.name}
          />
          <p >{errors.name}</p>
        </div>
        <div className={style.groupInputs}>
          <label>Descripción</label>
          <Input 
            type='text'
            value={inputs.description}
            onChange={handleChange}
            name='description'
            width='auto'/>
            <p >{errors.description}</p>
        </div>
        <div className={style.groupInputs}>
          <label>Cat. padre</label>
          <Select
            name='father'
            onChange={handleChange}
            placeholder="Ninguna"
            value={inputs.father}
            width='auto' >
            { categoriesStore.allCategories.map((category:interfaceCategory) => {
                return <option key={category._id} value={category._id}>{category.name}</option>
              })}
          </Select>
        </div>

        <hr className={style.hrLineDashed}/>
        
        <div className={style.groupButtons}>
          <a href="#" onClick={() => window.history.back()} className={style.btnWhite}>Cancelar</a>
          <button type="submit" className={style.btnPrimary}>Crear</button>
        </div>
      </form>
    </div>
  );
}