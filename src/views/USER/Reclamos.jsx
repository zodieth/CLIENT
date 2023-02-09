import style from "./products.module.css";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import interfaceCategory from "../../features/categories/interfaceCategory";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  fetchSalesApi,
  getSales,
  postClaim,
  searchUserByEmail,
} from "../../app/actionsCreators";
import Swal from "sweetalert2";

import "swiper/swiper.css";

export default function Reclamos() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const [inputs, setInputs] = useState({
    sale: "",
    issue: "",
    description: "",
    user: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchSalesApi());
    //dispatch(searchUserByEmail(localStorage.getItem("email")));
  }, []);

  const sales = useAppSelector((state) => state.sales);

  const userSales = sales.allSales.filter(
    (sale) => sale.user._id === userState.user._id
  );

  const [errors, setErrors] = useState(false);

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  function error(error) {
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
      icon: "error",
      title: "Agregado Correctamente",
      text: error,
    });
  }

  function error(error){
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
      icon: "error",
      title: "Agregado Correctamente",
      text: error
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputs.description.length < 10) {
      setErrors(true);
      error("La descripción no puede ser menor a 10 caracteres");
    } else if (!inputs.user.length) {
      setErrors(true);
      error("Debe seleccionar un usuario");
    } else if (!inputs.email.length) {
      setErrors(true);
      error("Debe proporcionar un correo");
    } else if (inputs.issue === "") {
      setErrors(true);
      error("Debe seleccionar un problema");
    } else {
      dispatch(postClaim(inputs));

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
          <label>Compra</label>
          <select
            className={style.select}
            name="sale"
            placeholder="Compra"
            onChange={(e) => handleChange(e)}
          >
            {userSales.map((e) => {
              return (
                <option key={e._id} value={e._id}>
                  {e.products.map((e) => {
                    return <option key={e._id}>{e.product.name}</option>;
                  })}
                </option>
              );
            })}
          </select>
        </Box>

        <Box className={style.groupInputs}>
          <label>Problema</label>
          <select
            name="issue"
            placeholder="issue"
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="missing">Perdido</option>
            <option value="damaged">Dañado</option>
            <option value="wrong">Erróneo</option>
          </select>
        </Box>

        <Box className={style.groupInputs}>
          <label>Descripcción</label>
          <input
            name="description"
            placeholder="Descripcción"
            onChange={(e) => [handleChange(e)]}
          ></input>
          {errors && inputs.description < 10 ? (
            <div className={style.errorMsj}>
              La descripcción debe tener al menos 10 caracteres
            </div>
          ) : (
            ""
          )}
        </Box>
        <Box className={style.groupInputs}>
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            onChange={(e) => [handleChange(e)]}
          ></input>
          {errors && !inputs.email ? (
            <div className={style.errorMsj}>
              Debe completar el campo de Email
            </div>
          ) : (
            ""
          )}
        </Box>
        <Box className={style.groupInputs}>
          <label>Usuario</label>

          <select
            name="user"
            placeholder="issue"
            onChange={(e) => handleChange(e)}
          >
            <option value="usuario">Usuario</option>
            <option value={userState.user._id}>
              {userState.user.userName}
            </option>
          </select>
          {(errors && !inputs.user) || (errors && inputs.user === "usuario") ? (
            <div className={style.errorMsj}>Debe seleccionar el usuario</div>
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
          <button className={style.btnPrimary}>Enviar</button>
        </Box>
      </form>
    </Box>
  );
}
