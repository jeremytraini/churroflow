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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../hooks/useAuth";

// Inspired by https://mui.com/material-ui/getting-started/templates/pricing/
const tiers = [
  {
    title: 'Starter',
    price: '0',
    enabled: [
      'Upload, Store, Render, and Send 30 Invoices/Month',
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
    subheader: 'Reccomended for small businesses',
    price: '39.99',
    enabled: [
      'Upload, Store, Render, and Send 200 Invoices/Month',
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
    subheader: 'Reccomended for most SMEs',
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

const Dashboard = () => {
  const { user, setPlan } = useAuth();

  return (
  <BasicPage title="">
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 0, pb: 3 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Our Plans
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Be on top of your warehousing strategy and inventory with our premium features.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="center">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Standard' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Standard' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                    fontSize: 'small',
                    pt: 1,
                  }}
                  sx={{
                    backgroundColor: tier.title !== 'Standard' ? (theme) => theme.palette.grey[200] : (theme) => theme.palette.grey[300],
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
                    variant={user.tier === tier.title ? "outlined" : "contained"}
                    onClick={() => setPlan(tier.title)}
                  >
                    {user.tier === tier.title ? "Currently active" : "Select Plan"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </BasicPage>
  );
};

export default Dashboard;
