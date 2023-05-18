import React from 'react';
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InteractiveMap from "../components/InteractiveMap";
import SliderWithToggle from "../components/Sliders";
import ItemFilter from "../components/HeatmapOptionDropdown"
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';
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


const WarehousePlanning = () => {
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
      title="Warehouse Planning"
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        gap: '20px',
        height: `calc(100vh - 200px)`
      }}>

        <Item sx={{
          gridArea: '1 / 1 / 5 / 5',
        }}>
          <BlurredBox type="Interactive heatmap" isBlurred={user.tier !== 'Ultimate'}>
            <InteractiveMap from_date={dateRange.from_date} to_date={dateRange.to_date} />
          </BlurredBox>
        </Item>

        <Item sx={{
          gridArea: '5 / 1 / 6 / 2'
        }}>
          Delivery Times
          <SliderWithToggle status={{ startStat: false }} num={{ value: 70 }} />
        </Item>
        <Item sx={{
          gridArea: '6 / 1 / 6 / 2'
        }}>
          Delivery Distance
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '5 / 2 / 6 / 2'
        }}>
          No. Deliveries
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '6 / 2 / 6 / 3'
        }}>
          No. units × Price
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '5 / 3 / 6 / 5'
        }}>
          ProductFilter
          <ItemFilter />
        </Item>

        <Item sx={{
          gridArea: '6 / 3 / 6 / 4'
        }}>
          Customer Buy volume
          <SliderWithToggle status={{ startStat: false }} num={{ value: 30 }} />
        </Item>

        <Item sx={{
          gridArea: '6 / 4 / 6 / 5'
        }}>
          Customer Revenue
          <SliderWithToggle status={{ startStat: false }} num={{ value: 90 }} />
        </Item>
      </Box>
    }
    </BasicPage>
  );
};

export default WarehousePlanning;
