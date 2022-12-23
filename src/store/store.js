import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlice } from './journal';
import { rolSlice } from './rol/rolSlice';

export const store = configureStore({
  reducer: {
     auth    : authSlice.reducer,
     journal : journalSlice.reducer,
     rol     : rolSlice.reducer,
  },
});
