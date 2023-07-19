import React from 'react';
import { FileUpload } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardMedia, CircularProgress, Divider, Grid, TextField, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PortfolioCards from './PortfolioCard/PortfolioCard';

const Portfolio = () => {
  /* eslint-disable */
  const match = useMediaQuery('@media (max-width: 550px)');
  const customization = useSelector((state) => state.customization);
  const [file, setfile] = useState('');
  const [formInputs, setFormInputs] = useState({
    name: '',
    link: '',
    icnos: ''
  });

  const [isLoading, setisLoading] = useState(false);

  const Base64Encoder = (e) => {
    const image = e.target.files[0];
    const files = new FileReader();

    files.onloadend = (result) => {
      console.log(result);
      setfile(result.target.result);
    };

    files.readAsDataURL(image);
  };

  function IconsName() {
    if (!formInputs.icnos) return;

    if (formInputs.icnos.includes(',')) {
      let arr = formInputs.icnos.split(',');
      if (arr[arr.length - 1] === '') {
        return arr.splice(0, arr.length - 1);
      }
      return arr;
    } else {
      return [`${formInputs.icnos}`];
    }
  }
  function Submit() {
    const res = { ...formInputs, file, icnosArray: IconsName() };
    setisLoading(true);
    console.log(res);
  }
  return (
    <Box>
      <Box width={match ? '90%' : '500px'} mx={'auto'}>
        {!file ? (
          <Card sx={{ my: 1 }}>
            <CardActionArea sx={{ p: 0, m: 0 }}>
              <Box
                onClick={() => document.getElementById('file').click()}
                width={'100%'}
                border={1}
                color={'gray'}
                borderColor={'grey'}
                py={4}
                // my={1}
                borderRadius={`${customization.borderRadius}px`}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <FileUpload fontSize="large" />
                <TextField onChange={Base64Encoder} type={'file'} id="file" fullWidth sx={{ display: 'none' }} />
              </Box>
            </CardActionArea>
          </Card>
        ) : (
          <Card>
            <CardMedia sx={{ height: 220, objectFit: 'cover' }} image={file} />
          </Card>
        )}

        <TextField
          onChange={(e) => setFormInputs({ ...formInputs, name: e.target.value })}
          sx={{ my: 1 }}
          fullWidth
          type={'text'}
          label={'Enter Website Name'}
          color="secondary"
          required
        />
        <TextField
          onChange={(e) => setFormInputs({ ...formInputs, link: e.target.value })}
          sx={{ my: 1 }}
          fullWidth
          type={'text'}
          label={'Enter Website Link'}
          color="secondary"
          required
        />
        <TextField
          onChange={(e) => setFormInputs({ ...formInputs, icnos: e.target.value })}
          sx={{ my: 1 }}
          fullWidth
          multiline
          rows={5}
          type={'text'}
          label={'Icons Name'}
          color="secondary"
          required
        />
        <Box my={2} textAlign={'center'}>
          <Button onClick={Submit} variant="contained" color="secondary" size="large">
            {isLoading ? <CircularProgress color="inherit" /> : 'Submit'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Box mt={3} maxWidth={'1200px'} mx={'auto'}>
          <Grid container spacing={2}>
            {Array.from({ length: 9 }).map((value) => {
              return (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <PortfolioCards customization={customization} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Portfolio;
