import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

export const Pauta2Sub = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
        backgroundColor = 'blue'
      >
        
        <Grid item>
          <Typography
            color="white"
            gutterBottom
            variant="h5"
          >
            Tiempo de acceso 
          </Typography>
        </Grid>
        
       
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
        backgroundColor = 'blue'
      >
        
        <Grid item>
          <Typography
            color="white"
            gutterBottom
            variant="h5"
          >
            Saludo
          </Typography>
        </Grid>
        
       
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
        backgroundColor = 'blue'
      >
        
        <Grid item>
          <Typography
            color="white"
            gutterBottom
            variant="h5"
          >
            Validación
          </Typography>
        </Grid>
        
       
      </Grid>
      {/* <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Desde enero 2022
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
);