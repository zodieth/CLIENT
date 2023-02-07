// import { Box, Button, useToast, useColorModeValue, IconButton, LightMode } from "@chakra-ui/react"
// import { BiMailSend } from "react-icons/bi";

// export default function MensajeMail() {
//     const toast = useToast()

//     return (
//         <IconButton
//                 bg={useColorModeValue("green.400", "green.800")}
//                 color={useColorModeValue("white", "gray.800")}
//                 _hover={{
//                 bg: "green.600",
//                         }}
//                 aria-label="Subscribe"
//                 icon={<BiMailSend />}        
//                 onClick={() =>
//                 toast({
//                     title: 'Dirección de correo recibida.',
//                     description: "¡Pronto recibiras descuentos!",
//                     status: 'success',
//                     duration: 6000,
//                     isClosable: true,
//                 })
//                 }
//             >
//                 Send
//       </IconButton>
//     )
//   }
import { Box, Button,Input, useToast,IconButton,useColorModeValue } from "@chakra-ui/react"
import { BiMailSend } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
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
        <div className={style.input}>
        <form onSubmit={handeleSubmit}>
          <Input
          bg={useColorModeValue("white", "white")}
          onChange={(e) => handleOnChange(e)}
          value={inputEmail.email}
          type="text"
          name="email"
          placeholder="email"
          width='sm'
        />
        {/* <p>{errors.email}</p> */}
        <Button bg={useColorModeValue("gray", "green")} type="submit" >
            Enviar </Button>
        </form>
        </div>
    )
}