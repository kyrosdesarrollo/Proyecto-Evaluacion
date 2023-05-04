import React from 'react'
import { Box  } from '@mui/material'
import { FuncionarioCRUD } from '../../components/funcionario/FuncionarioCRUD'

export const FuncionarioPage = () => {
  return (
    <>
     {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
          <Box> */}
           <FuncionarioCRUD/>
          {/* </Box>
      </Box>
      */}
    </>
  )
}
