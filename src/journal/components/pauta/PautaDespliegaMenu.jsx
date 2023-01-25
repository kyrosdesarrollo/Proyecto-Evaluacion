
import { Typography } from '@mui/material';
import React  from 'react';
import { Pauta1ConceptCatg } from './Pauta1ConcepCatg';
import { PautaGridTest2 } from './PautaGridTest2';
import CollapsibleTable from './PautaGridTest3';


export const PautaDespliegaMenu = ( { menu }) => {

  if (menu === '-') return (
    <>   
    </> 
  )  

  if (!!menu) return (
    <>  
    {
      (menu === 'PARLO')
         ?  <PautaGridTest2 /> 
         : <Typography> Hola</Typography>
    } 
     
    </> 
  )  
 
}
