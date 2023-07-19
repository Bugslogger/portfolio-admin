import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h2">About Me</Typography>
              <Box sx={{ my: 2 }}></Box>
              <TextField fullWidth label="About myself" multiline rows={12} color="secondary" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h2">Work</Typography>
              <Box textAlign={'center'} sx={{ my: 2 }}>
                <TextField fullWidth sx={{ my: 1 }} label="Company Name" color="secondary" />
                <TextField fullWidth sx={{ my: 1 }} label="Role" color="secondary" />
                <Button sx={{ my: 1 }} variant="contained" color="secondary">
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h2">About Me</Typography>
              <Box sx={{ my: 2 }}></Box>
              <TextField fullWidth label="About myself" multiline rows={12} color="secondary" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
