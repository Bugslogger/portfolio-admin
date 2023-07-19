import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import Table from './Table';

const Contact = () => {
  return (
    <Box>
      <Typography variant='h2' my={2}>Client Message</Typography>
      <Card elevation={8}>
        <Table />
      </Card>
      
    </Box>
  );
};

export default Contact;
