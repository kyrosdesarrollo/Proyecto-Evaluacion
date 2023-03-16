import React, {useMemo} from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import Swal from 'sweetalert2'



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const AsignaciónActividadViewDetalle = ( { id = ''}) => {
    const [open, setOpen] = React.useState(false);

    const { formatos } = useSelector(state => state.formato);
    console.log('AsignaciónActividadViewDetalle')
    console.log(formatos[id]);

    const plantilla = Object.assign({},formatos[id]);
  
    const nombre = plantilla.nombre.displayName;
    const date = plantilla.date;
    const formato = plantilla.formato;
   
    const fechaString = useMemo(() => 
        {
                console.log({date});
                const newDate = new Date(date);
                return newDate.toLocaleString('en-CL');

        },[date]);

  const todoItems = Object.values(plantilla.detalle).map((todo, index) =>
  // Only do this if items have no stable IDs 
   <li key={index}>    {todo}
  </li>
  );


   
      console.log('Aqu va -->')

      console.log(todoItems);
   const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };
  const onGuardar = () =>{
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Asignación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const onEliminar = () =>{
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Eliminación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    })
  }
  return (
    <>
     <Stack spacing={2} direction="row">
       
       <Button 
         variant="contained"
         onClick={handleClickOpen}
             >Asignar a Monitores
       </Button>
       <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de asignar las actividades a los usuarios correspondientes ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de Asignar las actividad, a los usuarios correspondientes se activarán las notificaciones o podrán visualizar su información .
                                                Nota Importante: Los campos relevantes para realizar reporteria son los de cabecera.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={onGuardar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>


                                            <Button 
         variant="contained"
         color="error"
         onClick={handleClickOpen}
             >Eliminar archivo
       </Button>
       <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de eliminar el archivo ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de eliminar este archivo no habrá vuelta atrás , de igual modo deseas eliminar la información .
                                                Nota Importante: Los campos relevantes para realizar reporteria son los de cabecera.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={onGuardar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
      
   </Stack>
    <br></br>
      <Grid container spacing={2}>
              <Grid 
                   sm={8} md={4}>
                <Item>
                   <Typography variant= 'inherit' align= 'center' color= 'black' >{nombre} 
                   </Typography>
                </Item>
              </Grid>
              <Grid 
                sm={8} md={4}>
              <Typography variant= 'inherit' align= 'center' color= 'black'  >{fechaString} 
                   </Typography>
              </Grid>
              <Grid 
                 sm={8} md={4}>
              <Typography variant= 'inherit' align= 'center' color= 'black'  >{formato} 
                   </Typography>
              </Grid>
              
      </Grid>

      
        <Row>
                {/* <Label>{sheet}</Label> */}
                <Col md={12}>
                    <Table 
                    bordered 
                    className='border'
                    data-search="true"
                    >
                        <thead className='text-primary'>
                            <tr>
                            {plantilla.detalle[0].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                        { <tr>
                            {plantilla.detalle[1].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[2].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[3].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[4].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[5].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[6].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[7].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[8].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[9].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[10].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[11].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[12].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[13].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[14].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[15].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[16].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[17].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[18].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[19].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[20].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[21].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[22].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }
                        { <tr>
                            {plantilla.detalle[23].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        }

                        
                        </tbody>
                    </Table>
                </Col>
            </Row>
    </>
  )
}

export default AsignaciónActividadViewDetalle
