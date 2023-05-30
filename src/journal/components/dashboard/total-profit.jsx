import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

export const TotalProfit = (props) => (
  <Card {...props}>
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
            TOTAL CAMPAÑA
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            4
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <CampaignRoundedIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
