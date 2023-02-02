import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import AsigncionLinea from '../../components/asignacion/AsignacionPage1'
import CargaListToolbar from '../../components/cargaexcel/CargaListToolbar'

const CargaPage = () => {
  return (
    <>
     
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Box>
              <AsigncionLinea  etapa ={0}  />
        </Box>
       
         <br></br>
         <Paper elevation={3}>
            <Box >
                <Container maxWidth={false}>
                  <CargaListToolbar />
                  <br></br>
                  <Box sx={{ mt: 3 }}>
                  {/* <CargaListResults lista={carga} formato = "VOZ" /> */}
                  </Box>
                  
                </Container>
             </Box>
          </Paper>
      </Box>
    </>
  )
}

export default CargaPage
