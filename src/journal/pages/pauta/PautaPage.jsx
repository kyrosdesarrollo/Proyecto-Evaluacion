
import { Button, Box, Container, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import PautaMenuEleccion from '../../components/pauta/PautaMenuEleccion'




export const PautaPage = () => {

const [control, setControl] = useState(true);


// useEffect(() => {
//   setControl(false);

// })
const onPresionBenja = () =>{
  
  console.log(control);
  console.log('paso por Presion Benja');
  setControl(false);
  console.log(control);


}


  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      > 
      {
        (control)
        ? <Typography> Es verdadero</Typography>
        : <Typography> Es Falso </Typography>

      }
      <Container maxWidth={false}>
        <PautaMenuEleccion />
      </Container>
      <Button
       onClick={onPresionBenja}>
        Presion de estado
      </Button>    
     </Box>
  )
}
