import React from 'react';
import { Add, FileUpload } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PortfolioCards from './PortfolioCard/PortfolioCard';
// firebase
import { AddDataToFirebase, GetDataFromFirebase } from '../../../firebase/function';
// toast
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Portfolio = () => {
  /* eslint-disable */
  const match = useMediaQuery('@media (max-width: 550px)');
  const customization = useSelector((state) => state.customization);
  const [file, setfile] = useState('');
  const [CardData, setCardData] = useState([]);
  const [onSuccess, setonSuccess] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: '',
    color: '',
    link: '',
    icnos: ''
  });
  const [Error, setError] = useState({
    link: '',
    name: '',
    icons: '',
    color: ''
  });
  const [IconsArray, setIconsArray] = useState([]);

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
    if (!formInputs.icnos) return [];
    setIconsArray([...IconsArray, { icon: formInputs.icnos, color: formInputs.color }]);
    setFormInputs({ ...formInputs, icnos: '', color: '' });
    document.getElementById('iconsInput').value = '';
  }

  function Submit() {
    const { link, name } = formInputs;
    if (!name) {
      toast.error('Please enter website name.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return setError({ name: 'Please enter website name.' });
    }

    if (!link) {
      toast.error('Please enter website link.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return setError({ link: 'Please enter website link.' });
    }

    if (IconsArray.length === 0) {
      toast.error('Please enter Icons name.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return setError({ icons: 'Please enter Icons name' });
    }
    setError({});

    if (!file) {
      toast.error('Please add one image.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }
    setError({});

    setisLoading(true);
    try {
      AddDataToFirebase('portfolio', { ...formInputs, file, icnosArray: IconsArray })
        .then((sucess) => {
          setisLoading(false);
          toast.success('Added To Database', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          setonSuccess(!onSuccess);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          setisLoading(false);
        });
    } catch (error) {
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      setisLoading(false);
    }
  }

  function getData() {
    GetDataFromFirebase('portfolio').then((res) => {
      res.forEach((data) => {
        console.log(data.data());
        setCardData((CardData) => [...CardData, { id: data.id, data: data.data() }]);
      });
    });
  }

  useEffect(() => {
    getData();
  }, [onSuccess]);

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
          error={Error?.name ? true : false}
          helperText={Error?.name}
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
          error={Error?.link ? true : false}
          helperText={Error?.link}
          required
        />
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <TextField
            id="iconsInput"
            error={Error?.icons ? true : false}
            onChange={(e) => setFormInputs({ ...formInputs, icnos: e.target.value })}
            sx={{ my: 1 }}
            type={'text'}
            label={'Icons Name'}
            color="secondary"
            // helperText={Error?.icons}
            required
          />
          <TextField
            error={Error?.icons ? true : false}
            onChange={(e) => setFormInputs({ ...formInputs, color: e.target.value })}
            sx={{ m: 1 }}
            type={'text'}
            label={'Icons Color'}
            color="secondary"
            // helperText={Error?.icons}
            required
          />
          {/* <IconButton color="secondary">
            <Add />
          </IconButton> */}
          <Button onClick={IconsName} variant="contained" color="secondary" size="large">
            {/* <IconButton color="secondary"> */}
            <Add />
            {/* </IconButton> */}
          </Button>
        </Box>
        <Box my={2}>
          {IconsArray.map((value, index) => {
            return <Chip sx={{ mx: 1 }} label={value.icon} key={index} variant="filled" color="secondary" size="small" />;
          })}
        </Box>
        <Typography variant="caption">fa, Io5, ai, md,si,tb</Typography>
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
            {CardData?.map((value) => {
              console.log(CardData);
              return (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <PortfolioCards
                    image={value?.data?.file}
                    icons={value?.data?.icnosArray}
                    link={value?.data?.link}
                    name={value?.data?.name}
                    customization={customization}
                  />
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
