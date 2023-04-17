import { useState } from "react";
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { useSelector } from 'react-redux';

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

const Auditoria_Preguntas = ({pautasSeleccion, lineaObjeto}) => {
 

  const [respuestas, setRespuestas] = useState({});
  const handleRespuesta = (preguntaId, respuesta) => {
    setRespuestas({
      ...respuestas,
      [preguntaId]: {
        respuesta: respuesta,
        comentario: respuestas[preguntaId]?.respuesta === "NO" ? respuestas[preguntaId].comentario : "",
      },
    });
  };
  const handleSubmit = () => {
    //Aquí puedes hacer algo con las respuestas, como enviarlas a un servidor o guardarlas localmente
    console.log(respuestas);
    //Control de Linea para agregar respuestas
    console.log('Estoy en las preguntas')
    console.log(lineaObjeto)
  };

  //Extracción de pautas en redux
  const { pautas } = useSelector(state => state.pauta);
  //Limpiar nombre de pauta selecciona desde archivo
  let nombrePauta = pautasSeleccion.replace(/"/g, '');;
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
  </CardContent>
</Card>
  );
};

export default Auditoria_Preguntas;

