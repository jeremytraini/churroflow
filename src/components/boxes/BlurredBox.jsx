import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const BlurredBox = ({type, isBlurred, children}) => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{
      display: 'block',
    }}
    >
        {isBlurred
        ? <Tooltip
            title='You must upgrade your plan to view this!'
            placement="top"
            arrow
          >
            <Box sx={{
              display: 'block',
            }}
            >
              <Box sx={{
                height: '100%',
                filter: 'blur(8px)'
              }}>
                {children}
              </Box>
              <Box sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                margin: '0',
                width: '100%',
                height: '100%',
                color: 'black',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Box>
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
            </Box>
          </Tooltip>
        : <>
          {children}
          </>
        }
    </Box>
  );
};

export default BlurredBox;

