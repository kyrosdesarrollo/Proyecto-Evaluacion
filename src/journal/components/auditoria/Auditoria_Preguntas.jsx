import { useState } from "react";
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button,Modal, Typography,Icon } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { actualizarDetalleJson, actualizarFormato } from "../../../store/formato/formatoSlice";
import Swal from 'sweetalert2'
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

  //Cerrar modal 
 

  //Validación de respuesta No
  const handleRespuesta = (preguntaId, respuesta) => {
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
  //Recorre pauta para extración de preguntas dejando estas agrupadas en bloque de evaluación.
  const preguntasPorBloque = arreglo[0].detalleJson.reduce((acc, consulta, i) => {
    const { 
      "BLOQUES DE EVALUACIÓN": bloque,
      "CATEGORÍA": categoria,
      "CONDUCTA": pregunta
    } = consulta;
  
    if (!acc[bloque]) {
      acc[bloque] = [];
    }
  
    acc[bloque].push({ id: i, categoria, pregunta, bloque });
  
    return acc;
  }, {});

  //Contar cantidad de preguntas de pauta
  const totalPreguntas = Object.values(preguntasPorBloque).reduce((acc, bloque) => acc + bloque.length, 0);
  //Contar cantidad de respuestas si / no / comentarios indicadas por usuario
  //estructura Object { si: 1, no: 2, comentarios: 1 }
  const estadisticas = Object.values(respuestas).reduce((acc, respuesta) => {
    if (respuesta.respuesta === "SI") {
      acc.si++;
    } else if (respuesta.respuesta === "NO") {
      acc.no++;
    }
    if (respuesta.comentario && respuesta.comentario.length > 1) {
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
    // //Validación de cantidad de respuestas ingresadas por usuario, utilizaremos la suma de si y no "estadistica"
    // if (totalPreguntas > estadisticas.si + estadisticas.no ) {
    //    setShowError(true);
    //   return
    // }
    // //Validación de respuestas no con su comentario
    // if (estadisticas.comentarios !== estadisticas.no) {
    //     setShowErrorNo(true);
    //   return;
    // }
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
   dispatch(actualizarDetalleJson({formatoIndex, indiceEncontrado, preguntasRespuestas}));
   handleClose();
   Swal.fire({
    confirmButtonColor: '#2196f3',
    icon: 'success',
    title: 'Encuesta',
    text: 'Encusta almacenada correctamente, recordar presionar el bóton guardar en pantalla principal para ser enviadas a repositorio central',
  });
   return
   
  };
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
            <p>{pregunta.categoria}</p>
            <p>"{pregunta.pregunta}"</p>
            <RadioGroup
              aria-labelledby={`demo-radio-buttons-group-label-${pregunta.id}`}
              name={`radio-buttons-group-${pregunta.id}`}
              onChange={(e) => handleRespuesta(pregunta.id, e.target.value)}
            >
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
            </RadioGroup>
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
    <Button sx={{ mx: "auto" }} onClick={handleSubmit}>
      Guardar
    </Button>
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
            <Icon color="white">error</Icon> No se puede guardar la información
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que no se encuentran todas las respuestas completadas. Favor de completar
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
           Debido a que no se encuentra ingresado el comentario de la opción No, Nota: ** Considerar que el campo comentario debe contener al menos 2 caracteres **. Favor de completar
        </Typography>
          <Button onClick={() => setShowErrorNo(false)}>Cerrar</Button>
        </div>
      </Modal>
  </CardContent>
</Card>
  );
};
export default Auditoria_Preguntas;

