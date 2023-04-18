import React from 'react';
import Box from '@mui/material/Box';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const BlurredBox = ({type}) => {
  const navigate = useNavigate();
  
  return (
    <Tooltip
      title='You must upgrade your plan to view this stat!'
      placement="top"
      arrow
    >
      <Box sx={{
        display: 'block',
        position: 'relative',
      }}
      >
        <Box sx={{
          margin: '10px 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '90%',
          color: 'black',
          filter: 'blur(8px)'
        }}>
          <Box sx={{
            fontSize: '0.9rem',
            textAlign: 'left',
            paddingBottom: '10px'
          }}>
            Hidden
          </Box>
          <Box sx={{
            fontSize: '2rem',
            alignItems: 'center',
            flexGrow: 1,
          }}>
            00 minutes
          </Box>
          <Box sx={{
            fontSize: '0.8rem',
            color: 'green',
          }}>
            <ChangeHistoryOutlinedIcon sx={{
                color: 'green',
                fontSize: '0.8rem',
                verticalAlign: 'middle',
                paddingLeft: '5px',
                paddingBottom: '5px'
              }} />
            00.00%
          </Box>
          <Box sx={{
            fontSize: '0.7rem',
            color: 'grey'
          }}>
            12 months
          </Box>
        </Box>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'black',
          zIndex: 1,
        }}>
          <LockIcon fontSize='medium' />
          <Typography fontWeight='bold' variant="body1" sx={{
          }}>
            {type}
          </Typography>
          <Typography fontWeight='bold' variant="body1" sx={{
          }}>
            is locked.
          </Typography>
          <Button variant="contained" color="success" size='small' sx={{
              marginTop: '10px',
              color: 'white',
            }}
            onClick={() => navigate('/upgrade-account')}
          >
            Upgrade Now
          </Button>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default BlurredBox;

