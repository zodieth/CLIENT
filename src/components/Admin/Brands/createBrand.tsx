import style from "./brand.module.css"
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { postBrand } from "../../../app/actionsCreators"
import Swal from "sweetalert2";

export function validate(inputs: any) {
  let errors = {
    name: "",
  };
  let regularExpresion = /^[A-Z]+$/i;

  if (!inputs.name) errors.name = "The name is required";
  if (inputs.name.length < 3 || inputs.name.length > 15)
    errors.name = "The name must have between 3 and 14 characters";
  if(!regularExpresion.test(inputs.name)) errors.name = "Only letters"
  
  return errors;
}

export default function CreateBrandAdmin() {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
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
    if (errors.name !== "") {
      alert("You must correct the mistakes");
    } else {
      dispatch(
        postBrand(
          inputs.name,
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

      setInputs({ name: ""});
      setErrors({
        name: "",
      });

      window.history.back();
    }
  }

  return (
    <Box bg={useColorModeValue("white", "whiteAlpha.100")} className={style.container}>
      <form id="createActivity" onSubmit={handleSubmit}>
        <Box className={style.groupInputs}>
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
        </Box>
        
        <hr className={style.hrLineDashed}/>
        
        <Box className={style.groupButtons}>
          <a href="#" onClick={() => window.history.back()} className={style.btnWhite}>Cancelar</a>
          <button type="submit" className={style.btnPrimary}>Crear</button>
        </Box>
      </form>
    </Box>
  );
}