
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CierreActividadView from './CierreActividadView';

export default function ControlSeleccion({ opcion = '' }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (opcion.length > 0) {
      setOptions(opcion);
      setValue(opcion[0]);
    }
  }, [opcion]);

  const handleChangeSeleccion = (event, newValue) => {
    setValue(newValue);
  };

  let identificador = '';
  if (value) {
    try {
      identificador = value.substring(0, 2);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <br />
        <br />
        <Autocomplete
          value={value || null}
          onChange={handleChangeSeleccion}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 800 }}
          renderInput={(params) => (
            <TextField {...params} label="Selección de archivo asignado para cierre" />
          )}
        />
      </div>

      {value && (
        <CierreActividadView
          opcion={value}
          onBorrarInformacionSeleccion={handleChangeSeleccion}
        />
      )}
    </>
  );
}
