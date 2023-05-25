import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AsignacionActividadView from './AsignacionActividadView';

const campanaOptions = ['FALABELLA', 'RIPLEY', 'CRM'];

export default function ControlSeleccion({ opcion = null, onSeleccionCampaña }) {
  const [value, setValue] = React.useState(null);
  const [valueCampana, setValueCampana] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [inputValueCampana, setInputValueCampana] = React.useState('');
  const [options, setOptions] = React.useState(['']);

  React.useEffect(() => {
    setOptions(opcion || ['']);
  }, [opcion]);

  React.useEffect(() => {
    setValue(null); // Restablecer el valor cuando la opción cambie
  }, [opcion]);

  let identificador = '';

  
  if (value) {
    identificador = value.substring(0, 2);
  }

  const handleChangeSeleccion = (e) => {
    setValue(null);
  };
  const handleChangeSeleccionArchivo = (e) => {
    setValue(null);
  };

  return (
    <>
      <div>
        <br />
        <Autocomplete
          value={valueCampana}
          onChange={(event, newValue) => {
            setValueCampana(newValue);
            onSeleccionCampaña(newValue);
          }}
          inputValue={inputValueCampana}
          onInputChange={(event, newInputValue) => {
            setInputValueCampana(newInputValue);
          }}
          id="controllable-states-demo1"
          options={campanaOptions}
          sx={{ width: 1200 }}
          renderInput={(params) => <TextField {...params} label="Selección de Campaña" />}
        />
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
          sx={{ width: 1200 }}
          renderInput={(params) => <TextField {...params} label="Selección de archivo cargado" />}
        />
      </div>

      {value && (
        <AsignacionActividadView 
          opcion={identificador} 
          onBorrarInformacionSeleccion={(e) => handleChangeSeleccion(e)} />
      )}
    </>
  );
}
