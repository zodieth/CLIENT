import style from "./products.module.css"
import { Input, Select, Textarea } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import { useEffect, useState } from "react";
import { putCateogry } from "../../../app/actionsCreators"
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

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

export default function EditCategoryAdmin() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const categoriesStore = useAppSelector((state) => state.categories)
  var categorySelected:any = categoriesStore.allCategories.find((categoria:any) => categoria._id === id)  
  
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    description: "",
    father: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });
  
  useEffect(() => {
    if(categorySelected){
      setInputs({
        ...inputs,
        "id": categorySelected._id,
        "name": categorySelected.name,
        "description": categorySelected.description,
        "father": categorySelected.father._id
      })
    }
  },[categorySelected])
  
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
        putCateogry(
          inputs.id,
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

      setInputs({id: "", name: "", description: "", father: ""});
      setErrors({
        name: "",
        description: ""
      });
    }
  }

  return (
    <div className={style.container}>
      <form id="createActivity" onSubmit={handleSubmit}>
        <input type="hidden" value="{categorySelected?.id}" />
        <div className={style.groupInputs}>
          <label>Nombre</label>
          <Input 
            type='text'
            onChange={handleChange}
            name='name'
            placeholder="Nombre de la categoría"
            width='sm' 
            value={inputs.name}
          />
          <p >{errors.name}</p>
        </div>
        <div className={style.groupInputs}>
          <label>Descripción</label>
          <Textarea 
            value={inputs.description}
            onChange={handleChange}
            name='description'
            width='sm'/>
            <p >{errors.description}</p>
        </div>
        <div className={style.groupInputs}>
          <label>Cat. padre</label>
          <Select
            name='father'
            onChange={handleChange}
            placeholder="Ninguna"
            value={inputs.father}
            width='sm' >
            { categoriesStore.allCategories.map((category:interfaceCategory) => {
                return <option key={category._id} value={category._id}>{category.name}</option>
              })}
          </Select>
        </div>

        <hr className={style.hrLineDashed}/>
        
        <div className={style.groupButtons}>
          <a href="./" className={style.btnWhite}>Cancelar</a>
          <button type="submit" className={style.btnPrimary}>Guardar</button>
        </div>
      </form>
    </div>
  );
}