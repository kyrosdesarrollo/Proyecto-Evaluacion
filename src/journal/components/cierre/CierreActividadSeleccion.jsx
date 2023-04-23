import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuditoriaActividadView from './CierreActividadView';

const monitor = ['Monitor 1', 'Monitor 2','Monitor 3'];

let options = [''];

export default function ControlSeleccion( {opcion = ''} ) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  options = opcion;
  let identificador = '';
  try {
  
    if (value) {
      identificador = value.substring(0,2);
    }
    
  } catch (error) {
    alert(error)
  }

  return (
    <>
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
  <br/>
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
        renderInput={(params) => <TextField {...params} label="Selección de archivo asignado para cierre " />}
      />
    </div>

      {value &&( <AuditoriaActividadView opcion = { value }/>)}

    </>

  );
}
