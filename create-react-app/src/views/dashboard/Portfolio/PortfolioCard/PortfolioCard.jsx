/* eslint-disable */
import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardMedia, IconButton, Typography, useTheme } from '@mui/material';
import { ReactIcons } from '../utils/functions';
import { useSelector } from 'react-redux';
const PortfolioCard = ({ image, icons, link, name }) => {
  const customization = useSelector((state) => state.customization);

  const theme = useTheme();
  return (
    <Card variant="elevation" sx={{ borderColor: theme.palette.secondary.main, position: 'relative' }}>
      <CardActionArea>
        <Box width={'100%'} height={'100%'}>
          <CardMedia sx={{ height: 220 }} image={image} title={name} />
        </Box>
        <Box
          sx={{
            width: '100%',
            top: 0,
            height: '100%',
            position: 'absolute',
            zIndex: 9,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'start',
            py: 1,
            px: 2,
            flexDirection: 'column',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 300px)'
          }}
        >
          <Typography
            variant="h4"
            fontSize="lg"
            color="#fff"
            // mb={1}
            fontFamily={customization.fontFamily}
          >
            {name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {icons.length > 0 &&
              icons.map((value, index) => {
                return (
                  <IconButton
                    key={index}
                    sx={{
                      '&>svg': {
                        width: 25,
                        height: 25
                      },
                      fontWeight: 600,
                      color: value.color
                    }}
                  >
                    {React.createElement(ReactIcons(value.icon))}
                  </IconButton>
                );
              })}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default PortfolioCard;
