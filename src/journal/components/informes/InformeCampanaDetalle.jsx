import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'

export const InformeCampanaDetalle = ( { fechaInicio, fechaTermino, campana,controlBotonClick}) => {
  const defaultMaterialTheme = createTheme();

  const [titulo, setTitulo] = useState([])
  const [data, setData] = useState([])
  
  console.log('Parametros')
  console.log('Fecha Inicio : ' + fechaInicio)
  console.log('Fecha Termino : '+ fechaTermino)
  console.log('Campaña : '+ campana)
  console.log('Control Boton : '+ controlBotonClick)
 //Extrae los formatos desde Redux
 const { formatos } = useSelector(state => state.formato);
 console.log('Formatos :  ' + formatos)

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
    // Selección de formatos con estado Cierre y Finalizado = CAMPAÑA
    formatos.forEach(formato => {
      if (formato.campania === campana) {
        const detalleJson = formato.detalleJson;
        console.log(detalleJson)
        for (let i = 0; i < detalleJson.length; i++) {
          
          if (detalleJson[i].Estado === 'Cierre' || detalleJson[i].Estado === 'Finalizado') {
            const { respuestas, ...resto } = detalleJson[i]; // Utiliza desestructuración para omitir la propiedad "respuestas" en resto
            let AlmacenaRespuesta = []; // Array para almacenar las respuestas
            let variableContiene = {}
    
            for (let j = 0; j < respuestas.length; j++) {
              const campos = respuestas[j];
              //console.log('Aqui viene respuesta de campos'+ respuestas[j])
              let respuestaConcatenada = '';
              let valorRegistro='';
              for (let campo in campos) {
                //console.log('Aqui van los campos '+ campo)
                if (campo === 'CATEGORÍA') {
                  const nombrePersonalizado = campos[campo]; // Asigna el valor de campos[campo] a una variable
                  const {respuesta} = respuestas[j].respuesta; // Accede al valor del campo en respuestas[j].respuesta
                  const { 
                  "BLOQUES DE EVALUACIÓN": bloque,
                  "CATEGORÍA": categoria,
                  "CONDUCTA": pregunta,
                  "CUMPLIMIENTO POR BLOQUES":porcentajeBloque,
                  "CUMPLIMIENTO POR CATEGORIA":porcentajePregunta,
                  "QUIEBRE":quiebre, } = respuestas[j];

                  console.log('Tratando de extraer' + bloque)
                  console.log('Tratando de extraer' + categoria)
                  console.log('Tratando de extraer' + pregunta)
                  console.log('Tratando de extraer' + porcentajeBloque)
                  console.log('Tratando de extraer' + porcentajePregunta)
                  console.log('Tratando de extraer' + quiebre)
                    console.log(respuesta)
                    if (respuesta === '' || respuesta === null || respuesta === undefined) {
                      valorRegistro = ''
                    }
                    else{valorRegistro = respuesta}
                    respuestaConcatenada += campo + ": " + respuesta + ", ";
                    console.log(valorRegistro)
                    variableContiene = { ...variableContiene, [nombrePersonalizado]: valorRegistro }; // Utiliza el operador spread para copiar las propiedades existentes y agregar la nueva propiedad
                  }
                //   respuestaConcatenada += campo + ": " + campos[campo] + ", ";

                //   variableContiene = { ...variableContiene, [nombrePersonalizado]: respuestas[j].respuesta  }; //variableContiene = { ...variableContiene, [nombrePersonalizado]: respuestas[j].respuesta }; Utiliza el operador spread para copiar las propiedades existentes y agregar la nueva propiedad
                // }
              }
              
              
              respuestaConcatenada = respuestaConcatenada.slice(0, -2); // Elimina la última coma y el espacio
              AlmacenaRespuesta.push(respuestaConcatenada);
            }
            // console.log('Variable Contiene')
            // console.log(variableContiene)
            // console.log('Almacena Respuesta')
            // console.log(AlmacenaRespuesta)
        
            const objetoModificado = { Nº: formato.numeroCorrelativo, campania: formato.campania, ...resto, ...variableContiene };
            detalleJsonCierre.push(objetoModificado);
          }
        }
      }
    });
    
    
    const detalle = detalleJsonCierre.map(o => ({ ...o })); // Copia de cada objeto en el array
   // console.log(detalle)
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
