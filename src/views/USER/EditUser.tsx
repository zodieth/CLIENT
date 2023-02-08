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

export default function EditUser() {
  useEffect(() => {
    dispatch(searchUserByEmail(localStorage.getItem("email")));
  }, []);

  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    username: "",
    id: "",
  });
  const userState = useAppSelector((state) => state.user);

  const [errors, setErrors] = useState(false);

  function handleChange(e: any) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  console.log(inputs);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (inputs.username.length < 5) {
      setErrors(true);
    } else if (!inputs.id.length) {
      setErrors(true);
    } else {
      dispatch(
        putUser(
          {
            userName: inputs.username,
          },
          inputs.id
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

      setErrors(false);

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
          <label>Usuario anterior</label>
          <select name="id" onChange={(e) => handleChange(e)}>
            <option value="usuario">usuario</option>
            <option value={userState.user._id}>
              {userState.user.userName}
            </option>
          </select>
          {(errors && !inputs.id) || (errors && inputs.id === "usuario") ? (
            <div className={style.errorMsj}>
              Debe seleccionar el usuario anterior
            </div>
          ) : (
            ""
          )}
        </Box>

        <Box className={style.groupInputs}>
          <label>Nuevo usuario</label>
          <Input
            onChange={(e) => handleChange(e)}
            value={inputs.username}
            type="text"
            name="username"
            placeholder="Username"
            width="sm"
          />
          {errors && inputs.username.length < 5 ? (
            <div className={style.errorMsj}>
              Debe contener al menos 5 caracteres
            </div>
          ) : (
            ""
          )}
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
