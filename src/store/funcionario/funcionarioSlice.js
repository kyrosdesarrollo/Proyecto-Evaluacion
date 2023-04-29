import { createSlice } from '@reduxjs/toolkit';

export const funcionarioSlice = createSlice({
    name: 'pauta',
    initialState: {
        isSaving: false,
        messageSaved: '',
        funcionario: [],
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
        estadoInicioSaving: (state)=>{
            state.isSaving=true;
        },
        estadoFinalSaving: (state ) => {
            state.isSaving=false;
        },
        savingFuncionario: (state)=>{
            state.isSaving=true;
        },
        addNewFuncionario: (state,  action ) => {
            state.funcionario.push(action.payload);
        },
        setActivaFuncionario: (state,  action ) => {
            state.funcionario = action.payload;
        },
       
        
    }
});

// Action creators are generated for each case reducer function
export const { estadoInicioSaving,estadoFinalSaving, savingFuncionario,addNewFuncionario,setFuncionario,setActivaFuncionario} = funcionarioSlice.actions;