import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuditoriaActividadView from './AuditoriaActividadView';

const monitor = ['Monitor 1', 'Monitor 2','Monitor 3'];

let options = [''];

export default function ControlSeleccion( {opcion = ''} ) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const [valueMonitor, setValueMonitor] = React.useState(options[0]);
  const [inputValueMonitor, setInputValueMonitor] = React.useState('');
  options = opcion;


  return (
    <>
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
      {/* <Autocomplete
        value={valueMonitor}
        onChange={(event, newValue) => {
          setValueMonitor(newValue);
        }}
        inputValue={inputValueMonitor}
        onInputChange={(event, newInputValueMonitor) => {
          setInputValueMonitor(newInputValueMonitor);
        }}
        id="controllable-states-"
        options={monitor}
        sx={{ width: 800 }}
        renderInput={(params) => <TextField {...params} label="Selección Monitor" />}
      /> */}
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
        renderInput={(params) => <TextField {...params} label="Selección de archivo cargado" />}
      />
    </div>

      {value &&( <AuditoriaActividadView opcion = { value }/>)}

    </>

  );
}
