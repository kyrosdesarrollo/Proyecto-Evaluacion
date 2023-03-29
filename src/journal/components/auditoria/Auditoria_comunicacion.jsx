import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';


export default function Auditoria_comunicacion() {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f5f5f5', borderColor: 'primary.main'  }}>
      <CardContent sx={{borderColor: 'primary.main'}}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label-1" sx={{ textAlign: "center" }}>test</FormLabel>
          <br />
          <p>Pregunta 1: Velocidad al contestar</p>
          <p>"Atención inmediata del chat: Saluda al Cliente en un tiempo máximo de 1 
            minuto si contesta en un tiempo igual o mayor 4 minutos será un quiebre parcial."</p>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label-1" name="radio-buttons-group-1">
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
                 </FormControl>
        
      </CardContent>
    
    </Card>
    
  );
}
