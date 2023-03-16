import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { formatoSlice } from './formato/formatoSlice';
import { journalSlice } from './journal';
import { menuSlice } from './menu';
import { pautaexcelSlice } from './pauta/pautaSlice';
import { perfilSlice } from './perfil/perfilSlice';


export const store = configureStore({
  reducer: {
     auth    : authSlice.reducer,
     journal : journalSlice.reducer,
     menu    : menuSlice.reducer,
     formato : formatoSlice.reducer,
     pauta   : pautaexcelSlice.reducer,  
     perfil  : perfilSlice.reducer,
  },
});
