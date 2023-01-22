import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Input } from "@chakra-ui/react"

export type SearchBarStorage = {
  value: string
};

export const InputSearchBar = () => {

  const [inputStorage, setInputStorage] = useLocalStorage<any>("SEARCH", []);

  function handleSearchInput(e: any) {
    setInputStorage(e.target.value);
    console.log(inputStorage);
  };


  return (
    <Input
      placeholder="Buscar Producto..."
      value={inputStorage}
      onChange={(e) => handleSearchInput(e)}
    />
  )
}