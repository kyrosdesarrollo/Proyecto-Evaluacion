import { useState, useEffect } from "react";
import { Card, CardContent,Box ,FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button,Modal, Typography,Icon } from "@mui/material";
import {  InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { actualizarDetalleJson } from "../../../store/formato/formatoSlice";
import Swal from 'sweetalert2'


const Cierre_Preguntas = (props) => {
  //Tomando los formatos
  const formatosRedux = useSelector(state => state.formato.formatos);
  const dispatch = useDispatch();

  const [respuestas, setRespuestas] = useState({});
  const [showError, setShowError] = useState(false);
  const [showErrorNo, setShowErrorNo] = useState(false);
  const [idLineaObjeto, setIdLineaObjeto] = useState({});  
  const [porcentajeAcumulado, setPorcentajeAcumulado] = useState(0);

  //Control por si el dato lineaObjeto ess null adicional devuelve el objeto
  useEffect(() => {
    if (!props.lineaObjeto) {
      return;
    }
    setIdLineaObjeto(props.lineaObjeto.id)
  }, [props.lineaObjeto]);

 
  
  //Validación de respuesta No
  const handleRespuesta = (preguntaId, respuesta) => {
    console.log(preguntaId)
    console.log(respuesta)
   
    setRespuestas({
      ...respuestas,
      [preguntaId]: {
        respuesta: respuesta,
        comentario: respuestas[preguntaId]?.respuesta === "NO" ? respuestas[preguntaId].comentario : "",
      },
    });
  };
  //Extracción de pautas en redux
  const { pautas } = useSelector(state => state.pauta);
  //Limpiar nombre de pauta selecciona desde archivo
  let nombrePauta = props.pautasSeleccion.replace(/"/g, '');;
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
  //Extrae IOndice del objeto y captura las respuestas que realizo el usuario
  // console.log('LineaObjecto')
  // console.log(idLineaObjeto)
  let idIndice = idLineaObjeto - 1;
  // console.log(idIndice)
  let respuestaDeUsuario;
  try {
  respuestaDeUsuario = props.formato.detalleJson[idIndice].respuestas;
  } catch (error) {
    return
  }
  //Recorre pauta para extración de preguntas dejando estas agrupadas en bloque de evaluación.
  const preguntasPorBloque = arreglo[0].detalleJson.reduce((acc, consulta, i) => {
    const { 
      "BLOQUES DE EVALUACIÓN": bloque,
      "CATEGORÍA": categoria,
      "CONDUCTA": pregunta,
      "CUMPLIMIENTO POR BLOQUES":porcentajeBloque,
      "CUMPLIMIENTO POR CATEGORIA":porcentajePregunta,
      "QUIEBRE":quiebre
    } = consulta;
  
    if (!acc[bloque]) {
      acc[bloque] = [];
    }
    //Incorporación de respuestas de usuario a nivel de indice
    const respuesta = respuestaDeUsuario[i].respuesta;
    acc[bloque].push({ id: i, categoria, pregunta, respuesta,porcentajeBloque,porcentajePregunta, bloque, quiebre });
  
    return acc;
  }, {});

  console.log('first')
  console.log(preguntasPorBloque)

 

  //Contar cantidad de preguntas de pauta
  const totalPreguntas = Object.values(preguntasPorBloque).reduce((acc, bloque) => acc + bloque.length, 0);
  //Contar solo preguntas Generales
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
      acc.comentarios++;
    }
    return acc;
  }, { si: 0, no: 0, comentarios: 0 });
  
  //function cierre de ventana relacionado a la ventana modal
  const handleClose = () => {
    props.handleClose(); // Llamada a la función onClose del componente padre
  }
  // Boton guardar acción
  const handleSubmit = () => {
    //Validación de cantidad de respuestas ingresadas por usuario, utilizaremos la suma de si y no "estadistica"
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
    const preguntasRespuestas = arreglo[0].detalleJson.map((pregunta, index) => {
      const respuesta = respuestas[index];
      return {
        ...pregunta,
        respuesta,
      };
    });

    const idBuscado = props.lineaObjeto.id;
    const indiceEncontrado = props.formato.detalleJson.findIndex(elemento => elemento.id === idBuscado);    
    const idFormato = props.formato.id;
    const formatoIndex = formatosRedux.findIndex(formato => formato.id === idFormato); 
    //Accion para actualizar en redux las respuestas   
   
    // Definir la acción de actualización con los datos que deseas enviar al store

    
    const action = actualizarDetalleJson({formatoIndex, indiceEncontrado, preguntasRespuestas})
    dispatch(action);

   props.handleClose();
   setShowError(false);
   setRespuestas({});
   Swal.fire({
    confirmButtonColor: '#2196f3',
    icon: 'success',
    title: 'Cierre de Evaluación',
    text: 'Almacenada correctamente, recordar presionar el bóton guardar en pantalla principal para finalzar proceso. Gracias !!!! 😉',
  });
   return
   
  };

   //SUMA DE PREGUNTAS SI
   const bloquesOmitidos = ["INFORMACION GENERAL", "SOBRECUMPLIMIENTO"];
   let sumaPorcentajeTotal = 0;
   
   for (const bloque in preguntasPorBloque) {
     if (!bloquesOmitidos.includes(bloque)) {
       const preguntasEnBloque = preguntasPorBloque[bloque];
       for (const pregunta of preguntasEnBloque) {
         if (pregunta.respuesta.respuesta === 'SI') {
           sumaPorcentajeTotal += pregunta.porcentajePregunta * 100;
         }
         
       }
     }
   }
   
   let porcentajeTotal = (sumaPorcentajeTotal ).toFixed(0) + "%";
   

