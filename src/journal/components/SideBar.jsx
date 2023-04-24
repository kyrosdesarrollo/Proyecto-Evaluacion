import React from 'react'
import { useSelector } from 'react-redux';
import { Box, Divider, Drawer, List, ListItemText, 
        Toolbar, Typography } from '@mui/material'
import { SideBarItem } from '.';


export const SideBar = ({ drawerWidth = 240 }) => {
    const { displayName, perfil } = useSelector( state => state.auth);
    const { notes } = useSelector(state => state.journal);
    const { menus } = useSelector(state => state.menu);

  return (
    <Box
        component='nav'
        sx={ { width: { sm: drawerWidth }, flexShrink: { sm:0 }} }
    >
        <Drawer
           variant= 'permanent'
           open
           sx={{
               display: { xs: 'block' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
           }}
          >

           <Toolbar>
               <Typography variant='h6' noWrap component='div' >
                 { displayName } 
               </Typography>
           </Toolbar>

           <Divider />
           <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note} />
                    ))
                }
            </List>

            <List>
                {
                    menus.map( note => (
                        <ListItemText key={note.id}> {nombre} </ListItemText>
                        
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
