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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HiveIcon from '@mui/icons-material/Hive';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { blue } from '@mui/material/colors';

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
        
        <ListItemIcon color="success" sx={{ color: blue[400] }} >
        {  newTitle == 'Dashboard' ?         <DashboardIcon  /> : '' }
        {  newTitle == 'Registro Usuario' ?  <SupervisedUserCircleIcon  /> : '' }
        {  newTitle == 'Acceso' ?            <SettingsApplicationsIcon  /> : '' }
        {  newTitle == 'Formulario' ?        <DescriptionIcon  /> : '' }
        {  newTitle == 'Funcionario' ?         <RecordVoiceOverIcon  /> : '' }
        {  newTitle == 'Campaña' ?           <BroadcastOnPersonalIcon  /> : '' }
        {  newTitle == 'Carga Excel' ?       <CloudDownloadIcon  /> : '' }
        {  newTitle == 'Pauta' ?             <AccountTreeIcon  /> : '' }
        {  newTitle == 'Asignación' ?        <GroupAddIcon  /> : '' }
        {  newTitle == 'Cierre' ?            <HiveIcon  /> : '' }
        {  newTitle == 'Informes' ?          <AssessmentTwoToneIcon  /> : '' }
        {  newTitle == 'Auditoría' ?         <VideoLabelIcon  /> : '' }

        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ newTitle } />
            {/* <ListItemText secondary={ body } /> */}
        </Grid>
    </ListItemButton>
</ListItem>
  )
}
