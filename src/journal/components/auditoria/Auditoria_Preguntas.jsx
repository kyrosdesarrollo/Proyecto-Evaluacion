import { useState, useEffect} from "react";
import { Card, CardContent,FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button,Modal, Typography,Icon } from "@mui/material";
import { Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { actualizarDetalleJson } from "../../../store/formato/formatoSlice";
import Swal from 'sweetalert2';


//Ejemplo de formato de archivo para construir
// const preguntas = [
//   {
//     id: "pregunta1",
//     categoria: "Velocidad al contestar",
//     pregunta: "Atención inmediata del chat: Saluda al Cliente",
// .   bloque:"ABORDAJE",
// .   cumplimiento: "si porcentaje / no 0"
// .   cumplimientoBloque:"Total bloque"
//   },
//   {
//     id: "pregunta2",
//     categoria: "Saludo e identificación",
//     pregunta: "Saluda al cliente: ¡Hola! Soy (nombre ejecutivo), estaré a cargo de atender tu solicitud.",
// .   bloque:"ABORDAJE",
// .   cumplimiento: "si porcentaje / no 0"
// .   cumplimientoBloque:"Total bloque"
//   },
//   {
//     id: "pregunta3",
//     categoria: "Validación",
//     pregunta: "Toda atención en la que se entregue información privada de la cuenta del cliente.",
// .   bloque:"ABORDAJE",
// .   cumplimiento: "si porcentaje / no 0"
// .   cumplimientoBloque:"Total bloque"
//   },
// ];
const Auditoria_Preguntas = (props) => {
  //Tomando los formatos
  const formatosRedux = useSelector(state => state.formato.formatos);
  const dispatch = useDispatch();

  const [respuestas, setRespuestas] = useState({});
  const [showError, setShowError] = useState(false);
  const [showErrorNo, setShowErrorNo] = useState(false);
  const [showErrorRespuestas, setShowErrorRespuestas] = useState(false);
  const [porcentajeAcumulado, setPorcentajeAcumulado] = useState(0);


 //Respuesta a nivel de linea con acumulación
  const handleRespuesta = (preguntaId, respuesta) => {
    
    const bloquePreguntas = Object.values(preguntasPorBloque);
     
    let nuevoPorcentajeAcumulado = 0;
  
    bloquePreguntas.forEach((bloque) => {
     // Busqueda de respuesta a nivel de linea
          const pregunta = bloque.find((pregunta) => pregunta.id === preguntaId);
          if (pregunta) {
            const porcentajePregunta = pregunta.porcentajePregunta;
        
      
            if (respuesta === "SI") {
              nuevoPorcentajeAcumulado += porcentajePregunta;
            } else if (respuesta === "NO" && respuestas[preguntaId]?.respuesta === "SI") {
              nuevoPorcentajeAcumulado -= porcentajePregunta;
            }
          }
    });
    setPorcentajeAcumulado(prevPorcentaje => prevPorcentaje + nuevoPorcentajeAcumulado);

    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: {
        respuesta: respuesta,
        comentario: prevRespuestas[preguntaId]?.respuesta === "NO" ? prevRespuestas[preguntaId].comentario : "",
      },
    }));


  };
  
  //Extracción de pautas en redux
  const { pautas } = useSelector(state => state.pauta);

  //Limpiar nombre de pauta selecciona desde archivo
  let nombrePauta = props.pautasSeleccion.replace(/"/g, '');
  // Variable para almacenar los objetos encontrados
  const objetosEncontrados = [];
  // Recorremos el arreglo y buscamos objetos con el formato ejemplo : "PARLO FRAUDE"
  pautas.forEach((objeto, indice) => {
    if (objeto.formato === nombrePauta) {
      objetosEncontrados.push(objeto);
    }
  });
  //Seleccion de pauta con las preguntas
  const pauta = JSON.stringify(objetosEncontrados);
  //convertir una cadena de texto pauta en formato JSON a un objeto de JavaScript.
  const arreglo = JSON.parse(pauta);
  //Busquueda id para extración de respuestas
  let idBuscado = props.lineaObjeto && props.lineaObjeto.id;
  let indiceEncontrado = props.formato.detalleJson.findIndex(elemento => elemento.id === idBuscado);    
  let idFormato = props.formato.id;
  let formatoIndex = formatosRedux.findIndex(formato => formato.id === idFormato); 

  let respuestasRedux1;
    if (props.lineaObjeto && props.lineaObjeto.id) {
      // Acceder a props.lineaObjeto.id y realizar las operaciones necesarias
      respuestasRedux1 = formatosRedux[formatoIndex].detalleJson?.[indiceEncontrado].respuestas;
    } 

  const todasLasRespuestas = [];
  for (const key in respuestasRedux1) {
    if (respuestasRedux1.hasOwnProperty(key)) {
      todasLasRespuestas.push(respuestasRedux1[key].respuesta);
    }
  }

  useEffect(() => {
  setRespuestas(todasLasRespuestas);
  }, [respuestasRedux1]);

  let arregloDetalle;
    if (respuestasRedux1) {
      arregloDetalle = respuestasRedux1.slice();
    } else {
      arregloDetalle = arreglo[0].detalleJson;
    }

  //Recorre pauta para extración de preguntas dejando estas agrupadas en bloque de evaluación.
  const preguntasPorBloque = arregloDetalle.reduce((acc, consulta, i) => {
    const { 
      "BLOQUES DE EVALUACIÓN": bloque,
      "CATEGORÍA": categoria,
      "CONDUCTA": pregunta,
      "CUMPLIMIENTO POR BLOQUES":porcentajeBloque,
      "CUMPLIMIENTO POR CATEGORIA":porcentajePregunta,
      "QUIEBRE":quiebre,
      "respuesta": respuesta
    } = consulta;
  
    // if (!acc[bloque]) {
    //   acc[bloque] = [];
    // }
    if (!acc[bloque]) {
      acc[bloque] = []; // Inicializar acc[bloque] como un arreglo vacío
      acc[bloque].porcentajeAcumuladoBloque = 0; // Inicializar porcentajeAcumuladoBloque en 0
    }
  
    acc[bloque].push({ id: i, categoria, pregunta, bloque, porcentajePregunta, porcentajeBloque, quiebre, respuesta  });
  
    return acc;
  }, {});

  
  //Contar cantidad de preguntas de pauta
  const totalPreguntas = Object.values(preguntasPorBloque).reduce((acc, bloque) => acc + bloque.length, 0);
  
  //Contar solo preguntas Generales // Control de respuestas no contestada
  let cuentaGeneral = 0;
  const totalPreguntasGeneral = Object.values(preguntasPorBloque).reduce((acc, bloque) => {
    for (let i = 0; i < bloque.length; i++) {
        if (bloque[i].bloque === 'INFORMACION GENERAL') {
          cuentaGeneral++
        }
    }
   
  }, 0);
  //Contar cantidad de respuestas si / no / comentarios indicadas por usuario
  //estructura Object { si: 1, no: 2, comentarios: 1 }
  const estadisticas = Object.values(respuestas).reduce((acc, respuesta) => {
    if (respuesta.respuesta === "SI") {
      
      acc.si++;
    } else if (respuesta.respuesta === "NO") {
      acc.no++;
    }
    if (respuesta.comentario && respuesta.comentario.length > 4) {
      if (respuesta.respuesta === "NO") {
        acc.comentarios++;
      }
      
    }
    return acc;
  }, { si: 0, no: 0, comentarios: 0 });
  
  // //function cierre de ventana relacionado a la ventana modal
  // const handleClose = () => {
  //   props.handleClose(); // Llamada a la función onClose del componente padre
  // }
  // Boton guardar acción
  const handleSubmit = () => {
    
    //Validación de cantidad de respuestas ingresadas por usuario, utilizaremos la suma de si y no "estadistica" adicional cuentaGeneral que se incluye
    if (totalPreguntas > estadisticas.si + estadisticas.no + cuentaGeneral) {
       setShowError(true);
      return
    }
    //Validación de respuestas no con su comentario
    if (estadisticas.comentarios !== estadisticas.no) {
        setShowErrorNo(true);
      return;
    }
    //A nivel de linea agrega las respuestas correspondiente
    let preguntasRespuestas = arregloDetalle.map((pregunta, index) => {
      const respuesta = respuestas[index];
      return {
        ...pregunta,
        respuesta,
      };
    });
    const camposUndefined = preguntasRespuestas.filter((pregunta) => pregunta.respuesta === undefined);
    //Control de respuestas realizadas
    if (camposUndefined.length > 0) {
      setShowErrorRespuestas(true);
      return
    }
    //Accion para actualizar en redux las respuestas   
    // Definir la acción de actualización con los datos que deseas enviar al store y firebase
    //const action = actualizarDetalleJson({formatoIndex, indiceEncontrado, preguntasRespuestas})

    dispatch(actualizarDetalleJson({formatoIndex, indiceEncontrado, preguntasRespuestas}));

       props.handleClose();
       setShowError(false);
       // setRespuestas({});
        Swal.fire({
          confirmButtonColor: '#2196f3',
          icon: 'success',
          title: 'Evaluación',
          text: 'Almacenada correctamente, recordar presionar el bóton guardar en pantalla principal para ser enviadas esta(s) encuesta(s). Gracias !!!! 😉',
        });
        
  };
  
    //A nivel de linea agrega las respuestas correspondiente
    const preguntasRespuestas = arregloDetalle.map((pregunta, index) => {
      const respuesta = respuestas[index];
      return {
        ...pregunta,
        respuesta,
      };
    });
    //CALCULO PARA CONTROLAR QUIEBRE TOTAL PORCENTAJE O QUIEBRE PARCIAL (CONSIDERA BLOQUE SOBRECUMPLIMIENTO Y PREGUNTAS CON QUIEBRE = SI)
        let conductaErrorCritico;
        let conductaErrorQuiebreParcial;
       
        preguntasRespuestas.some((pregunta) => {
          const conducta = pregunta.CONDUCTA.trim();
          
          if (conducta === "Error Crítico" && pregunta.respuesta?.error === "SI") {
            conductaErrorCritico = pregunta.respuesta.error;
            return true;
          } else if (conducta === "Quiebre parcial de Tiempo" && pregunta.respuesta?.quiebreparcial === "SI") {
            conductaErrorQuiebreParcial = pregunta.respuesta.quiebreparcial;
            return true;
          }
        });

        let porcentajeFormateado = (porcentajeAcumulado * 100).toFixed(0) + "%";

        //Verificación
        const sumaPorcentajes = preguntasRespuestas.reduce((acumulador, elemento) => {
          if (elemento["BLOQUES DE EVALUACIÓN"] !== 'INFORMACION GENERAL' && elemento.respuesta?.respuesta === 'SI') {
            return acumulador + elemento["CUMPLIMIENTO POR CATEGORIA"];
          } else {
            return acumulador;
          }
        }, 0);
        
                porcentajeFormateado = (sumaPorcentajes * 100).toFixed(0) + "%";

        if (conductaErrorCritico === 'SI') {
          porcentajeFormateado = (porcentajeAcumulado * 0).toFixed(0) + "%";
        } else if (conductaErrorQuiebreParcial === "SI") {
          let totalPorcentajeQuiebre = 0;
          let totalPorcentajeSobrecumplimiento = 0;
          let quiebre = 0;
          let parcial = 0;
          let sobrecumplimientoTotal = 0;

          const preguntasConQuiebre = preguntasRespuestas.filter((pregunta) => pregunta.QUIEBRE === "SI");
          const preguntasConSuministro = preguntasRespuestas.filter((pregunta) => pregunta['BLOQUES DE EVALUACIÓN'] === "SOBRECUMPLIMIENTO");

          let conducta;
          for (let i = 0; i < preguntasConQuiebre.length; i++) {
             conducta = preguntasConQuiebre[i]['CUMPLIMIENTO POR CATEGORIA'];
            totalPorcentajeQuiebre += conducta;
          }
        
          let sobrecumplimiento
          for (let i = 0; i < preguntasConSuministro.length; i++) {
            sobrecumplimiento = preguntasConSuministro[i]['CUMPLIMIENTO POR CATEGORIA'];
            totalPorcentajeSobrecumplimiento += sobrecumplimiento;
          }
          //Control de suminstro para el calculo total no considerar cuando es NO
          let controlCumplimiento = 0;
          for (let i = 0; i < preguntasConSuministro.length; i++) {
            if (preguntasConSuministro[i].respuesta?.respuesta === 'NO') {
              controlCumplimiento += preguntasConSuministro[i]['CUMPLIMIENTO POR CATEGORIA'];
            }
            
          }
           quiebre = totalPorcentajeQuiebre * 100;
           parcial = porcentajeAcumulado * 100;
           sobrecumplimientoTotal = (totalPorcentajeSobrecumplimiento - controlCumplimiento) * 100;

           const porcentajeExtrae = parseFloat(porcentajeFormateado) / 100
           if (respuestasRedux1) {
            porcentajeFormateado = ( porcentajeExtrae * 100  - quiebre - sobrecumplimientoTotal ).toFixed(0) + "%";
           }else{
            porcentajeFormateado = (parcial - quiebre - sobrecumplimientoTotal ).toFixed(0) + "%";
           }

          
        }

        //ESTILOS Y PORCENTAJES
      //Estilo de porcentaje Final
    
      const porcentajeNumerico = parseFloat(porcentajeFormateado) / 100;
      let porcentajeStyle = {};
      if (porcentajeNumerico < 0.01) {
        porcentajeStyle.color = "red";
      } else if (porcentajeNumerico < 0.5) {
        porcentajeStyle.color = "orange";
      } else {
        porcentajeStyle.color = "green";
      }
      
      const opcionesProducto = [
        'Cliente Total Pack',
        'Compras en Holding',
        'Credito de Consumo',
        'Credito Automotriz',
        'Credito Hipotecario',
        'Cuenta Corriente',
        'Cuenta Vista',
        'Deposito a Plazo',
        'Falabella Connect',
        'Fondos Mutuos',
        'Internet',
        'Producto CMR',
        'Promociones',
        'Puntos CMR',
        'Recibe SMS',
        'Sobre Oficinas',
        'Tarjeta Crédito',
        'Tarjeta Débito'
      ];
    

  return (
    <Card variant="outlined" sx={{ borderRadius: "12px", backgroundColor: "#f5f5f5", borderColor: "primary.main" }}>
    {Object.entries(preguntasPorBloque).map(([bloque, preguntas]) => (
    <CardContent key={bloque} sx={{ borderColor: "primary.main" }}>
      <FormControl>
      <FormLabel
            id={`demo-radio-buttons-group-label-${bloque}`}
            sx={{
              textAlign: "center",
              backgroundColor: "#2196f3",
              borderRadius: "20px",
              fontWeight: "bold",
              color: "white"
            }}
          >
            {bloque}
          </FormLabel>

        <br />
        {preguntas.map((pregunta) => (
          <div key={pregunta.id}>
           <p>
                <strong>{pregunta.categoria}</strong>{" "}
                {pregunta.quiebre === "SI" && (
                  <span style={{ display: "block", textAlign: "center" }}>
                    <span style={{ color: "red", fontWeight: "bold" }}>QUIEBRE</span>
                  </span>
                )}
              </p>
            <p>{pregunta.pregunta} </p>

              {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 1' &&(
                <div>
                  <TextField
                    required
                    type = "date"
                    variant="outlined"
                    value={
                      respuestas?.[pregunta.id]?.fechadeconversion !== undefined
                        ? respuestas?.[pregunta.id]?.fechadeconversion
                        : respuestas?.[pregunta.id]?.respuesta?.fechadeconversion || ''
                    }
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          fechadeconversion: e.target.value,
                        },
                      })
                    }
                    margin="dense"
                    style={{ width: '200px', textAlign: 'center' }}
                  />
                </div>
              )}
              {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 2' &&(
                <div>
                  
                  <TextField
                    required
                    variant="outlined"
                    //value={respuestas[pregunta.id]?.idchat || ''}
                    value={
                      respuestas?.[pregunta.id]?.idchat !== undefined
                        ? respuestas?.[pregunta.id]?.idchat
                        : respuestas?.[pregunta.id]?.respuesta?.idchat || ''
                    }
                    
                    
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          idchat: e.target.value,
                        },
                      })
                    }
                    margin="dense"
                    style={{ width: '200px' }}
                  />
                </div>
              )}
              {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 3' &&(
                <div>

                  <TextField
                    required
                    type = "time"
                    variant="outlined"
                    value={
                      respuestas?.[pregunta.id]?.hora !== undefined
                        ? respuestas?.[pregunta.id]?.hora
                        : respuestas?.[pregunta.id]?.respuesta?.hora || ''
                    }
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          hora: e.target.value,
                        },
                      })
                    }
                    margin="dense"
                    style={{ width: '200px', textAlign: 'center' }}
                  />
                </div>
              )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 4' && (
                <div>
                   <FormControl required style={{ width: '200px' }}>
                    <Select
                      value={
                        respuestas?.[pregunta.id]?.tipoatencion !== undefined
                          ? respuestas?.[pregunta.id]?.tipoatencion
                          : respuestas?.[pregunta.id]?.respuesta?.tipoatencion || ''
                      }
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            tipoatencion: e.target.value,
                          },
                        })
                      }
                    >
                      <MenuItem value="Consulta">Consulta</MenuItem>
                      <MenuItem value="Reclamo">Reclamo</MenuItem>
                      <MenuItem value="Solicitud">Solicitud</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 5' && (
                <div>
                  <FormControl required style={{ width: '200px' }}>
                    <Select
                      value={
                        respuestas?.[pregunta.id]?.producto !== undefined
                          ? respuestas?.[pregunta.id]?.producto
                          : respuestas?.[pregunta.id]?.respuesta?.producto || ''
                      }
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            producto: e.target.value,
                          },
                        })
                      }
                    >
                      {opcionesProducto.map((opcion) => (
                        <MenuItem key={opcion} value={opcion}>{opcion}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 6' && (
                <div>
                   <FormControl required style={{ width: '200px' }}>
                    <Select
                      value={
                        respuestas?.[pregunta.id]?.error !== undefined
                          ? respuestas?.[pregunta.id]?.error
                          : respuestas?.[pregunta.id]?.respuesta?.error || ''
                      }
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            error: e.target.value,
                          },
                        })
                      }
                    >
                      <MenuItem value="SI">SI</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 7' && (
              <div>
                <FormControl required style={{ width: '1100px' }}>
                  <Select
                     value={
                      respuestas?.[pregunta.id]?.tipoerror !== undefined
                        ? respuestas?.[pregunta.id]?.tipoerror
                        : respuestas?.[pregunta.id]?.respuesta?.tipoerror || ''
                    }
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          tipoerror: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="">Seleccionar</MenuItem>
                    <MenuItem value="Gestión indebida: Modificar datos personales la cuenta sin autorización de cliente o empresa.">
                      Gestión indebida: Modificar datos personales la cuenta sin autorización de cliente o empresa.
                    </MenuItem>
                    <MenuItem value="Entregar información privada de la cuenta a un tercero sin autorización de titular.">
                      Entregar información privada de la cuenta a un tercero sin autorización de titular.
                    </MenuItem>
                    <MenuItem value="Entregar información incorrecta o incompleta que afecta la resolución de la solicitud del cliente o entregar información de Sistema Comercial no autorizada (ej.; Mora Banco Itaú)">
                      Entregar información incorrecta o incompleta que afecta la resolución de la solicitud del cliente o entregar información de Sistema Comercial no autorizada (ej.; Mora Banco Itaú)
                    </MenuItem>
                    <MenuItem value="Desatender o cortar la interacción con el cliente (Llamado/Chat)">
                      Desatender o cortar la interacción con el cliente (Llamado/Chat)
                    </MenuItem>
                    <MenuItem value="Entrar en discusión con el cliente, realizar comentarios de desprestigio la empresa, compañero u otra áreas.">
                      Entrar en discusión con el cliente, realizar comentarios de desprestigio la empresa, compañero u otra áreas.
                    </MenuItem>
                    <MenuItem value="Atender a los clientes de forma despectiva, grosera o con improperios.">
                      Atender a los clientes de forma despectiva, grosera o con improperios.
                    </MenuItem>
                    <MenuItem value="Silencio Mayor a 12 minutos">Silencio Mayor a 12 minutos</MenuItem>
                    <MenuItem value="No se despide despues de 4 minutos">No se despide despues de 4 minutos</MenuItem>
                    <MenuItem value="No Aplica">No Aplica</MenuItem>
                  </Select>
                </FormControl>
              </div>
               )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 8' && (
                            <div>
                              <FormControl required style={{ width: '200px' }}>
                                <Select
                                  value={
                                    respuestas?.[pregunta.id]?.quiebreparcial !== undefined
                                      ? respuestas?.[pregunta.id]?.quiebreparcial
                                      : respuestas?.[pregunta.id]?.respuesta?.quiebreparcial || ''
                                  }
                                  onChange={(e) =>
                                    setRespuestas({
                                      ...respuestas,
                                      [pregunta.id]: {
                                        ...respuestas[pregunta.id],
                                        quiebreparcial: e.target.value,
                                      },
                                    })
                                  }
                                >
                                  <MenuItem value="SI">SI</MenuItem>
                                  <MenuItem value="NO">NO</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
               )}
              {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 9' && (
                                            <div>
                                              <FormControl required style={{ width: '200px' }}>
                                                <Select
                                                  value={
                                                    respuestas?.[pregunta.id]?.compromiso !== undefined
                                                      ? respuestas?.[pregunta.id]?.compromiso
                                                      : respuestas?.[pregunta.id]?.respuesta?.compromiso || ''
                                                  }
                                                  onChange={(e) =>
                                                    setRespuestas({
                                                      ...respuestas,
                                                      [pregunta.id]: {
                                                        ...respuestas[pregunta.id],
                                                        compromiso: e.target.value,
                                                      },
                                                    })
                                                  }
                                                >
                                                  <MenuItem value="SI">SI</MenuItem>
                                                  <MenuItem value="NO">NO</MenuItem>
                                                </Select>
                                              </FormControl>
                                            </div>
               )}
              {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 10' &&(
                <div>

                  <TextField
                    required
                    variant="outlined"
                    value={
                      respuestas?.[pregunta.id]?.tipocompromiso !== undefined
                        ? respuestas?.[pregunta.id]?.tipocompromiso
                        : respuestas?.[pregunta.id]?.respuesta?.tipocompromiso || ''
                    }
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          tipocompromiso: e.target.value,
                        },
                      })
                    }
                    margin="dense"
                    style={{ width: '800px' }}
                  />
                </div>
               )}
              {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 11' &&(
                <div>
                    <TextField
                    required
                    type = "time"
                    variant="outlined"
                    value={
                      respuestas?.[pregunta.id]?.horacierre !== undefined
                        ? respuestas?.[pregunta.id]?.horacierre
                        : respuestas?.[pregunta.id]?.respuesta?.horacierre || ''
                    }
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          horacierre: e.target.value,
                        },
                      })
                    }
                    margin="dense"
                    style={{ width: '200px', textAlign: 'center' }}
                  />

                </div>
               )}
               {bloque !== 'INFORMACION GENERAL' && (
                <RadioGroup
                  aria-labelledby={`demo-radio-buttons-group-label-${pregunta.id}`}
                  name={`radio-buttons-group-${pregunta.id}`}
                  value={
                    respuestas?.[pregunta.id]?.respuesta !== undefined
                      ? respuestas?.[pregunta.id]?.respuesta
                      : (respuestas?.[pregunta.id]?.respuesta?.respuesta || '')
                  }
                  onChange={(e) => handleRespuesta(pregunta.id, e.target.value)}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              )}
              {respuestas[pregunta.id]?.respuesta === "NO" && (
               <font color="red" size="5">Porcentaje obtenido 0%</font>
               )}
              <br />

              {respuestas[pregunta.id]?.respuesta === "SI" && (
              <font color="primary" size="5">
                Porcentaje obtenido {pregunta.porcentajePregunta * 100}%
              </font>
            )}

            {respuestas[pregunta.id]?.respuesta === "NO" && (
                          <TextField
                          required
                          label="Comentario"
                          variant="outlined"
                          value={respuestas[pregunta.id]?.comentario}
                          onChange={(e) =>
                            setRespuestas({
                              ...respuestas,
                              [pregunta.id]: {
                                ...respuestas[pregunta.id],
                                comentario: e.target.value,
                              },
                            })
                          }
                          margin="dense"
                          multiline
                          rows={2} // Ajusta el número de filas para aumentar la altura
                          style={{ width: '1500px' }} // Ajusta el ancho del TextField
                        />
                      )}
            <br />
          </div>
        ))}
      </FormControl>
      <br />
    </CardContent>
    
  ))}
  <CardContent sx={{ borderColor: "primary.main" }}>
    <Button variant="contained" sx={{ mx: "auto" }} onClick={handleSubmit}>
      Guardar
    </Button>
    <br />
    <br />
      <Typography variant="h4" gutterBottom sx={porcentajeStyle} >
        Porcentaje Total : {porcentajeFormateado}
      </Typography>
      <Modal open={showError} onClose={() => setShowError(false)}>
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          
          <Typography variant="h6" gutterBottom>
            <Icon color="white">error</Icon> No se puede guardar la información.
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que No se encuentran todas las respuestas de evaluación completadas. Favor de finalizar esta(s) respuesta(s). 👻
        </Typography>
          <Button onClick={() => setShowError(false)}>Cerrar</Button>
        </div>
      </Modal>
      <Modal open={showErrorNo} onClose={() => setShowErroNo(false)}>
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
         <Typography variant="h6" gutterBottom>
          <Icon color="white">error</Icon>  No se puede guardar la información
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que no se encuentra ingresado el comentario de la opción No, Nota: ** Considerar que el campo comentario debe contener al menos 5 caracteres **. Favor de completar. 😓
        </Typography>
          <Button onClick={() => setShowErrorNo(false)}>Cerrar</Button>
        </div>
      </Modal>
      <Modal open={showErrorRespuestas} onClose={() => setShowErrorRespuestas(false)}>
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
         <Typography variant="h6" gutterBottom>
          <Icon color="white">error</Icon>  No se puede guardar la información
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que no se encuentra ingresado la información requerida, Nota: ** Considerar Información General  **. Favor de completar. 😓
        </Typography>
          <Button onClick={() => setShowErrorRespuestas(false)}>Cerrar</Button>
        </div>
      </Modal>
  </CardContent>
</Card>
  );
};
export default Auditoria_Preguntas;

