import style from "./brand.module.css"
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { putBrand } from "../../../app/actionsCreators"
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

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

export default function EditBrandAdmin() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const brandsStore = useAppSelector((state) => state.brands)
  var brandSelected:any = brandsStore.allBrands.find((brand:any) => brand._id === id)  
  
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  
  useEffect(() => {
    if(brandSelected){
      setInputs({
        ...inputs,
        "id": brandSelected._id,
        "name": brandSelected.name,
      })
    }
  },[brandSelected])
  
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
        putBrand(
          inputs.id,
          {
            name: inputs.name
          }
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

      setInputs({id: "", name: ""});
      setErrors({
        name: ""
      });

      window.history.back();
    }
  }

  return (
    <Box bg={useColorModeValue("white", "whiteAlpha.100")} className={style.container}>
      <form id="createBrand" onSubmit={handleSubmit}>
        <input type="hidden" value="{categorySelected?.id}" />
        <Box className={style.groupInputs}>
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
        </Box>

        <hr className={style.hrLineDashed}/>
        
        <Box className={style.groupButtons}>
          <a href="#" onClick={() => window.history.back()} className={style.btnWhite}>Cancelar</a>
          <button type="submit" className={style.btnPrimary}>Guardar</button>
        </Box>
      </form>
    </Box>
  );
}
