import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import { useSelector } from 'react-redux';

import React from 'react'

const Funcionarios = () => {

  const { funcionario } = useSelector(state => state.funcionario);
  let cantidadAsignaciones = funcionario[1].funcionarios.length;

  
  return (
    <>
     <Card
    sx={{ height: '100%' }}
    >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            FUNCIONARIOS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {cantidadAsignaciones}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'blueviolet',
              height: 56,
              width: 56
            }}
          >
            <SupervisedUserCircleRoundedIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
        
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Desde mayo 2023
        </Typography>
      </Box>
    </CardContent>
  </Card>
      
    </>
  )
}

export default Funcionarios
