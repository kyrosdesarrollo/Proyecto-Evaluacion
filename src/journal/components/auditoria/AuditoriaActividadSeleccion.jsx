
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AuditoriaActividadView from './AuditoriaActividadView';

export default function ControlSeleccion({ opcion = '',  onSeleccionCampaña}) {
  const [value, setValue] = useState(null);
  const [valueCampana, setValueCampana] = React.useState(null);
  const [inputValueCampana, setInputValueCampana] = React.useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  
  const campana = ['FALABELLA', 'RIPLEY','CRM'];

  useEffect(() => {
    if (opcion.length > 0) {
      setOptions(opcion);
      setValue(opcion[0]);
    }
  }, [opcion]);

  const handleChangeSeleccion = (event, newValue) => {
    setValue(newValue);
  };

  let identificador = '', campanaTipo ='';;
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
            <TextField {...params} label="Selección de archivo auditado para evaluación" />
          )}
        />
      </div>

      {value && (
        <AuditoriaActividadView
          opcion={value}
          onBorrarInformacionSeleccion={handleChangeSeleccion}
        />
      )}
    </>
  );
}


// export default function ControlSeleccion( {opcion = ''} ) {
//   const [value, setValue] = React.useState(options.length > 0 ? options[0] : null);
//   const [inputValue, setInputValue] = React.useState('');
//   options = opcion;
//   let identificador = '';
  
//   const handleChangeSeleccion = (e) =>{
//     setValue(opcion[0]);
//     // setSheet(e.target.value);
//   }
//   try {
  
//     if (value) {
//       identificador = value.substring(0,2);
//     }
    
//   } catch (error) {
//     alert(error)
//   }

//   return (
//     <>
//     <div>
//       {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
//       <div>{`inputValue: '${inputValue}'`}</div> */}
//       <br />
//   <br/>
// <Autocomplete
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         id="controllable-states-demo"
//         options={options}
//         sx={{ width: 800 }}
//         renderInput={(params) => <TextField {...params} label="Selección de archivo asignado para auditar " />}
//       />
//     </div>

//       {value &&( <AuditoriaActividadView 
//                 opcion = { value }
//                 onBorrarInformacionSeleccion ={(e)=>handleChangeSeleccion(e)}
//                 />)}

//     </>

//   );
// }
