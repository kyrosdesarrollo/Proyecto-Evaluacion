import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function createData(name) {
  return { name };
}
const rows = [
  createData('Conecta'),
  createData('Comprende'),
  createData('Compromete'),
  createData('Cierre'),

];

export default function PautaGridConcepto() {
  const concepto = rows;
  console.log(concepto.length);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid 
        container 
        spacing={{ xs: 1, md: 1 }} 
        columns={{ xs: 1, sm: 1, md: 1 }}>
        {concepto.map( concepto => (
          <Grid 
            item 
                xs={2} 
                sm={4} 
                md={4} 
            key={concepto.name}>
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
                <Typography variant="h1" color="initial"> 
                  <Item> 
                        { concepto.name }
                  </Item>
                </Typography>
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Typography variant="h1" color="initial"> Hola 1</Typography>
              </Grid>
              <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
              >
                <Typography variant="h1" color="initial"> Hola 1</Typography>
              </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Typography variant="h1" color="initial"> Hola 1</Typography>
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
            
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}