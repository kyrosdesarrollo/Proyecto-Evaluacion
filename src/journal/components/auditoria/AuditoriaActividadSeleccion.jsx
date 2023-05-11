import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuditoriaActividadView from './AuditoriaActividadView';

let options = [''];

export default function ControlSeleccion({ opcion = '' }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (opcion.length > 0) {
      setOptions(opcion);
      setValue(opcion[0]);
    }
  }, [opcion]);

  const handleChangeSeleccion = (event, newValue) => {
    setValue(newValue);
  };

  let identificador = '';
  try {
    if (value) {
      identificador = value.substring(0, 2);
    }
  } catch (error) {
    alert(error);
  }

  return (
    <>
      <div>
        <br />
        <br />
        <Autocomplete
          value={value}
          onChange={handleChangeSeleccion}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 800 }}
          renderInput={(params) => <TextField {...params} label="Selección de archivo asignado para auditar" />}
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
