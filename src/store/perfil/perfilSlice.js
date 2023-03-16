import { createSlice } from '@reduxjs/toolkit';

export const perfilSlice = createSlice({
    name: 'perfil',
    initialState: {
        isSaving: false,
        messageSaved: '',
        perfil: '',
        active: null,
        // active: {
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date: 1232434,
        //     imageURLs:[], // https://foto1.jpg https://foto2.jpg 
        // }
    },
    reducers: {
        savingPerfil: (state)=>{
            state.isSaving=true;
        },
       
        setDesActivePerfil: (state ) => {
            state.active ='';
            state.messageSaved = ''
            state.perfil = ''
        },
        setPerfil: (state,  action ) => {
            state.perfil = action.payload;
        },

        savingOutPerfil: (state)=>{
            state.isSaving=false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { savingPerfil ,setDesActivePerfil,setPerfil,savingOutPerfil} = perfilSlice.actions;