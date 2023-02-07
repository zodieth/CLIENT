import style from "./products.module.css";
import {
  Box,
  Input,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import interfaceCategory from "../../features/categories/interfaceCategory";
import interfaceBrand from "../../features/brands/interfaceBrand";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { putProduct, putUser } from "../../app/actionsCreators";
import Swal from "sweetalert2";
import CloudinaryUploadWidget from "../../components/Cloudinary/CloudinaryUploadWidget";
import Swiper from "react-id-swiper";
import "swiper/swiper.css";
import { redirect, useParams } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import { searchUserByEmail } from "../../app/actionsCreators";

// export function validate(inputs: any) {
//   let errors = {
//     username: "",
//   };
//   let regularExpresion = /^[A-Z]+$/i;

//   if (!inputs.username) errors.username = "The name is required";
//   if (inputs.name.length < 3 || inputs.username.length > 15)
//     errors.username = "The name must have between 3 and 14 characters";
//   if (!regularExpresion.test(inputs.username)) errors.username = "Only letters";

//   return errors;
// }

export default function EditUser() {
  useEffect(() => {
    dispatch(searchUserByEmail(localStorage.getItem("email")));
  }, []);

  const dispatch = useAppDispatch();
  // const userState = useAppSelector((state) => state.user);

  const [inputs, setInputs] = useState({
    username: "",
  });

  const [errors, setErrors] = useState({
    username: "",
  });

  function handleChange(e: any) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  // console.log(localStorage.getItem("user_id"), "IDDDDDDDDDDDDDDDD");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (errors.username !== "") {
      alert("You must correct the mistakes");
    } else {
      dispatch(
        putUser(
          {
            userName: inputs.username,
          },
          localStorage.getItem("user_id")
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

      setErrors({
        username: "",
      });

      window.history.back();
    }
  }

  return (
    <Box
      bg={useColorModeValue("white", "whiteAlpha.100")}
      className={style.container}
    >
      <form className={style.container} onSubmit={handleSubmit}>
        <Box className={style.groupInputs}>
          <label>Username</label>
          <Input
            onChange={(e) => handleChange(e)}
            value={inputs.username}
            type="text"
            name="username"
            placeholder="Username"
            width="sm"
          />
        </Box>

        <hr className={style.hrLineDashed} />

        <Box className={style.groupButtons}>
          <a
            href="#"
            onClick={() => window.history.back()}
            className={style.btnWhite}
          >
            Cancelar
          </a>
          <button className={style.btnPrimary}>Guardar</button>
        </Box>
      </form>
    </Box>
  );
}
