import { createSlice } from '@reduxjs/toolkit';

export const pautaexcelSlice = createSlice({
    name: 'pauta',
    initialState: {
        isSaving: false,
        messageSaved: '',
        pautas: [],
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
        savingNewExcel: (state)=>{
            state.isSaving=true;
        },
        addNewEmptyExcel: (state,  action ) => {
            state.pautas.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state,  action ) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setDesActiveNote: (state ) => {
            state.active ='';
            state.messageSaved = ''
        },
        setPautas: (state,  action ) => {
            state.pautas = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '' 
        },
        updateNote: (state,  action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
            
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`

        },

        deleteNoteById: (state,  action ) => {
            
        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyExcel,setActiveNote ,setDesActiveNote,setPautas,
     setSaving, updateNote, deleteNoteById, savingNewExcel} = pautaexcelSlice.actions;