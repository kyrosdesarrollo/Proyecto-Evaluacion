import React from 'react'
import { Box  } from '@mui/material'
import AsigncionLinea from '../../components/asignacion/AsignacionPage1'

export const AsignacionPage = () => {
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
            <AsigncionLinea etapa = {1} />
          </Box>
      </Box>
    </>
  )
}

