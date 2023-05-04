import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import PautaListToolbar from '../../components/pauta/PautaListToolbar'


export const PautaPage = () => {
  return (
    <>
        
         <Paper elevation={3}>
            <Box >
                <Container >
                  < PautaListToolbar />
                  <br></br>
                 
                </Container>
             </Box>
          </Paper>
      
    </>
  )
}

export default PautaPage
