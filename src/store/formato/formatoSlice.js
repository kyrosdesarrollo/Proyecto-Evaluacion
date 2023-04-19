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
        actualizarFormato: (state, action) => {
            state.isSaving = false;
            console.log('Aqui estoy')
            state.formatos = action.payload;
          },
          actualizarDetalleJson: (state, action) => {
            const { formatoIndex, indiceEncontrado, registroPregunta } = action.payload;

            console.log(action.payload)
            console.log('ingreso a actualizar registro')
            console.log('Estado actual:', state);
            // Verificar si state.formato está definido antes de continuar
            if (!state.formatos) {
                console.error("El estado formato no está definido");
                return;
            }
            console.log(state.formatos);
            console.log(formatoIndex)
            console.log(indiceEncontrado)
            console.log(registroPregunta)
            const registroPregunta1 = {
                Pregunta: "¿Cómo estás?",
                Respuesta: "Bien, gracias."
              };
            state.formatos[0].detalleJson[1].respuestas = registroPregunta1;
          },
          
        deleteFormatoById: (state,  action ) => {
            state.isSaving=false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyExcelFormato,setActiveFormato ,setDesActiveFormato,
    setFormatos, setSaving, updateFormato, deleteFormatoById, savingNewExcelFormato,actualizarFormato,actualizarDetalleJson
     } = formatoSlice.actions;