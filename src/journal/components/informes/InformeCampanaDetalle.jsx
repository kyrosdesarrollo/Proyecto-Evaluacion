import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'

export const InformeCampanaDetalle = ( { fechaInicio, fechaTermino, controlBotonClick}) => {
  const defaultMaterialTheme = createTheme();

  const [titulo, setTitulo] = useState([])
  const [data, setData] = useState([])
  
 //Extrae los formatos desde Redux
 const { formatos } = useSelector(state => state.formato);

// useEffect(() => {
//               if (controlBotonClick && fechaInicio && fechaTermino) {
//                       const detalleJsonCierre = [];
//                       //Selección de formatos con estado Cierre y Finalizado
//                       formatos.forEach(formato => {
//                         const detalleJson = formato.detalleJson;
//                         for (let i = 0; i < detalleJson.length; i++) {
//                           if (detalleJson[i].Estado === 'Cierre' || detalleJson[i].Estado === 'Finalizado') {
//                             const { respuestas, ...resto } = detalleJson[i]; // Utiliza desestructuración para omitir la propiedad "respuestas"
//                             const objetoModificado = { Nº: formato.numeroCorrelativo,campania: formato.campania ,...resto}; // Crear un nuevo objeto con todas las propiedades existentes y agregar campania
//                             detalleJsonCierre.push(objetoModificado);
//                           }
//                         }
//                       });
//                       const detalleJsonCierre0 = detalleJsonCierre[0]; // Accedes al primer elemento del arreglo detalleJsonCierre
//                       const campos = Object.keys(detalleJsonCierre0); // Campos de Titulo
                     
//                       const nuevoTitulo = campos.map(campo => ({
//                         title: campo,
//                         field: campo,
//                         align: "center",
//                         headerStyle: { color: "#2196f3" }
//                       }));
                    
//                       console.log('Aqui viene Todo')
//                       console.log(detalleJsonCierre);
//                       let detalle = detalleJsonCierre.map(o => ({ ...o }));
//                       setData(detalle)
//                       setTitulo(nuevoTitulo)
                      
                     
//                   }
  
// }, [controlBotonClick, fechaInicio, fechaTermino])
useEffect(() => {
  if (controlBotonClick && fechaInicio && fechaTermino) {
    const detalleJsonCierre = [];
    // Selección de formatos con estado Cierre y Finalizado
    formatos.forEach(formato => {
      const detalleJson = formato.detalleJson;
      for (let i = 0; i < detalleJson.length; i++) {
        if (detalleJson[i].Estado === 'Cierre' || detalleJson[i].Estado === 'Finalizado') {
          console.log(detalleJson[i].respuestas)
          const { respuestas, ...resto } = detalleJson[i]; // Utiliza desestructuración para omitir la propiedad "respuestas" en resto
          console.log(detalleJson[i].respuestas[0])
          let AlmacenaRespuesta = ''; // Variable para almacenar las respuestas
          for (let j = 0; j < respuestas.length; j++) {
            const campos = Object.keys(respuestas[j]); // Campos de Titulo
            console.log(campos)
            const respuestaString = JSON.stringify(respuestas[j]); // Convierte cada objeto en una cadena JSON
            AlmacenaRespuesta += respuestaString + ", "; // Concatena cada respuesta en la variable AlmacenaRespuesta
          }
          console.log(AlmacenaRespuesta)
          const objetoModificado = { Nº: formato.numeroCorrelativo, campania: formato.campania, ...resto };
          detalleJsonCierre.push(objetoModificado);
        }
      }
    });

    const detalle = detalleJsonCierre.map(o => ({ ...o })); // Copia de cada objeto en el array
    console.log(detalle)
    setData(detalle);

    const detalleJsonCierre0 = detalle[0]; // Accedes al primer elemento del arreglo detalle
    const campos = Object.keys(detalleJsonCierre0); // Campos de Titulo
    const nuevoTitulo = campos.map(campo => ({
      title: campo,
      field: campo,
      align: "center",
      headerStyle: { color: "#2196f3" }
    }));

    // Agregar la columna "respuestas" al título y a los datos
    nuevoTitulo.push({
      title: "Respuestas",
      field: "respuestas",
      align: "center",
      headerStyle: { color: "#2196f3" }
    });
    detalle.forEach(item => {
      if (item.respuestas && Array.isArray(item.respuestas)) {
        const respuestas = item.respuestas.map(respuesta => respuesta.texto); // Extraer solo la propiedad "texto" de cada objeto respuesta
        item.respuestas = respuestas.join(", "); // Unir las respuestas en un solo string
      }
    });

    setTitulo(nuevoTitulo);
  }
}, [controlBotonClick, fechaInicio, fechaTermino]);





  const getInitialExpandedState = () => {
    // Devuelve un objeto con el estado de expansión inicial para cada fila
    const initialExpandedState = {};
    data.forEach((row) => {
      initialExpandedState[row.id] = false;
    });
    return initialExpandedState;
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        title="Reporte por Campaña"
        data={data}
        columns={titulo}
        options={{
          search: true,
          paging: true,
          filtering: true,
          exportButton: true,
          exportAllData: true,
          defaultExpanded: getInitialExpandedState, // Utiliza la función para establecer el estado de expansión inicial
        }}
      />
    </ThemeProvider>
  );
};
