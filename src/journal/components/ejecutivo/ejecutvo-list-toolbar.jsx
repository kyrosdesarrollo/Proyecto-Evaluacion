import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { EjecutivoCrear } from './ejecutivo-list-crear';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EjecutivosListToolbar = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return(

  <Box >
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Ejecutivos
      </Typography>
      <Box sx={{ m: 1 }}>
       
      <Button
          color="primary"
          variant="contained"
          sx={{
            alignItems: 'center',
           
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: 3
          }}
          onClick={handleOpen}
        >
          Crear Ejecutvo
        </Button>
        <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Creación de Ejecutivo
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   <EjecutivoCrear />
                </Typography>
              </Box>
        </Modal>
       
        <Button
          color="error"
          variant="contained"
          sx={{
            alignItems: 'center',
            
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: 3
          }}
        >
          Eliminar Ejecutivo
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon> */}
                  </InputAdornment>
                )
              }}
              placeholder="Busqueda de empleados"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)

}



