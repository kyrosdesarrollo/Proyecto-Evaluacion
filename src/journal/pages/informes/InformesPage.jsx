import React from 'react'
import { Box  } from '@mui/material'

import { InformeCampana } from '../../components/informes/InformeCampana'

export const InformesPage = () => {
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
           <InformeCampana/>
          </Box>
      </Box>
     
    </>
  )
}
