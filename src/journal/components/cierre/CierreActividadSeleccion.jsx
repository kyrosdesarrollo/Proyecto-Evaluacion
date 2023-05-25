
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CierreActividadView from './CierreActividadView';


const campana = ['FALABELLA', 'RIPLEY','CRM','SODIMAC'];

export default function ControlSeleccion({ opcion = '' ,  onSeleccionCampaña}) {
  const [value, setValue] = useState(null);
  const [valueCampana, setValueCampana] = React.useState(null);
  const [inputValueCampana, setInputValueCampana] = React.useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(opcion || ['']);
  }, [opcion]);

  useEffect(() => {
    setValue(null); // Restablecer el valor cuando la opción cambie
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

        <Autocomplete
            value={valueCampana}
            onChange={(event, newValue) => {
              setValueCampana(newValue);
              // Llamar a la función de devolución de llamada con el valor seleccionado para ser Utilizado en AsignaActividad
              onSeleccionCampaña(newValue);
            }}
            
            inputValue={inputValueCampana}
            onInputChange={(event, newInputValue) => {
              setInputValueCampana(newInputValue);
            }}
            id="controllable-states-demo1"
            options={campana}
            sx={{ width: 1200 }}
            renderInput={(params) => <TextField {...params} label="Selección de Campañia" />}
          />
  
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
          sx={{ width: 1200 }}
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
