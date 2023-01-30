import { Box, Button, useToast, useColorModeValue, IconButton } from "@chakra-ui/react"
import { BiMailSend } from "react-icons/bi";

export default function MensajeMail() {
    const toast = useToast()
    return (
        <IconButton
                bg={useColorModeValue("green.400", "green.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                bg: "green.600",
                        }}
                aria-label="Subscribe"
                icon={<BiMailSend />}        
                onClick={() =>
                toast({
                    title: 'Dirección de correo recibida.',
                    description: "¡Pronto recibiras descuentos!",
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                })
                }
            >
                Send
      </IconButton>
    )
  }