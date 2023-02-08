import style from "./questions.module.css"
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
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Input,
  ModalFooter,
  Spinner, 
  Card,
  CardHeader,
  CardBody
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { HiReply } from "react-icons/hi";
import { putQuestion } from '../../../app/actionsCreators'
import Swal from "sweetalert2";
import { useState } from "react";

export default function AllQuestionsAdmin() {
  const questionsStore = useAppSelector((state) => state.questions)
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionId, setQuestionId] = useState('');
  const [answer, setAnswer] = useState("");

  const setActive = (id:string, active:Boolean) => {
    dispatch(putQuestion(id, { active: !active }))
  }

  const handleClickOpenModal = (id: string) => {
    setIsModalOpen(true);
    setQuestionId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuestionId('');
  };

  const handleSubmit = () => {
    dispatch(putQuestion(questionId, { answer: answer }));
    setIsModalOpen(false);
    setAnswer("");
  };

  const handleChange = (e: any) => {
    setAnswer(e.target.value)
  }

  if(questionsStore.isLoading){
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }else if(questionsStore.errMess){
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
      text: "Hubo un error inesperado, por favor intentelo mas tarde."
    });
  }else{
    return (
      <Card>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Responder pregunta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="answer">Respuesta</FormLabel>
                <Input id="answer" type="text" onChange={handleChange}/>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button color="blue" mr={3} onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="ghost" onClick={handleSubmit}>Enviar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <CardBody>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Listado de preguntas</TableCaption>
              <Thead>
                <Tr>
                  <Th>Pregunta</Th>
                  <Th>Respuesta</Th>
                  <Th>Activo</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                { questionsStore.allQuestions.map((question:any) => {
                  return( 
                    <>
                      <Tr key={question._id}>
                        <Td>{question.question.substring(0,100)+"..."}</Td>
                        <Td>{question.answer.substring(0,100)+"..."}</Td>
                        <LightMode><Td><Switch id='email-alerts' isChecked={question.active ? true : false} onChange={() => setActive(question._id, question.active)} /></Td> </LightMode>
                        <Td style={{ display: "flex" }}>
                          <LightMode>
                            <Button colorScheme='blue' onClick={() => handleClickOpenModal(question._id)}>
                              <HiReply size={20}/>
                            </Button>
                          </LightMode>                      
                        </Td>
                      </Tr>
                    </>)
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    );
  }
}