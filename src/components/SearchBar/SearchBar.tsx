import React, { useEffect, useState } from "react";
import style from "./searchBar.module.css";
import { Input, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from '../../app/hooks'

function SearchBar() {

  useEffect(() => {
    const value = document.querySelector("#buscador") as HTMLInputElement;
    const busquedaStore = localStorage.getItem("busqueda");
    value.value = busquedaStore ? busquedaStore : "";
  }, [])

  const handleChange = () => {
    const value = document.querySelector("#buscador") as HTMLInputElement;
    localStorage.setItem("busqueda", value.value)
  }

  const handleSubmit = () => {
    /* Busqueda */

    localStorage.setItem("busqueda", "")
  }

  return (
    <div className={style.search}>
      <Input
        id="buscador"
        className={style.input}
        placeholder="Buscar Producto..."
        size="md"
        onChange={handleChange}
      />


      <Button colorScheme="blue" className={style.button} onClick={handleSubmit}>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
