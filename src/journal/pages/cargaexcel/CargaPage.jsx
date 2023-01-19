import { Box, Container } from '@mui/material'
import React from 'react'
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
        <Container maxWidth={false}>
          <CargaListToolbar />
          <Box sx={{ mt: 3 }}>
          {/* <CargaListResults lista={carga} formato = "VOZ" /> */}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CargaPage
