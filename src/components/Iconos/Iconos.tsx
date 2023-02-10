import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { SiLinkedin, SiMessenger } from 'react-icons/si';
import { Box, Button, Center, Stack, Text, useClipboard,  } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import style from "./iconos.module.css"
import BotonFace from './botonFacebook';
import BotonInstagram from './botonInstagram';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Iconos() {
    
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
  return (
    <Box>
    <Center p={8}>
      <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>

        {/* Direccion */}
        <Button
                w={'full'}
                variant={'outline'}
                leftIcon={<InfoOutlineIcon  />}
                onClick={() => window.open("https://www.google.com/maps/place/AllTech/@-31.41272,-64.191335,16z/data=!4m5!3m4!1s0x0:0x8016b37754d612fb!8m2!3d-31.4127197!4d-64.1913348?hl=es-419", "_blank")}
                >
            <Center>
                <Text>9 de Julio 573, Córdoba, Argentina</Text>
            </Center>
        </Button>
        {/* Copiar celular */}
        <Button
                w={'full'}
                variant={'outline'}
                leftIcon={<PhoneIcon />}
                onClick={() => {
                    navigator.clipboard.writeText('+54-3517516055');
                    Toast.fire({
                    icon: 'success',
                    title: '¡Copiado en el portapapeles!'
                    });
                }}
                >
                <Center>
                    <Text>+54-3517516055</Text>
                </Center>
        </Button>

        {/* Mandar email */}
        <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox?compose=new", "_blank")}>
          <Center>
            <Text>alltech@gmail.com</Text>
          </Center>
        </Button>

                <Box p={2}  className={style.botones}>

                    <Box><BotonInstagram/></Box>
                    <Box display="flex" justifyContent="flex-end"><BotonFace/></Box>

                </Box>



      </Stack>
    </Center>
    </Box>
  );
}