import { createSlice } from '@reduxjs/toolkit';
export const excelSlice = createSlice({
    name: 'excel',
    initialState: {
        isSaving: false,
        messageSaved: '',
        excels: [],
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
            state.excels.push(action.payload);
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
        setNotes: (state,  action ) => {
            state.notes = action.payload;
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
export const { addNewEmptyExcel,setActiveNote ,setDesActiveNote,setNotes, setSaving, updateNote, deleteNoteById, savingNewExcel} = excelSlice.actions;