//ESTILOS Y PORCENTAJES
      //Estilo de porcentaje Final
      let porcentajeStyle = {};
      if (porcentajeTotal < 0) {
        porcentajeStyle.color = "red";
      } else if (porcentajeTotal  < 50) {
        porcentajeStyle.color = "red";
      } else {
        porcentajeStyle.color = "green";
      }

      let porcentajeFormateado = (porcentajeAcumulado * 100).toFixed(0) + "%";

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
    {Object.entries(preguntasPorBloque).map(([bloque, preguntas, respuesta]) => (
      
    <CardContent key={bloque} sx={{ borderColor: "primary.main" }}>
      <FormControl>
        <FormLabel id={`demo-radio-buttons-group-label-${bloque}`} sx={{ textAlign: "center", backgroundColor: "#2196f3", borderRadius: "20px" ,fontWeight: "bold",color: "white" }}>
          {bloque}
        </FormLabel>
        <br />
        {preguntas.map((pregunta) => (
          <div key={pregunta.id}>
           <p>{pregunta.categoria} {pregunta.quiebre === "SI" && <span style={{ display: "block", textAlign: "center" }}><span style={{ color: "red", fontWeight: "bold" }}>QUIEBRE</span></span>}</p>
            <p>{pregunta.pregunta}</p>

                {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 1' && (
                  <div>
                
                   <TextField
                      required
                      type="date"
                      variant="outlined"
                      value={pregunta.respuesta && pregunta.respuesta.fechadeconversion || ''}
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            respuesta: {
                              ...respuestas[pregunta.id],
                              fechadeconversion: e.target.value,
                            },
                          },
                        })
                      }
                      margin="dense"
                      style={{ width: '200px', textAlign: 'center' }}
                      disabled={false}
                      readOnly={false}
                  />

                  </div>
                 )}
                {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 2' &&(
                <div>
                <p>Este es el bloque de INFORMACION GENERAL y la categoría es GENERAL 2.</p>

                <TextField
                      required
                      variant="outlined"
                      value={pregunta.respuesta && pregunta.respuesta.idchat || ''}
                      onChange={(e) =>
                        setRespuestas((prevRespuestas) => ({
                          ...prevRespuestas,
                          [pregunta.id]: {
                            ...prevRespuestas[pregunta.id],
                            respuesta: {
                              ...(prevRespuestas[pregunta.id]?.respuesta || {}),
                              idchat: e.target.value,
                            },
                          },
                        }))
                      }
                      margin="dense"
                      style={{ width: '200px', textAlign: 'center' }}
                      disabled={false}   // Asegúrate de que disabled esté establecido en false
                      readOnly={false}   // Asegúrate de que readOnly esté establecido en false
                    />

                </div>
                 )}
                {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 3' &&(
                <div>

                  <TextField
                    required
                    type = "time"
                    variant="outlined"
                    value={pregunta.respuesta && pregunta.respuesta.hora || ''}
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          respuesta: {
                            ...respuestas[pregunta.id].respuesta,
                            hora: e.target.value,
                          },
                        },
                      })
                    }
                      margin="dense"
                      style={{ width: '200px', textAlign: 'center' }}
                      disabled={false}
                      readOnly={false}
                  />
                </div>
                 )}
                {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 4' && (
                <div>
                   <FormControl required style={{ width: '200px' }}>
                    <Select
                      value={pregunta.respuesta && pregunta.respuesta.tipoatencion || ''}
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            respuesta: {
                              ...respuestas[pregunta.id].respuesta,
                              tipoatencion: e.target.value,
                            },
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
        value={pregunta.respuesta && pregunta.respuesta.producto || ''}
        onChange={(e) =>
          setRespuestas({
            ...respuestas,
            [pregunta.id]: {
              ...respuestas[pregunta.id],
              respuesta: {
                ...respuestas[pregunta.id].respuesta,
                producto: e.target.value,
              },
            },
          })
        }
      >
        {opcionesProducto.map((opcion) => (
          <MenuItem key={opcion} value={opcion}>
            {opcion}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
                 )}
                {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 6' && (
                <div>
                   <FormControl required style={{ width: '200px' }}>
                    <Select
                      value={pregunta.respuesta && pregunta.respuesta.error || ''}
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            respuesta: {
                              ...respuestas[pregunta.id].respuesta,
                              error: e.target.value,
                            },
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
                      value={pregunta.respuesta && pregunta.respuesta.tipoerror || ''}
                      onChange={(e) =>
                        setRespuestas({
                          ...respuestas,
                          [pregunta.id]: {
                            ...respuestas[pregunta.id],
                            respuesta: {
                              ...respuestas[pregunta.id].respuesta,
                              tipoerror: e.target.value,
                            },
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
                                  value={pregunta.respuesta && pregunta.respuesta.quiebreparcial || ''}
                                  onChange={(e) =>
                                    setRespuestas({
                                      ...respuestas,
                                      [pregunta.id]: {
                                        ...respuestas[pregunta.id],
                                        respuesta: {
                                          ...respuestas[pregunta.id].respuesta,
                                          quiebreparcial: e.target.value,
                                        },
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
                              value={pregunta.respuesta && pregunta.respuesta.compromiso || ''}
                              onChange={(e) =>
                                setRespuestas({
                                  ...respuestas,
                                  [pregunta.id]: {
                                    ...respuestas[pregunta.id],
                                    respuesta: {
                                      ...respuestas[pregunta.id].respuesta,
                                      compromiso: e.target.value,
                                    },
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
                    value={pregunta.respuesta && pregunta.respuesta.tipocompromiso || ''}
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          respuesta: {
                            ...respuestas[pregunta.id].respuesta,
                            tipocompromiso: e.target.value,
                          },
                        },
                      })
                    }
                    margin="dense"
                      style={{ width: '800px'}}
                      disabled={false}
                      readOnly={false}
                  />
                </div>
                 )}
                {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 11' &&(
                <div>

                  <TextField
                    required
                    type = "time"
                    variant="outlined"
                    value={pregunta.respuesta && pregunta.respuesta.horacierre || ''}
                    onChange={(e) =>
                      setRespuestas({
                        ...respuestas,
                        [pregunta.id]: {
                          ...respuestas[pregunta.id],
                          respuesta: {
                            ...respuestas[pregunta.id].respuesta,
                            horacierre: e.target.value,
                          },
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
                  value={pregunta.respuesta.respuesta || 'NO'}
                  onChange={(e) => handleRespuesta(pregunta.id, e.target.value)}
               >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              )
             }
            {pregunta.respuesta.respuesta === "NO" && (
              <TextField
                required
                label="Comentario"
                variant="outlined"
                value={pregunta.respuesta.comentario}
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
              />
            )}
            <Box> </Box>
            {pregunta.respuesta.respuesta === "NO" && (
            
             <font color="red" size="5">  Porcentaje obtenido 0 %</font> 
             
              
            )}
            {pregunta.respuesta.respuesta === "SI" && (
              
              <font color="primary" size="5">Porcentaje obtenido  {pregunta.porcentajePregunta * 100} %</font> 
               
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
    <Typography variant="h4" gutterBottom sx={porcentajeStyle} >
        Porcentaje Total : {porcentajeTotal}
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
  </CardContent>
</Card>
  );
};
export default Cierre_Preguntas;

