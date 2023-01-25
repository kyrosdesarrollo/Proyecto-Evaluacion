import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { excelSlice } from './excel/excelSlice';
import { journalSlice } from './journal';
import { menuSlice } from './menu';


export const store = configureStore({
  reducer: {
     auth    : authSlice.reducer,
     journal : journalSlice.reducer,
     menu    : menuSlice.reducer,
     excel   : excelSlice.reducer,
  },
});
