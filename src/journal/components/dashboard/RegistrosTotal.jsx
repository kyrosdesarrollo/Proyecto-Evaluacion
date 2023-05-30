import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

import { useSelector } from 'react-redux';

import React from 'react'

const RegistrosTotal = () => {

  const { formatos } = useSelector(state => state.formato);
  const cantidadRegistros = formatos.length;

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
            DOCUMENTOS ACTUALES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {cantidadRegistros}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'skyblue',
              height: 56,
              width: 56
            }}
          >
            <AssignmentRoundedIcon />
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
          100%
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

export default RegistrosTotal
