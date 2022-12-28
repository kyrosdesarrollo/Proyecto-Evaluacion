import { menuTotal } from '../__mocks__';

const getMenuByIName = ( nombre ) => {
    
  return menuTotal.find ( menu => menu.nombre === nombre);
  
}

export default getMenuByIName