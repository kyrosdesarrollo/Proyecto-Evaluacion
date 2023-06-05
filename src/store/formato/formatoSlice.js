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
            const { formatoIndex, indiceEncontrado, preguntasRespuestas , porcentajeFormateado, tipo} = action.payload;
            // Verificar si state.formato está definido antes de continuar
            if (!state.formatos) {
                console.error("El estado formato no está definido");
                return;
            }
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = String(currentDate.getFullYear());
            const formattedDate = `${day}-${month}-${year}`;
            state.formatos[formatoIndex].detalleJson[indiceEncontrado].respuestas = preguntasRespuestas;
            state.formatos[formatoIndex].detalleJson[indiceEncontrado].Nota = porcentajeFormateado;
            if (tipo === 'Encuesta') {
                state.formatos[formatoIndex].detalleJson[indiceEncontrado].fechaEncuesta = formattedDate;
            }
            if (tipo === 'Cierre') {
                state.formatos[formatoIndex].detalleJson[indiceEncontrado].fechaCierre = formattedDate;
            }
            if (tipo === 'Objeción') {
                state.formatos[formatoIndex].detalleJson[indiceEncontrado].fechaObjeción = formattedDate;
            }
            
          },
          
        deleteFormatoById: (state,  action ) => {
            state.isSaving=false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyExcelFormato,setActiveFormato ,setDesActiveFormato,
    setFormatos, setSaving, updateFormato, 
    deleteFormatoById, savingNewExcelFormato,
    actualizarFormato,actualizarDetalleJson,
     } = formatoSlice.actions;