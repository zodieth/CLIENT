import React, { useState, useEffect } from "react";
import style from "./searchBar.module.css";

import { SearchIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { InputSearchBar } from "../Input/Input";

function SearchBar() {

  return (
    <div className={style.search}>
      <InputSearchBar />
      <Button colorScheme="blue" className={style.button}>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
