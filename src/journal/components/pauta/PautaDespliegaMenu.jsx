
import { Typography } from '@mui/material';
import React  from 'react';
import PautaGridConcepto from './PautaGrid';

export const PautaDespliegaMenu = ( { menu }) => {

  if (menu === '-') return (
    <>   
    </> 
  )  

  if (!!menu) return (
    <>  
    {
      (menu === 'PARLO')
         ? <PautaGridConcepto />
         : <Typography> Hola</Typography>
    } 
     
    </> 
  )  
 
}
