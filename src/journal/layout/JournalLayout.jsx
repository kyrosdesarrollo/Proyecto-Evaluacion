import React from 'react';	
import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

    const drawerWidth = 240;
	
	export const JournalLayout = ({ children }) => {
	  return (
	    <Box sx={{ display:'flex' }} className='animate__animated animate__fadeIn animate__faster' >
	        
	        {/* Incorporar Navbar  drawerWidth*/}
            <NavBar drawerWidth = { drawerWidth }  />
	
	        {/* Incorporar Sidebar drawerWidth*/}
			<SideBar drawerWidth = { drawerWidth } />
	        <Box
	         component='main'
	         sx={{ flegrow: 1, p:3 }}
	        >
	            {/* Ingresar Toolbar */}

			<Toolbar />
	
            { children }

	        </Box>
	
	    </Box>
	  )
	}
