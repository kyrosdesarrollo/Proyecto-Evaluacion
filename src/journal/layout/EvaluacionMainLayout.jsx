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
import { Grid } from '@mui/material';
import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth';
import { SideBarItem } from '../components';
import GetLayoutMain from '../views/GetLayoutMain';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { orange } from '@mui/material/colors'
import { startNewNote } from '../../store/journal';
import { DashboardPage } from '../pages/dashboard/DashboardPage';


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
  
  const { displayName, uid } = useSelector( state => state.auth);
  const { notes , active, isSaving } = useSelector(state => state.journal);
  
  
  const numero = notes;
  
  const dispatch = useDispatch();
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
                    <Typography variant='h6' noWrap component='div'> Aplicación Evaluación</Typography>
                        <IconButton 
						   onClick = { onLogout }
						   color='secondary'>
                            <LogoutOutlined/>
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
            <Box
            sx={{
              alignItems: 'center',
            
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1
            }}>
                <Typography variant= 'inherit' align= 'justify' color= 'black' >{ displayName }</Typography>
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

        {/* {
        (!!menus) 
              ? ( <List>
                   Hola
                 </List> )
              : <ListItemText> Chao</ListItemText>
        } */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {
            (numero.length > 0) 
                 ?   (!!active) 
                      ? <GetLayoutMain pagina = { active.title }  />
                      : <DashboardPage />
                  : <GetLayoutMain pagina = "Inicio"  />
                //  : <DashboardPage  />
          }
       
      </Box>

       {/* <IconButton
            onClick = { onClickNewNote }
            size='large'
            disabled= { isSaving }
            sx={{
              color: 'white',
              backgroundColor: orange.A400,
              ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
              position: 'fixed',
              right: 50,
              bottom: 50
            }}
           >
            <AddBoxOutlined sx={{ fontSize: 55 }} />
           
          </IconButton> */}
    </Box>
    </>
  );
}