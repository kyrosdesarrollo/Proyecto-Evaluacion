import React, {useMemo} from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import Swal from 'sweetalert2'

import SortingTable from './SortingTable';
import FilteringTable from './FilteringTable';
import BasicTable from './BasicTable';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const AsignaciónActividadViewDetalle = ( { id = ''}) => {
    const [open, setOpen] = React.useState(false);
    const [openEliminar, setOpenEliminar] = React.useState(false);

    const { formatos } = useSelector(state => state.formato);
    console.log('AsignaciónActividadViewDetalle')
    console.log(formatos[id]);
    
    const plantilla = Object.assign({},formatos[id]);
  
    // const nombre = plantilla.nombre.displayName;
    // const date = plantilla.date;
    // const formato = plantilla.formato;

    const nombre = "Nleson";
    const date = "10010101";
    const formato = "sss";
  

  
    
   
    const fechaString = useMemo(() => 
        {
                console.log({date});
                const newDate = new Date(date);
                return newDate.toLocaleString('en-CL');

        },[date]);

        const arregloDetalle = [];
        Object.keys(plantilla.detalle).forEach((e) => { 
            arregloDetalle.push(plantilla.detalle[e]);
        });
 
        console.log('Aqui esta el detalle de formato 1 -->'+ id);
        console.log(formatos[id].detalle);
        console.log('Aqui esta el detalle de formato 2 -->');
        console.log(plantilla.detalle);
   const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };
  const handleClickOpenEliminar = () => {
    setOpenEliminar(true);
};

const handleCloseEliminar = () => {
  setOpenEliminar(false);
};
  const onGuardar = () =>{
    handleClose();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Asignación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const onEliminar = () =>{
    handleCloseEliminar();
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
                                                Al momento de Asignar las actividad, a los usuarios se activarán las notificaciones o podrán visualizar su información .
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
         onClick={handleClickOpenEliminar}
             >Eliminar archivo
       </Button>
       <Dialog
                                                open={openEliminar}
                                                onClose={handleCloseEliminar}
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
                                                <Button onClick={handleCloseEliminar}>No</Button>
                                                <Button onClick={onEliminar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
      
   </Stack>
    <br></br>
      <Grid container spacing={2}>
              <Grid 
                   >
                <Item>
                   <Typography variant= 'inherit' align= 'center' color= 'black' >{nombre} 
                   </Typography>
                </Item>
              </Grid>
              <Grid 
                >
              <Typography variant= 'inherit' align= 'center' color= 'black'  >{fechaString} 
                   </Typography>
              </Grid>
              <Grid 
                  >
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
                    hover
                    
                    >
                        <thead className='text-primary'>
                            <tr >
                            {arregloDetalle[0].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                        {arregloDetalle.slice(1).map((row)=> (
                                <tr key={row} >
                                    {row.map( c => <td key={c} >{c}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

           
            {/* <BasicTable />
            <SortingTable/> */}
            <FilteringTable />
            
          
    </>
  )
}

export default AsignaciónActividadViewDetalle
