
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useState, useEffect} from 'react'
import { menuTotal } from '../../../__mocks__/menuAll'

export const DespliegaMenu = ( { menu = '' }) => {

  // const [menuUsuario, setMenuUsuario] = useState()

  // useEffect(() => {
  //   setMenuUsuario ( menu )
  // }, menuUsuario)

  const  menuUsuario = menuTotal.find(menuSeleccion=> menuSeleccion.nombre === menu );
  const {menuInicio} = menuUsuario;
  console.log(menuInicio);

   

  if(menu === ""){ return ( <div> </div>)}

  return (
    <>   
       
      <h1>Menu { menu}  </h1>

       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         {
           menuInicio.map( value => {
             return(
                     <ListItemButton>
                      <ListItemText key = { value.id }>
                     
                        { value.nombre } 
                      
                      </ListItemText>
                      </ListItemButton>
                  )     
              })
          }
      </List>
    </> 
  )
}
