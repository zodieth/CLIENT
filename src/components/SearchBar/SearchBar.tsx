import React from "react";
import style from "./searchBar.module.css";
import { Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

function SearchBar() {
  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Buscar Producto..."
        size="md"
      />
      <Button className={style.button}>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
