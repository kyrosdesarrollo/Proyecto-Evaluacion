
import React,{ useState, useEffect}  from 'react';
import {menuTotal} from '../../../__mocks__/menuAll';
import DespliegueDetalle from './DespliegueDetalle';

export const DespliegaMenu = ( { menu }) => {

const [menuUsuario, setMenuUsuario] = useState([])

useEffect(() => {
  
  const menus = menuTotal.find(( perfil => perfil.nombre === menu));
  if (menus){ setMenuUsuario (menus.menuInicio)} 

})
  if (menu === '-') return (
    <>   
    </> 
  )  

  if (!!menu) return (
    <>   
      <DespliegueDetalle nombre = {menu} />
    </> 
  )  
 
}
