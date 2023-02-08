import style from "./products.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Switch,
  LightMode,
  Input,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceProduct from "../../../features/products/interfaceProduct";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { putProduct } from "../../../app/actionsCreators";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";

export default function ProductsAdmin() {
  const productsStore = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const setActive = (id: string, active: Boolean) => {
    dispatch(putProduct(id, { active: !active }));
  };

  const data: any = [];

  productsStore.allProducts.map((product: interfaceProduct) => {
    data.push({
      name: product.name,
      price: product.price,
      stock: product.stock,
      brand: product.brand?.name,
      category: product.category?.name,
      active: product,
      acciones: product._id,
    });
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Precio",
      accessor: "price",
    },
    {
      Header: "Stock",
      accessor: "stock",
    },
    {
      Header: "Marca",
      accessor: "brand",
    },
    {
      Header: "Categoria",
      accessor: "category",
    },
    {
      Header: "Activo",
      accessor: "active",
    },
    {
      Header: "Acciones",
      accessor: "acciones",
    },
  ];

  const filteredData = data.filter((d: any) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function Table2({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });

    // Render the UI for your table
    return (
      <Table {...getTableProps()} variant="simple" key={Math.random()}>
        <TableCaption>Listado de productos</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={Math.random()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Acciones") {
                    return (
                      <Td key={Math.random()}>
                        <LightMode>
                          <Button colorScheme="blue">
                            <Link to={`/Admin/products/edit/${cell.value}`}>
                              <HiOutlinePencilAlt size={20} />
                            </Link>
                          </Button>
                        </LightMode>
                      </Td>
                    );
                  } else if (cell.column.Header === "Activo") {
                    return (
                      <Td key={Math.random()}>
                        <Switch
                          id="email-alerts"
                          isChecked={cell.value.active ? true : false}
                          onChange={() =>
                            setActive(cell.value._id, cell.value.active)
                          }
                        />
                      </Td>
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  }

  if (productsStore.isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (productsStore.errMess) {
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
      title: "Oops...",
      text: "Hubo un error inesperado, por favor intentelo mas tarde.",
    });
  } else {
    return (
      <Card>
        <CardHeader>
          <div className={style.header}>
            <Link to="./create" className={style.btnPrimary}>
              Nuevo
            </Link>
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar"
          />
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table2 data={filteredData} columns={columns} />
          </TableContainer>
        </CardBody>
      </Card>
    );
  }
}
