import { createSlice } from '@reduxjs/toolkit';

export const campaniaSlice = createSlice({
  name: 'campania',
  initialState: {
    isSaving: false,
    campania:[],
    
  },
  reducers: {
    estadoInicioCampaniaSaving: (state) => {
      state.isSaving = true;
    },
    estadoFinalCampaniaSaving: (state) => {
      state.isSaving = false;
    },
    savingCampania: (state) => {
      state.isSaving = true;
    },
    addNewCampania: (state, action) => {
      state.campania.push(action.payload);
    },
    setActivaCampania: (state, action) => {
      state.campania = action.payload;
    },
    setAllCampanias: (state, action) => {
      state.campania = action.payload;
    },
  },
});

export const {
  estadoInicioCampaniaSaving,
  estadoFinalCampaniaSaving,
  savingCampania,
  addNewCampania,
  setActivaCampania,
  setAllCampanias,
} = campaniaSlice.actions;
