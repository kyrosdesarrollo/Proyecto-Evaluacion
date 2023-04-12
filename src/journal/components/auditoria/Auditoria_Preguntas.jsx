import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


export default function Auditoria_Preguntas({pautasSeleccion}) {


   
   const { pautas } = useSelector(state => state.pauta);
    //Limpiamos variable
    let nombrePauta = pautasSeleccion.replace(/"/g, '');;
    // Variable para almacenar los objetos encontrados
    const objetosEncontrados = [];
    // Recorremos el arreglo y buscamos objetos con el formato ejemplo : "PARLO FRAUDE"
    pautas.forEach((objeto, indice) => {
      if (objeto.formato === nombrePauta) {
        objetosEncontrados.push(objeto);
      }
    });

    const pauta = JSON.stringify(objetosEncontrados);
    const arreglo = JSON.parse(pauta);
    console.log('Arreglo paua')
    console.log(arreglo)
    let detalleJson = arreglo[0].detalleJson;
    console.log('Detalle Json')
    console.log(detalleJson)
    console.log('Cantidad : ')
console.log(arreglo[0].detalleJson.length)

    //console.log(arreglo[0].detalleJson[recorrer]);
    for (let i = 0; i < arreglo[0].detalleJson.length; i++) {
      //console.log(arreglo[0].datalleJson[i]);

      let bloques = arreglo[0].detalleJson[i]["CONDUCTA"].trim();
      console.log('CONDUCTA')
      console.log(bloques)

      
      let bloques1 = arreglo[0].detalleJson[i]["CATEGORÍA"].trim();
      console.log('CATEGORÍA')
      console.log(bloques1)

      let bloques2 = arreglo[0].detalleJson[i]["BLOQUES DE EVALUACIÓN"].trim();
      console.log('BLOQUES  DE EVALUACIÓN')
      console.log(bloques2)
   
    }


    let bloques = arreglo[0].detalleJson[0]["CONDUCTA"].trim();
    console.log('Aqu esta Sin esapcios')
    console.log(bloques)
    // const elementosCabecera = arreglo[0].datalleJson.map((elemento, index) => (
    //   <div key={index}>
    //     <p>{elemento}</p>
    //   </div>
    // ));

  return (
    <>
    {/* {elementosCabecera} */}
    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f5f5f5', borderColor: 'primary.main'  }}>
      <CardContent sx={{borderColor: 'primary.main'}}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label-1" sx={{ textAlign: "center" }}>ABORDAJE</FormLabel>
          <br />
          <p>Pregunta 1: Velocidad al contestar</p>
          <p>"Atención inmediata del chat: Saluda al Cliente en un tiempo máximo de 1 
            minuto si contesta en un tiempo igual o mayor 4 minutos será un quiebre parcial."</p>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label-1" name="radio-buttons-group-1">
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <p></p>
          <p></p>
          <p>Pregunta 2: Saludo e identificación </p>
          <p></p>
          "Saluda al cliente: ""¡Hola! Soy (nombre ejecutivo), estaré a cargo de atender tu solicitud. Puedes usar el atajo: /saludo
          Si es un rechateo debes continuar con la atención, usando el siguiente script: ""¡Hola! Soy (nombre ejecutivo) voy a continuar con tu atención 😊.
            Si es una derivación de otro grupo, solo debes continuar la atención, sin saludar."?
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label-2" name="radio-buttons-group-2">
            <FormControlLabel value="2SI" control={<Radio />} label="SI" />
            <FormControlLabel value="2NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <p></p>
          <p></p>
         
          <p>Pregunta 3: Validación </p>
          "Toda atención en la que se entregue información privada de la cuenta del cliente debe estar autentificada, el ejecutivo debe respaldarse por la autenticación del Bot o Equifax (ver matriz de validación). Si se entrega información sin validar sera un quiebre total.
            Equifax: Ejecutivo debe utilizar el protocolo de validación equifax: ""Para continuar y por tu seguridad, necesito hacerte unas preguntas de validación, ¿estás de acuerdo?"", ""Como respondiste correctamente a las preguntas de validación, podemos continuar"", ""No has pasado el proceso de validación, por procedimiento y por tu seguridad, no podemos continuar con la atención, si nos vuelves a contactar desde tu sitio privado, ya vas a estar validado y podemos realizar la gestión.
            BOT: Si el cliente ingresa logueado por el BOT, ejecutivo debe aplicar el atajo ""Dado que entraste validado podemos continuar con tu atención"".
            Consultas genericas no requieren validación para ser atendidas."
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label-3" name="radio-buttons-group-3">
            <FormControlLabel value="3SI" control={<Radio />} label="SI" />
            <FormControlLabel value="3NO" control={<Radio />} label="NO" />
          </RadioGroup>

        </FormControl>
        <br/>
        
        <Button  sx={{ mx: "auto" }}>Siguiente</Button>
       
      </CardContent>
            
    </Card>
    </>
  );
}
