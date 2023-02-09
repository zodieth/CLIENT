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
  LightMode,
  Input,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ImEye } from "react-icons/im";
import Swal from "sweetalert2";
import { useTable } from "react-table";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function ClaimsUser() {
  const salesStore = useAppSelector((state) => state.sales);
  const claimsStore = useAppSelector((state) => state.claims);
  const userStore = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleId, setSaleId] = useState("");

  const handleClickOpenModal = (id: string) => {
    setIsModalOpen(true);
    setSaleId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSaleId("");
  };

  const data: any = [];

  claimsStore.allClaims.map((claim: any) => {
    if(claim.user._id === userStore.user._id)
      data.push({
        issue: claim.issue,
        description: claim.description,
        status: claim.status,
        count: claim.sale.products.length,
        total: claim.sale.total,
        details: claim._id,
      });
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      Header: "Asunto",
      accessor: "issue",
    },
    {
      Header: "Descripcion",
      accessor: "description",
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Total $",
      accessor: "total",
    },
    {
      Header: "Ver detalles",
      accessor: "details",
    },
  ];

  const filteredData = data.filter(
    (d: any) =>
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.status.toLowerCase().includes(searchTerm.toLowerCase())
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
        <TableCaption>Listado de compras</TableCaption>
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
                  if (cell.column.Header === "Ver detalles") {
                    return (
                      <Td key={Math.random()}>
                        <LightMode>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleClickOpenModal(cell.value)}
                          >
                            <ImEye size={20} />
                          </Button>
                        </LightMode>
                      </Td>
                    );
                  } else if (cell.column.Header === "Estado") {
                    return (
                      <Td {...cell.getCellProps()}>
                        {cell.value === "missing"
                          ? "Desaparecido"
                          : cell.value === "damaged"
                          ? "Dañado"
                          : cell.value === "wrong"
                          ? "Producto incorrecto"
                          : cell.value === "closed"
                          ? "Cerrado"
                          : ""}
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

  if (salesStore.isLoading && claimsStore.isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (salesStore.errMess || claimsStore.errMess) {
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
        <Modal isOpen={isModalOpen} size={"xl"} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalle de la compra #{saleId}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Cantidad</Th>
                    <Th>Total (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {salesStore.allSales.map((sale: any) =>
                    sale?._id === saleId
                      ? sale.products.map((product: any) => (
                          <Tr key={product.product._id}>
                            <Td>{product.product.name}</Td>
                            <Td>{product.quantity}</Td>
                            <Td>{product.product.price * product.quantity}</Td>
                          </Tr>
                        ))
                      : ""
                  )}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <CardHeader>
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
