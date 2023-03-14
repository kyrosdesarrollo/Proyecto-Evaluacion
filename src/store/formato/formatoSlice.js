import { createSlice } from '@reduxjs/toolkit';
export const formatoSlice = createSlice({
    name: 'formato',
    initialState: {
        isSaving: false,
        messageSaved: '',
        formatos: [],
        active: null,
    },
    reducers: {
        savingNewExcelFormato: (state)=>{
            state.isSaving=true;
        },
        addNewEmptyExcelFormato: (state,  action ) => {
            state.formatos.push(action.payload);
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
            state.formatos = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '' 
        },
        updateFormato: (state,  action ) => {
            state.isSaving = false;
            state.formatos = state.notes.map( note => {
            
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