import { Button } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { startLoadingUser } from '../../../store/auth';

export const RolPage = () => {

  const dispatch = useDispatch();

  const botton = () =>{
    dispatch(startLoadingUser());
  
  }

  return (
   <Button 
     variant="outlined"
     onClick={ botton}
   > Presion</Button>
  )
}


