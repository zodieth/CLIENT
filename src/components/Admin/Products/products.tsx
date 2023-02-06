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
import interfaceProduct from  "../../../features/products/interfaceProduct";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { putProduct } from '../../../app/actionsCreators'
import { Link } from "react-router-dom";

export default function ProductsAdmin() {
  const productsStore = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch();

  const setActive = (id:string, active:Boolean) => {
    dispatch(putProduct(id, {active: !active}))
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
              <Th>Precio</Th>
              <Th>Stock</Th>
              <Th>Marca</Th>
              <Th>Categoria</Th>
              <Th>Activo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            { productsStore.allProducts.map((product:interfaceProduct) => {
              return( 
                  <Tr key={product._id}>
                    <Td>{product.name}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.brand.name}</Td>
                    <Td>{product.category.name}</Td>
                    <Td><Switch id='email-alerts' isChecked={product.active ? true : false} onChange={() => setActive(product._id, product.active)} /></Td>
                    <Td style={{ display: "flex" }}>
                      <Button>
                        <Link to={`/Admin/products/edit/${product._id}`}>
                          <HiOutlinePencilAlt size={20}/>
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}