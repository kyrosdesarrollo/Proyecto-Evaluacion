import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { useState } from "react";

export default function CargaAlert() {

  const [alertVisibility, setAlertVisibility] = useState(true);

  return(
    <Fade
       in={alertVisibility} //Write the needed condition here to make it appear
       timeout={{ enter: 100, exit: 2500 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setAlertVisibility(false)
         }, 2500);
       }}
       >
       <Alert severity="success" variant="standard" className="alert">
          <AlertTitle>Carga de archivo</AlertTitle>
             Registro cargado con éxito, próximo paso es la asignación a ejecutivo.
          </Alert>
    </Fade>
  )
}