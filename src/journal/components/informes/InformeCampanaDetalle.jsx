import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'

export const InformeCampanaDetalle = ( { fechaInicio, fechaTermino, campana,controlBotonClick}) => {
  const defaultMaterialTheme = createTheme();

  const [titulo, setTitulo] = useState([])
  const [data, setData] = useState([])
  
  // console.log('Parametros')
  // console.log('Fecha Inicio : ' + fechaInicio)
  // console.log('Fecha Termino : '+ fechaTermino)
  // console.log('Campaña : '+ campana)
  // console.log('Control Boton : '+ controlBotonClick)
 //Extrae los formatos desde Redux
const { formatos } = useSelector(state => state.formato);
useEffect(() => {
  if (controlBotonClick && fechaInicio && fechaTermino) {
    const detalleJsonCierre = [];
    // Selección de formatos con estado Cierre y Finalizado = CAMPAÑA
    formatos.forEach(formato => {
      if (formato.campania === campana) { //CONSIDERA SOLO SELECCION DE CAMPAÑA
        const detalleJson = formato.detalleJson;
        for (let i = 0; i < detalleJson.length; i++) { //RECORRE LAS LINEA CON ESTADO CIERRE Y FINALIZADO DE LA CAMPAÑA
         
         
            const fechaEncuesta = new Date(detalleJson[i].fechaEncuesta);
            if (typeof detalleJson[i].fechaEncuesta === 'undefined') {
              continue; // Saltar al siguiente ciclo si fechaEncuesta es undefined
            }
            // console.log('registro : '+ i)
            // console.log('Como viene : '+ detalleJson[i].fechaEncuesta)

            const dia = fechaEncuesta.getDate().toString().padStart(2, '0');
            const mes = (fechaEncuesta.getMonth() + 1).toString().padStart(2, '0');
            const anio = fechaEncuesta.getFullYear();
            const fechaEncuestaFormateada = `${anio}-${dia}-${mes}`;
            //console.log('fechs de Encuesta  : '+fechaEncuesta)
              // console.log('Fecha Encuesta :'+fechaEncuestaFormateada) ESTA RARO CONSIDERAN DIA COMO MES Y MES COMO DIA
              // console.log('Fecha Inicio :'+ fechaInicio)
              // console.log('Fecha Termino :'+ fechaTermino)
          if (
                  (detalleJson[i].Estado === 'Cierre' || detalleJson[i].Estado === 'Finalizado') &&
                  (fechaEncuestaFormateada >= fechaInicio && fechaEncuestaFormateada <= fechaTermino)
          ) {
            const { respuestas, ...resto } = detalleJson[i]; // Utiliza desestructuración para omitir la propiedad "respuestas" en resto
            let variableContiene = {}
          
           // if (fechaEncuestaFormateada >= fechaInicio && fechaEncuestaFormateada <= fechaTermino) {
            for (let j = 0; j < respuestas.length; j++) { //RECORRE LAS RESPUESTAS DE LAS ENCUENTAS
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

                  // console.log('Tratando de extraer' + bloque)
                  // console.log('Tratando de extraer' + categoria)
                  // console.log('Tratando de extraer' + pregunta)
                  // console.log('Tratando de extraer' + porcentajeBloque)
                  // console.log('Tratando de extraer' + porcentajePregunta)
                  // console.log('Tratando de extraer' + quiebre)
                  //   console.log(respuesta)
                    if (respuesta === '' || respuesta === null || respuesta === undefined) {
                      valorRegistro = ''
                    }
                    else{valorRegistro = respuesta}

                    respuestaConcatenada += campo + ": " + respuesta + ", ";
                    //console.log(valorRegistro)
                    if (bloque === 'INFORMACION GENERAL') { //SOLO PARA INFORMACION GENERAL CONSIDERA EXTRAER INFORMACION primerValor Y CONCATENA LA INFORMACIÓN
                        let primerValor
                        //console.log('Estoy en general : '+ JSON.stringify(respuestas[j].respuesta))
                        const respuestaObjeto = respuestas[j].respuesta;
                              const propiedades = Object.keys(respuestaObjeto);
                              if (propiedades.length > 0) {
                                const primerCampo = propiedades[0];
                                primerValor = respuestaObjeto[primerCampo];
                                // console.log('Campo: ' + primerCampo);
                                // console.log('Valor: ' + primerValor);
                              } else {
                                console.log('No se encontraron propiedades en el objeto de respuesta');
                              }
                        variableContiene = { ...variableContiene, [pregunta]: primerValor }; // Utiliza el operador spread para copiar las propiedades existentes y agregar la nueva propiedad
                      } else{
                        //console.log(respuesta)
                        if (valorRegistro === 'SI') { //CONTROL DE PREGUNTAS SI INCORPORA PORCENTAJES SI ES NO DEJA EN 0%
                          let porcentajeFormateado = (porcentajePregunta * 100).toFixed(0) + '%';
                          variableContiene = { ...variableContiene, [nombrePersonalizado]: porcentajeFormateado };
                        }else{variableContiene = { ...variableContiene, [nombrePersonalizado]: '0%' };}
                      }
                    }
              
              }
              
            }
            // console.log('Variable Contiene')
            // console.log(variableContiene)
            // console.log('Almacena Respuesta')
            // console.log(AlmacenaRespuesta)
        
            const objetoModificado = { Nº: formato.numeroCorrelativo, campania: formato.campania, ...resto, ...variableContiene };
            // console.log('Linea de registro')
            // console.log(objetoModificado)
            detalleJsonCierre.push(objetoModificado);
         // }

        }
        }
      }
    });
    
    
    const detalle = detalleJsonCierre.map(o => ({ ...o })); // Copia de cada objeto en el array
   // console.log(detalle)
    setData(detalle);

    const detalleJsonCierre0 = detalle[0]; // Accedes al primer elemento del arreglo detalle
    const campos = detalleJsonCierre0 ? Object.keys(detalleJsonCierre0) : []; //Control por si no hay registros
     // Campos de Titulo
    const nuevoTitulo = campos.map(campo => ({
      title: campo,
      field: campo,
      align: "center",
      headerStyle: { color: "#2196f3" }
    }));

    
    detalle.forEach(item => {
      if (item.respuestas && Array.isArray(item.respuestas)) {
        const respuestas = item.respuestas.map(respuesta => respuesta.texto); // Extraer solo la propiedad "texto" de cada objeto respuesta
        item.respuestas = respuestas.join(", "); // Unir las respuestas en un solo string
      }
    });

    // console.log('TITULO')
    // console.log(nuevoTitulo);
    setTitulo(nuevoTitulo);
  }
}, [controlBotonClick, `${fechaInicio}-${fechaTermino}`,campana]);

  const getInitialExpandedState = () => {
    // Devuelve un objeto con el estado de expansión inicial para cada fila
    const initialExpandedState = {};
    data.forEach((row) => {
      initialExpandedState[row.id] = false;
    });
    return initialExpandedState;
  };

  return (
    <>
      <div style={{ width: '140%', height: '100%' }}>
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
                pageSize:10,
                defaultExpanded: getInitialExpandedState,
                rowStyle: rowData => ({
                  backgroundColor: rowData.Nota === '0%' ? 'red' : 'inherit',
                  color: rowData.Nota === '0%' ? 'white' : 'inherit',
                  fontSize: 10,
                }),
              }}
            />

          </ThemeProvider>
      </div>
    </>
  );
};
