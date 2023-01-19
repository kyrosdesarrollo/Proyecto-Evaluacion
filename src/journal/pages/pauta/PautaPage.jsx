import { Box, Container } from '@mui/material'
import React from 'react'
import PautaMenuEleccion from '../../components/pauta/PautaMenuEleccion'

export const PautaPage = () => {
  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      > 
      <Container maxWidth={false}>
        <PautaMenuEleccion />
      </Container>
    
     </Box>
  )
}
