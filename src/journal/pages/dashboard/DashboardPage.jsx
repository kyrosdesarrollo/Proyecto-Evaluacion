
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { TasksProgress } from '../../components/dashboard/tasks-progress';
import { TotalProfit } from '../../components/dashboard/total-profit';
import RegistrosTotal from '../../components/dashboard/RegistrosTotal';
import Asignacion from '../../components/dashboard/Asignacion';
import Encuestas from '../../components/dashboard/Encuestas';
import Cierre from '../../components/dashboard/Cierre';
import Finalizado from '../../components/dashboard/Finalizado';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const DashboardPage = () => {
  return (
    <>
  
      <Box
      sx={{
        flexGrow: 1,
        py: 8
      }}>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
            >
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <RegistrosTotal />
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Asignacion />
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Encuestas />
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Cierre />
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Finalizado />
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <TasksProgress />
              </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>             
          </Grid>
         
        </Container>
            
          
      </Box>
   
    </>
  );
}