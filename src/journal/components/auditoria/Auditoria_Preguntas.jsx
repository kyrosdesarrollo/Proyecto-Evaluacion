import { useState } from "react";
import { Card, CardContent,FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button,Modal, Typography,Icon } from "@mui/material";
import {  InputLabel, Select, MenuItem } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { actualizarDetalleJson } from "../../../store/formato/formatoSlice";
import Swal from 'sweetalert2';
import {campos , categoriasGenerales}  from '../auditoria/estructura/informacionGeneral'
//import categoriasGenerales from '../auditoria/estructura/informacionGeneral'
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
  const [porcentajeAcumulado, setPorcentajeAcumulado] = useState(0);
  const [porcentajeAcumuladoBloque, setPorcentajeAcumuladoBloque] = useState(0);
  //Cerrar modal 

 //Respuesta a nivel de linea con acumulación
  const handleRespuesta = (preguntaId, respuesta) => {
    const bloquePreguntas = Object.values(preguntasPorBloque);
  
    let nuevoPorcentajeAcumulado = 0;
  
    bloquePreguntas.forEach((bloque) => {
      if (bloque[0].bloque !== "SOBRECUMPLIMIENTO") {
          const pregunta = bloque.find((pregunta) => pregunta.id === preguntaId);
          
          if (pregunta) {
            const porcentajePregunta = pregunta.porcentajePregunta;
        
            if (respuesta === "SI") {
              nuevoPorcentajeAcumulado += porcentajePregunta;
            } else if (respuesta === "NO" && respuestas[preguntaId]?.respuesta === "SI") {
              nuevoPorcentajeAcumulado -= porcentajePregunta;
            }
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
  
    // if (!acc[bloque]) {
    //   acc[bloque] = [];
    // }
    if (!acc[bloque]) {
      acc[bloque] = []; // Inicializar acc[bloque] como un arreglo vacío
      acc[bloque].porcentajeAcumuladoBloque = 0; // Inicializar porcentajeAcumuladoBloque en 0
    }
  
    acc[bloque].push({ id: i, categoria, pregunta, bloque, porcentajePregunta, porcentajeBloque, quiebre  });
  
    return acc;
  }, {});

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
          title: 'Evaluación',
          text: 'Almacenada correctamente, recordar presionar el bóton guardar en pantalla principal para ser enviadas esta(s) encuesta(s). Gracias !!!! 😉',
        });
        return
   
  };

  //ESTILOS Y PORCENTAJES
      //Estilo de porcentaje Final
      let porcentajeStyle = {};
      if (porcentajeAcumulado < 0) {
        porcentajeStyle.color = "red";
      } else if (porcentajeAcumulado * 100 < 50) {
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
    {Object.entries(preguntasPorBloque).map(([bloque, preguntas]) => (
    <CardContent key={bloque} sx={{ borderColor: "primary.main" }}>
      <FormControl>
        <FormLabel id={`demo-radio-buttons-group-label-${bloque}`} sx={{ textAlign: "center", backgroundColor: "#2196f3", borderRadius: "20px" ,fontWeight: "bold",color: "white" }}>
          {bloque} 
        </FormLabel>
        <br />
        {preguntas.map((pregunta) => (
          <div key={pregunta.id}>
           <p>{pregunta.categoria} {pregunta.quiebre === "SI" && <span style={{ display: "block", textAlign: "center" }}><span style={{ color: "red", fontWeight: "bold" }}>QUIEBRE</span></span>}</p>
            <p>{pregunta.pregunta} </p>

            {bloque === 'INFORMACION GENERAL'  && pregunta.categoria === 'GENERAL 1' &&(
                <div>
                  <TextField
                    required
                    type = "date"
                    variant="outlined"
                    value={respuestas[pregunta.id]?.fechadeconversion || ''}
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
                    value={respuestas[pregunta.id]?.idchat || ''}
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
                    value={respuestas[pregunta.id]?.hora || ''}
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
                      value={respuestas[pregunta.id]?.tipoatencion || ''}
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
                      value={respuestas[pregunta.id]?.producto || ''}
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
                      value={respuestas[pregunta.id]?.error || ''}
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
                    value={respuestas[pregunta.id]?.tipoerror || ''}
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
                  </Select>
                </FormControl>
              </div>
            )}

            {bloque === 'INFORMACION GENERAL' && pregunta.categoria === 'GENERAL 8' && (
                            <div>
                              <FormControl required style={{ width: '200px' }}>
                                <Select
                                  value={respuestas[pregunta.id]?.quiebreparcial || ''}
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
                                                  value={respuestas[pregunta.id]?.compromiso || ''}
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
                    value={respuestas[pregunta.id]?.tipocompromiso || ''}
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
                    value={respuestas[pregunta.id]?.horacierre || ''}
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
                  onChange={(e) => handleRespuesta(pregunta.id, e.target.value)}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>)
          }
            
            
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
  </CardContent>
</Card>
  );
};
export default Auditoria_Preguntas;

