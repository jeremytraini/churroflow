import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import InteractiveMap from "../components/InteractiveMap";
import BlurredBox from '../components/boxes/BlurredBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const { user } = useAuth();
  const [ sampleFrom, setSampleFrom ] = React.useState("All time");

  const [ dateRange, setDateRange ] = React.useState(null);

  React.useEffect(() => {
    if (sampleFrom === "All time") {
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);
      setDateRange({
        from_date: fiveYearsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 3 months") {
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      setDateRange({
        from_date: threeMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 6 months") {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      setDateRange({
        from_date: sixMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 12 months") {
      const today = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(today.getMonth() - 12);
      setDateRange({
        from_date: twelveMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    }
  }, [sampleFrom]);

  return (
  <BasicPage
    title="Dashboard"
    action={
      <Select
        value={sampleFrom}
        onChange={(e) => setSampleFrom(e.target.value)}
        size="small"
        sx={{ color: 'grey', backgroundColor: 'white' }}
      >
        <MenuItem value="All time">All time</MenuItem>
        <MenuItem value="Last 3 months">Last 3 months</MenuItem>
        <MenuItem value="Last 6 months">Last 6 months</MenuItem>
        <MenuItem value="Last 12 months">Last 12 months</MenuItem>
      </Select>
    }
  >
  {dateRange &&
    <Box sx={{
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr',
      gap: '20px',
      maxHeight: `calc(100vh - 200px)`
      }}>
      <Item sx={{
        gridArea: '1 / 1 / 2 / 2'
      }}>
        <StatisticBox type="numActiveCustomers" from_date={dateRange.from_date} to_date={dateRange.to_date} />
      </Item>

      <Item sx={{
        gridArea: '1 / 2 / 2 / 3'
      }}>
        <StatisticBox type="numInvoices" from_date={dateRange.from_date} to_date={dateRange.to_date} />
      </Item>

      <Item sx={{
        gridArea: '2 / 1 / 3 / 2'
      }}>
        <BlurredBox type="Average delivery time stat" isBlurred={user.tier === 'Starter'}>
          <StatisticBox type="averageDeliveryTime" from_date={dateRange.from_date} to_date={dateRange.to_date} />
        </BlurredBox>
      </Item>

      <Item sx={{
        gridArea: '2 / 2 / 3 / 3'
      }}>
        <BlurredBox type="Average delivery distance stat" isBlurred={user.tier === 'Starter'}>
          <StatisticBox type="avgDeliveryDistance" from_date={dateRange.from_date} to_date={dateRange.to_date} />
        </BlurredBox>
      </Item>

      <Item sx={{
        gridArea: '1 / 3 / 3 / 5'
      }}>
        <BlurredBox type="Interactive heatmap" isBlurred={user.tier === 'Starter'}>
          <InteractiveMap from_date={dateRange.from_date} to_date={dateRange.to_date} />
        </BlurredBox>
      </Item>

      <Item sx={{
        gridArea: '3 / 1 / 5 / 3'
      }}>
      <DataTableBox type="clientDataTable" from_date={dateRange.from_date} to_date={dateRange.to_date} />
      </Item>

      <Item sx={{
        gridArea: '3 / 3 / 5 / 5'
      }}>
      <BlurredBox type="Suburb data table" isBlurred={user.tier !== 'Ultimate'}>
        <DataTableBox type="suburbDataTable" from_date={dateRange.from_date} to_date={dateRange.to_date} />
      </BlurredBox>
      </Item>
    </Box>
    }
  </BasicPage>
  );
};

export default Dashboard;
