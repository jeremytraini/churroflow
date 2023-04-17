import React from 'react';
import { BasicPage } from "./BasicPage";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

// Inspired by https://mui.com/material-ui/getting-started/templates/pricing/
const tiers = [
  {
    title: 'Starter',
    price: '0',
    description: [
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
    ],
    buttonText: 'Currently Active',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Reccomended for small businesses',
    price: '15',
    description: [
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
    ],
    buttonText: 'Upgrade now',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
      '100 invoices uploaded',
    ],
    buttonText: 'Try it out',
    buttonVariant: 'outlined',
  },
];

const Dashboard = () => {
  return (
  <BasicPage title="Upgrade Your Account">
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline />
    {/* Hero unit */}
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        ChurroFlow Plans
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Be on top of your warehousing strategy and inventory with our premium features.
      </Typography>
    </Container>
    {/* End hero unit */}
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={tier.title === 'Pro' ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: 'center',
                  fontSize: 'small',
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </BasicPage>
  );
};

export default Dashboard;

