
import { Typography } from '@mui/material';
import { typography } from '@mui/system';
import React  from 'react';
import PautaParlo from './PautaParlo';

export const PautaDespliegaMenu = ( { menu }) => {

  if (menu === '-') return (
    <>   
    </> 
  )  

  if (!!menu) return (
    <>  
    {
      (menu === 'PARLO')
         ? <PautaParlo />
         : <Typography> Hola</Typography>
    } 
     
    </> 
  )  
 
}
