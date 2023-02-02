import style from "./products.module.css"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button, 
  Switch,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { deleteCateogry, putCateogry } from '../../../app/actionsCreators'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function CategoriesAdmin() {
  const categoriesStore = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch();

  const deleteCategory = (id:string) => {
    try{
      dispatch(deleteCateogry(id))
      
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
        title: "Eliminado Correctamente",
      });
    }catch(error){
      
    }
  }
  
  const setActive = (id:string, active:Boolean) => {
    dispatch(putCateogry(id, {active: !active}))
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link to="./create" className={style.btnPrimary}>Nuevo</Link>
      </div>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Listado de categorías</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Categoría padre</Th>
              <Th>Activo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            { categoriesStore.allCategories.map((category:interfaceCategory) => {
              return( 
                <>
                  <Tr key={category.name}>
                    <Td>{category.name}</Td>
                    <Td>{category.description.substring(0,50)+"..."}</Td>
                    <Td>{category.father?.name}</Td>
                    <Td><Switch id='email-alerts' isChecked={category.active ? true : false} onChange={() => setActive(category._id, category.active)} /></Td>
                    <Td style={{ display: "flex" }}>
                      <Button onClick={() => deleteCategory(category._id)}>
                        <HiTrash size={20}/>
                      </Button>
                      <Button>
                        <Link to={`/Admin/categories/edit/${category._id}`}>
                          <HiOutlinePencilAlt size={20}/>
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                </>)
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Categoría padre</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}