import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AsignacionActividadView  from './AsignacionActividadView';

let options = [''];

export default function ControlSeleccion( {opcion = null} ) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  options = opcion; 

  let identificador = '';

  const handleChangeSeleccion = (e) =>{
    setValue(null);
    // setSheet(e.target.value);
  }
  try {
      if (value) {
        identificador = value.substring(0,2);
      }

     
  } catch (error) {
    alert('Problemas Asignación Actividad Selección')
  }
  
  return (
    <>
    <div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 800 }}
        renderInput={(params) => <TextField {...params} label="Selección de archivo cargado" />}
      />
    </div>

      {value &&(
                 <AsignacionActividadView 
                    opcion = { identificador } 
                    onBorrarInformacionSeleccion ={(e)=>handleChangeSeleccion(e)}
                  />
                )
      }

    </>

  );
}