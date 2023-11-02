import React from 'react';
import { Navigate } from 'react-router-dom';
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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';

// Inspired by https://mui.com/material-ui/getting-started/templates/pricing/
const tiers = [
  {
    title: 'Starter',
    price: '0',
    enabled: [
      'Upload, Store, Render, and Send 15 Invoices',
      'Invoice Data Manager',
    ],
    disabled: [
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
  },
  {
    title: 'Standard',
    price: '39.99',
    enabled: [
      'Upload, Store, Render, and Send 200 Invoices',
      'Invoice Data Manager',
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
    ],
    disabled: [
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
  },
  {
    title: 'Ultimate',
    subheader: 'Our Most Popular Plan',
    price: '79.99',
    enabled: [
      'Upload, Store, Render, and Send Unlimited Invoices',
      'Invoice Data Manager',
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
    disabled: [],
  },
];

const Plan = () => {
  return (
    <div id="plans"  className="text-center">
      <CssBaseline />
      <div className="section-title">
        <h2>Plans</h2>
        <p>
          Be on top of your warehousing strategy and inventory with our premium features.
        </p>
      </div>
      <div className="container">
        <Grid container spacing={5} alignItems="flex-end" marginBottom={5}>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Ultimate' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Ultimate' ? <StarIcon /> : null}
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
                    {tier.enabled.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={line}
                      >
                        <Grid style={{ display: "flex" }}>
                            <DoneIcon />
                            <Typography>{line}</Typography>
                        </Grid>
                      </Typography>
                    ))}
                  </ul>
                  <ul>
                    {tier.disabled.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={line}
                      >
                        <Grid style={{ display: "flex", opacity: 0.5}}>
                            <CloseIcon />
                            <Typography>{line}</Typography>
                        </Grid>
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={"contained"}
                    onClick={() => <Navigate to="/register" />}
                  >
                    <Link color="inherit" href="/register">
                      Sign up now
                    </Link>{' '}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
  </div>
  );
};

export default Plan;
