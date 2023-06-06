import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { campaniaSlice } from './campania/campaniaSlice';
import { formatoSlice } from './formato/formatoSlice';
import { funcionarioSlice } from './funcionario/funcionarioSlice';
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
     funcionario : funcionarioSlice.reducer,
     campania: campaniaSlice.reducer,
  },
});
