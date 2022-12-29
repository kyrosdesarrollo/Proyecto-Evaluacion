import * as React from 'react';
import { useState, useEffect}  from 'react';

import { menuTotal } from '../../../__mocks__';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List } from '@mui/material';


export default function DespliegueDetalle({ nombre = '' }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    const [menuUsuario, setMenuUsuario] = useState([])

    useEffect(() => {
            const menus = menuTotal.find(( perfil => perfil.nombre === nombre));
            if (menus){ setMenuUsuario (menus.menuInicio)} 
    })
  return (
    <div>
     <Typography 
         variant="h6" 
         color="primary"
         >
        { nombre }
     </Typography>

    <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
         {
           menuUsuario.map( value => {
             return(
                    
                      
                        <Accordion 
                              key = { value.id} 
                              expanded={expanded === 'panel1'} 
                              onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography 
                           color= 'primary'
                           variant="h6" gutterBottom
                           sx={{ width: '33%', flexShrink: 0 }}
                           >
                          {value.nombre}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography
                                 gutterBottom>
                            {value.detalle}
                        </Typography>
                        </AccordionDetails>
                        </Accordion>
                  )     
              })
          }
      </List>

      
    </div>
  );
}