import React from 'react'
import { Box  } from '@mui/material'
import { FuncionarioCRUD } from '../../components/funcionario/FuncionarioCRUD'

export const FuncionarioPage = () => {
  return (
    <>
     <Box
        component="main"
        sx={{
          flexGrow: 0,
          py: 0.5
        }}
      >
          <Box>
           <FuncionarioCRUD/>
          </Box>
      </Box>
     
    </>
  )
}
