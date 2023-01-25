import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

export const Pauta1ConceptCatg = (props) => (
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
          <Avatar
            sx={{
              backgroundColor: 'greem',
              height: 56,
              width: 56
            }}
          >
            <ContentPasteGoIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography
            color="white"
            gutterBottom
            variant="h5"
          >
            CONECTA
          </Typography>
          <Typography
            color="white"
            variant="h4"
          >
            ABORDAGE
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