import { Box, Container } from '@mui/material'
import React from 'react'
import CargaListToolbar from './CargaListToolbar'

const CargaPage = () => {
  return (
    <>
     
        <title>
          Carga Excel | Material Kit
        </title>
     
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
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
