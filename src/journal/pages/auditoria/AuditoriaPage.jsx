import React from 'react'
import { Box  } from '@mui/material'
import AsigncionLinea from '../../components/asignacion/AsignacionPage1'
import AsignacionActividad from '../../components/asignacion/AsignacionActividad'

export const AuditoriaPage = () => {
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
            <AsigncionLinea etapa = {2} />
          </Box>
      </Box>

     
    </>
  )
}
