import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HiveIcon from '@mui/icons-material/Hive';
import { useSelector } from 'react-redux';

import React from 'react'

const Cierre = () => {

  const { formatos } = useSelector(state => state.formato);
  let cantidadAsignaciones = 0;

  formatos.forEach(formato => {
    formato.detalleJson.forEach(item => {

      if (item.Estado === 'Cierre') {
        cantidadAsignaciones++;
      }
    });
  });
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
            ENCUESTAS POR CERRAR
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
              backgroundColor: 'red',
              height: 56,
              width: 56
            }}
          >
            <HiveIcon />
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
        <ArrowUpwardRoundedIcon color="success" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          5%
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

export default Cierre
