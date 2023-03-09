import { createSlice } from '@reduxjs/toolkit';
export const formatoSlice = createSlice({
    name: 'formato',
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
        savingNewExcelFormato: (state)=>{
            state.isSaving=true;
        },
        addNewEmptyExcelFormato: (state,  action ) => {
            state.excels.push(action.payload);
            state.isSaving = false;
        },
        setActiveFormato: (state,  action ) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setDesActiveFormato: (state ) => {
            state.active ='';
            state.messageSaved = ''
        },
        setFormatos: (state,  action ) => {
            state.notes = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '' 
        },
        updateFormato: (state,  action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
            
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`

        },

        deleteFormatoById: (state,  action ) => {
            
        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyExcelFormato,setActiveFormato ,setDesActiveFormato,
    setFormatos, setSaving, updateFormato, deleteFormatoById, savingNewExcelFormato
     } = formatoSlice.actions;