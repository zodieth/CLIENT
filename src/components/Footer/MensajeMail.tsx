
import { Box,Flex, Button,Input, useToast,IconButton,useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import {footerEmail} from "../../app/actionsCreators"
import {formData} from "./data"
import style from "./footer.module.css";

interface FormState {
    inputValues: formData;
  }

//   export function validate(inputs: any) {
//     let errors={
//         email:""
//     };
//     if(inputs.email === ''){
//         errors.email = 'Es necesario ingresar email'
//     }

//     return errors;
// }


export default function MensajeMail() {

    // const [errors, sertErrors]=useState({
    //     email:"",
    // });

    const [inputEmail, setInputEmail] = useState<FormState["inputValues"]>({
        email: "",
        });
        const toast = useToast()

        const handleOnChange = (e:any) => {
            // sertErrors(validate({
            //     ...inputs,
            //     [e.target.name]: e.target.value
            // }))
            if(e.target.type === 'text'){
                setInputEmail({...inputEmail, [e.target.name]: e.target.value.toLowerCase()})
            } else{
                setInputEmail({
                ...inputEmail,
                [e.target.name]: e.target.value,
                });
            }  
        };

    const handeleSubmit= (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log("hola2222", email);
        createdAlert();
        footerEmail(inputEmail);
        setInputEmail({
            email: "",
          });
    }

    const createdAlert = () => {
        toast({
            title: 'Dirección de correo recibida.',
            description: "¡Pronto recibiras descuentos!",
            status: 'success',
            duration: 6000,
            isClosable: true,
            })
    };


    return (
        <form  onSubmit={handeleSubmit}>
            <Flex>
          <Input
          bg={useColorModeValue("white", "white")}
          onChange={(e) => handleOnChange(e)}
          value={inputEmail.email}
          type="text"
          name="email"
          placeholder="Ingrese un e-mail"
          width='280px'
          required
          display= 'flex'
        />
        <Button bg={useColorModeValue("green.400", "green.800")} type="submit" >
            ✉</Button>
        </Flex>
        </form>
       
    )
}