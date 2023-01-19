import React, {useMemo} from 'react'
import { ListItem, ListItemButton, ListItemIcon , Grid, ListItemText} from '@mui/material'


import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DescriptionIcon from '@mui/icons-material/Description';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BroadcastOnPersonalIcon from '@mui/icons-material/BroadcastOnPersonal';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { purple } from '@mui/material/colors';
import { purpleTheme } from '../../theme/purpleTheme';


export const SideBarItem = ({ title = '', body, id , date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickNote = ()=>{
        dispatch( setActiveNote({title , id, body,date,imageUrls}) );
    }

    const newTitle = useMemo(() =>{

        return title.length > 17
        ? title.substring(0,17) + '...'
        : title

    }, [title])

  return (
    <ListItem  disablePadding>
    <ListItemButton onClick = { onClickNote }>
        
        <ListItemIcon color="success" sx={{ color: purple[400] }} >
        {  newTitle == 'Dashboard' ?         <DashboardIcon  /> : '' }
        {  newTitle == 'Registro Usuario' ?  <SupervisedUserCircleIcon  /> : '' }
        {  newTitle == 'Acceso' ?            <SettingsApplicationsIcon  /> : '' }
        {  newTitle == 'Formulario' ?        <DescriptionIcon  /> : '' }
        {  newTitle == 'Ejecutivo' ?         <RecordVoiceOverIcon  /> : '' }
        {  newTitle == 'Campaña' ?           <BroadcastOnPersonalIcon  /> : '' }
        {  newTitle == 'Carga Excel' ?       <FileOpenIcon  /> : '' }
        {  newTitle == 'Pauta' ?             <AssignmentIcon  /> : '' }

        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ newTitle } />
            {/* <ListItemText secondary={ body } /> */}
        </Grid>
    </ListItemButton>
</ListItem>
  )
}
