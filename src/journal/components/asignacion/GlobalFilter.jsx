
import { Box } from '@mui/material'
import React from 'react'

const GlobalFilter = ({filter , setFilter}) => {
  return (
      <>
      <Box >
          <span>
            Buscar :{' '}
            <input value={filter || ''}
            onChange={e => {
              setFilter(e.target.value);
            }}/>

                {/* Search:{' '}
                <input  value={filter || ''} onChange={e=> setFilter(e.target.value)}/> */}
          </span>
        </Box>
        <br></br>
    </>
  )
}

export default GlobalFilter

