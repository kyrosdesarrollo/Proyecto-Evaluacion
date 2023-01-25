
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Budget } from '../../components/dashboard/budget';
import { Container } from '@mui/material';
import { TotalCustomers } from '../../components/dashboard/total-customers';
import { TasksProgress } from '../../components/dashboard/tasks-progress';
import { TotalProfit } from '../../components/dashboard/total-profit';
import { Pauta1ConceptCatg } from './Pauta1ConcepCatg';
import { Pauta2Sub } from './Pauta2Sub';
import CollapsibleTable from './PautaGridTest3';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const PautaGridTest2 = () => {
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
              item lg={3} sm={6} xl={3} xs={12}
              >
                <Pauta1ConceptCatg />
              </Grid>
              <Grid
              item lg={3} sm={6} xl={3} xs={12}
              >
                <Pauta2Sub />
              </Grid>
              <Grid
              item lg={3} sm={6} xl={3} xs={12}
              >
                <TasksProgress />
              </Grid>
              <Grid
              item lg={3} sm={6} xl={3} xs={12}
              >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>

          {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid> */}
             
          </Grid>
         
        </Container>
            
          
      </Box>


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
              item lg={3} sm={6} xl={3} xs={12}
              >
                <Budget />
              </Grid>
              <Grid
              item lg={3} sm={6} xl={3} xs={12}
              >
                <TotalCustomers />
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
              item lg={3} sm={6} xl={3} xs={12}
              >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>

          {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid> */}
             
          </Grid>
         
        </Container>
            
          
      </Box>
   
    </>
  );
}