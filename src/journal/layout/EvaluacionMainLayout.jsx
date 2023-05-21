import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { Badge, Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth';
import { SideBarItem } from '../components';
import GetLayoutMain from '../views/GetLayoutMain';

import { startNewNote } from '../../store/journal';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Swal from 'sweetalert2'

import Logo from '../../assets/image/Logo.png'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const EvaluacionMainLayout = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const { displayName } = useSelector( state => state.auth);
  const { notes , active } = useSelector(state => state.journal);
  const { perfil, estado } = useSelector(state => state.perfil);
  const { formatos } = useSelector(state => state.formato);

  const dispatch = useDispatch();

  let cantidadArchivos = 0, cantidadRegistros=0;
  if (estado === 'Inactivo') {

    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'error',
    //   title: 'No posee permiso, contactar a su administrador',
    //   showConfirmButton: false,
    //   timer: 1500
    // })

    let timerInterval;
Swal.fire({
  title: 'Usuario Bloqueado !!!',
  html: 'No cuentas con autorización, favor contactar a su administrador Gracias !!',
  timer: 7000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const container = Swal.getHtmlContainer();
    const b = container ? container.querySelector('b') : null;

    if (b) {
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    }
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  // /* Read more about handling dismissals below */
  // if (result.dismiss === Swal.DismissReason.timer) {
  //   //Swal.fire('Usuario bloqueado')
  //   Swal.fire({
  //     title: 'Custom width, padding, color, background.',
  //     width: 600,
  //     padding: '3em',
  //     color: '#716add',
  //     background: '#fff url(/images/trees.png)',
  //     backdrop: `
  //       rgba(0,0,123,0.4)
  //       url("/images/nyan-cat.gif")
  //       left top
  //       no-repeat
  //     `
  //   })
  // }
});

   // Swal.fire('Usuario bloqueado')
    dispatch( startLogout() );
    // window.location.reload();
  }
  
  if (perfil === "ADMINISTRADOR" || perfil === "CALIDAD") {
    cantidadArchivos = formatos.length;

    for (let i = 0; i < formatos.length; i++) {
      const lines = formatos[i].detalleJson.length;
      //console.log(`El formato ${i + 1} tiene ${lines} líneas.`);
      cantidadRegistros += lines;
    }
  }else if (perfil === "MONITOR") {
    formatos.forEach(elemento => {
      const detalleJson = elemento.detalleJson;
      let contieneMonitor = false;
      for (let i = 0; i < detalleJson.length; i++) {
        if (detalleJson[i].Monitor === displayName && detalleJson[i].Estado === "Asigna") {
          cantidadRegistros++;
          contieneMonitor = true;
        }
      }
      if (contieneMonitor) {
        cantidadArchivos++;
      }
    })
  }
  const numero = notes;
  //dispatch(loadMenus(uid));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onLogout = () =>{
    dispatch( startLogout() );
  }
  const onClickNewNote =()=>{
    dispatch(startNewNote());
  }
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'flow' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography 
                      variant='h6' 
                      noWrap component='div'>
                      Evaluación 2CALL</Typography>
                     <Typography 
                      variant='h7' 
                      noWrap component='div'>
                      {perfil} </Typography>

                   <Box
                    mt={2}
                   >
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      
                    >
                     <Badge badgeContent={cantidadArchivos} color="error">
                        <AssignmentIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      
                    >
                     <Badge badgeContent={cantidadRegistros} color="error">
                        <CallRoundedIcon />
                      </Badge>
                    </IconButton>
                    </Box>
                    <IconButton 
                    onClick = { onLogout }
                    color='secondary'>
                      <ExitToAppTwoToneIcon/>
                    <Typography>Salir</Typography>
                              </IconButton>
        </Grid>
        </Toolbar>
      </AppBar>
      <Drawer 
          variant="permanent" 
          open={open}
          >
              
        <DrawerHeader>
        <Box sx={{ px: 2 }}>
            <Box>
            <img src={Logo} />
            </Box>
            <Box
            sx={{
              alignItems: 'center',
            
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-around',
              px: 3,
              py: '1px',
              borderRadius: 100
            }}>
               
                <Typography variant= 'inherit' align= 'center' color= 'black' >{ displayName } </Typography>
                  <IconButton onClick={handleDrawerClose} align = 'left'>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                  
             </Box>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note} />
                    ))
                }
            </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 0.1, p: 2 }}>
        <DrawerHeader />
        {
            (numero.length > 0) 
                 ?   (!!active) 
                      ? <GetLayoutMain pagina = { active.title }  />
                      : <DashboardPage />
                  : <GetLayoutMain pagina = "Inicio"  />
          }
       
      </Box>
    </Box>
    </>
  );
}