const initialState = {
    ruta: {
      state: {
        formato: {
          formatos: []
        }
      }
    }
  }
  
  const formatoReducer = (state = initialState.ruta.state.formato, action) => {
    switch (action.type) {
      case 'ACTUALIZAR_FORMATO':
        return {
          ...state,
          formatos: state.formatos.map(formato => formato.id === action.id ? action.formatoActualizado : formato)
        }
      case 'AGREGAR_FORMATO':
        return {
          ...state,
          formatos: [...state.formatos, action.nuevoFormato]
        }
      default:
        return state
    }
  }
  
  export default formatoReducer
  