	import React from 'react'
	import { useDispatch } from 'react-redux'
	import { AppBar , IconButton, Toolbar, Grid, Typography } from '@mui/material'
	import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
	
	import { startLogout } from '../../store/auth'
	
    export const NavBar = ({ drawerWidth = 240 }) => {

	const dispatch = useDispatch();

	const onLogout = () =>{
		dispatch( startLogout() );
	}

	  return (
	    
	    <AppBar 
	        position='fixed'
	        sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: {sm: `${ drawerWidth }px` }
            }}
	    >
	        <Toolbar>
					

	            <IconButton color='secondary' >
	                <MenuOutlined />
	            </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> Aplicación Evaluación</Typography>
                        <IconButton 
						   onClick = { onLogout }
						   color='secondary'>
                            <LogoutOutlined/>
							<Typography>Logout</Typography>
                        </IconButton>
                 </Grid>
	        </Toolbar>

            
	
	    </AppBar>
	  )
	}
