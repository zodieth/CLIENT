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
  LightMode,
  Box,
  useColorModeValue,
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
  
  const setActive = (id:string, active:Boolean) => {
    dispatch(putCateogry(id, {active: !active}))
  }

  return (
    <Box bg={useColorModeValue("white", "white")} className={style.container}>
      <Box className={style.header}>
      <Link to="./create" className={style.btnPrimary}>Nuevo</Link>
      </Box>
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
                  <Tr color="black" key={category.name}>
                    <Td>{category.name}</Td>
                    <Td>{category.description.substring(0,50)+"..."}</Td>
                    <Td>{category.father?.name}</Td>
                    <LightMode><Td><Switch id='email-alerts' isChecked={category.active ? true : false} onChange={() => setActive(category._id, category.active)} /></Td> </LightMode>
                    <Td style={{ display: "flex" }}>
                        <LightMode><Button color="black">
                        <Link to={`/Admin/categories/edit/${category._id}`}>
                          <HiOutlinePencilAlt size={20}/>
                        </Link>
                      </Button></LightMode>

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
              <Th>Activo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}