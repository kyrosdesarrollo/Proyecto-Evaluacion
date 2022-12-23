import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
    name: 'rol',
    initialState: {
        isSaving: false,
        messageSaved: '',
        rol:[],
        active: null,
    },
    reducers: {
        savingNewRol: (state)=>{
            state.isSaving=true;
        },
        addNewEmptyRol: (state,  action ) => {
            state.rol.push(action.payload);
            state.isSaving = false;
        },
        setActiveRol: (state,  action ) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setRols: (state,  action ) => {
            state.rol = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '' 
        },
        updateRol: (state,  action ) => {
            state.isSaving = false;
            state.rol = state.rol.map( note => {
            
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correectamente`

        },

        deleteRolById: (state,  action ) => {
            
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyRol,
    setActiveRol ,
    setRols, 
    setSaving, 
    updateRol, 
    deleteRolById, 
    savingNewRol,
 } = rolSlice.actions;