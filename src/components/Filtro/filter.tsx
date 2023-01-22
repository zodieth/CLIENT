import { Select } from "@chakra-ui/react";
import style from "./navBar.module.css";
import styleSearchBar from "../SearchBar/searchBar.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import interfaceBrand from  "../../features/brands/interfaceBrand";
import interfaceCategory from  "../../features/categories/interfaceCategory";
import { productsFilter } from "../../app/actionsCreators";
import { Input } from "@chakra-ui/react";

function Filter() {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands)
  const categories = useAppSelector((state) => state.categories)

  const handleSearch = () => {
    const inputSearch = document.querySelector("#search") as HTMLInputElement;
    const type = document.querySelector("#type") as HTMLInputElement;
    const order = document.querySelector("#order") as HTMLInputElement;
    const category = document.querySelector("#category") as HTMLInputElement;
    const brand = document.querySelector("#brand") as HTMLInputElement;
    const min = document.querySelector("#min") as HTMLInputElement;
    const max = document.querySelector("#max") as HTMLInputElement;

    dispatch(productsFilter(inputSearch.value, type.value, order.value, min.value, max.value, category.value, brand.value));
  }

  return (
    <div className={style.subNav}>
      <div className={style.selects}>
        <div className={style.options}>
          <Input
            id="search"
            className={styleSearchBar.input}
            placeholder="Buscar"
            onChange={handleSearch}
          />
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            id="type"
            color="Gray"
            borderColor="Gray"
            onChange={handleSearch}
          >
            <option value="ALF">Alfabetico</option>
            <option value="COST">Precio</option>
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            id="order"
            color="Gray"
            borderColor="Gray"
            onChange={handleSearch}
          >
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </Select>
        </div>
        <div className={style.options}>
          <input className={styleSearchBar.input} type="number" id="min" placeholder="Mínimo" pattern="^[0-9]+([,.][0-9]+)?$" onChange={handleSearch}/> - <input className={styleSearchBar.input} type="number" id="max" placeholder="Máximo" pattern="^[0-9]+([,.][0-9]+)?$" onChange={handleSearch}/>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Todas"
            color="Gray"
            id="category"
            borderColor="Gray"
            onChange={handleSearch}
          >
            { categories.allCategories.map((category:interfaceCategory) => {
              return <option key={category._id} value={category.name}>{category.name}</option>
            })}
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Todas"
            color="Gray"
            id="brand"
            borderColor="Gray"
            onChange={handleSearch}
          >
            { brands.allBrands.map((brand:interfaceBrand) => {
              return <option key={brand._id} value={brand.name}>{brand.name}</option>
            })}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
