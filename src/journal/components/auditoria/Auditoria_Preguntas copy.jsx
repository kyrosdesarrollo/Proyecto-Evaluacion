import { useState } from "react";
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { useSelector } from 'react-redux';

//Ejemplo de formato de archivo para construir
// const preguntas = [
//   {
//     id: "pregunta1",
//     text: "Velocidad al contestar",
//     prompt: "Atención inmediata del chat: Saluda al Cliente",
//   },
//   {
//     id: "pregunta2",
//     text: "Saludo e identificación",
//     prompt: "Saluda al cliente: ¡Hola! Soy (nombre ejecutivo), estaré a cargo de atender tu solicitud.",
//   },
//   {
//     id: "pregunta3",
//     text: "Validación",
//     prompt: "Toda atención en la que se entregue información privada de la cuenta del cliente.",
//   },
// ];

const Auditoria_Preguntas = ({pautasSeleccion}) => {

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
  //convertir una cadena de texto pauta en formato JSON a un objeto de JavaScript
  const arreglo = JSON.parse(pauta);

  //Recorre pauta para extración de preguntas
  // let recogePreguntas = []
  // for (let i = 0; i < arreglo[0].detalleJson.length; i++) {
  //   //console.log(arreglo[0].datalleJson[i]);
  //   let primero = arreglo[0].detalleJson[i]["BLOQUES DE EVALUACIÓN"].trim();
  //   let segundo = arreglo[0].detalleJson[i]["CATEGORÍA"].trim();
  //   let tercero = arreglo[0].detalleJson[i]["CONDUCTA"].trim();
  //   recogePreguntas.push({id: i , text: segundo, prompt: tercero,bloque: primero})
  // }

  //Recorre pauta para extración de preguntas
  const recogePreguntas = arreglo[0].detalleJson.map((pregunta, i) => {
    const { 
      "BLOQUES DE EVALUACIÓN": bloque,
      "CATEGORÍA": text,
      "CONDUCTA": prompt
    } = pregunta;
    return { id: i, text, prompt, bloque };
  });
  
  return (
    <Card variant="outlined" sx={{ borderRadius: "12px", backgroundColor: "#f5f5f5", borderColor: "primary.main" }}>
      <CardContent sx={{ borderColor: "primary.main" }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label-1" sx={{ textAlign: "center" }}>
            ABORDAJE
          </FormLabel>
          <br />
          {recogePreguntas.map((pregunta) => (
            <div key={pregunta.id}>
              <p>{pregunta.text}</p>
              <p>"{pregunta.prompt}"</p>
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
        <Button sx={{ mx: "auto" }} onClick={handleSubmit}>
          Guardar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Auditoria_Preguntas;

