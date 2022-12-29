import { menuTotal } from '../__mocks__';

const getMenuByName = ( nombre ) => {
  const validNombre = ['ADMINISTRADOR','MONITOR','EJECUTIVO'];

  if (!validNombre.includes( nombre )) {
      throw new Error( ` ${ nombre } no es valido`);
  }
  if (nombre.lenght === 0) {return[];}
  else{
    return menuTotal.find ( menu => menu.nombre === nombre);
  } 
 
  
}

export default getMenuByName