import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AddDataToFirebase, DownloadImage, SendSingleDataToFirebase, uploadFiles } from '../../../firebase/function';
import Editor from './Editor';

const About = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [about, setabout] = useState('');
  const [resumeupload, setresumeupload] = useState('');

  const workForrm = useFormik({
    initialValues: {
      name: '',
      role: '',
      from: '',
      to: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      role: Yup.string().required(),
      from: Yup.date().required(),
      to: Yup.date()
    }),
    onSubmit: (values) => {
      console.log(values);
      setisLoading(true);
      try {
        AddDataToFirebase('companies', values)
          .then(() => {
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
            workForrm.handleReset();
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
        console.log(error);
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
  });

  const Change = (event, editor) => {
    const data = editor.getData();
    setabout(data);
    // console.log({ event, editor, data });
  };

  function About() {
    if (!about) {
      toast.error('About can not be empty.', {
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
    setisLoading2(true);
    try {
      SendSingleDataToFirebase('about',"about-id", { about })
        .then(() => {
          setisLoading2(false);
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
          workForrm.handleReset();
        })
        .catch((err) => {
          console.log(err);
          setisLoading2(false);

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
          setisLoading2(false);
        });
    } catch (error) {
      console.log(error);
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

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h2">About Me</Typography>
                <Button onClick={About} color="secondary" variant="outlined" size="large">
                  {isLoading2 ? <CircularProgress /> : 'Post'}
                </Button>
              </Box>
              <Box sx={{ my: 2 }}></Box>
              <Editor OnDataChange={Change} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h2">Work</Typography>
              <Box textAlign={'center'} sx={{ my: 2 }}>
                <TextField
                  name="name"
                  error={workForrm.errors.name && workForrm.touched.name ? true : false}
                  onChange={workForrm.handleChange}
                  value={workForrm.values.name}
                  onBlur={workForrm.handleBlur}
                  fullWidth
                  sx={{ my: 1 }}
                  label="Company Name"
                  color="secondary"
                />
                <TextField
                  error={workForrm.errors.role && workForrm.touched.role ? true : false}
                  name="role"
                  onChange={workForrm.handleChange}
                  value={workForrm.values.role}
                  onBlur={workForrm.handleBlur}
                  fullWidth
                  sx={{ my: 1 }}
                  label="Role"
                  color="secondary"
                />
                <Box my={1} display={'flex'}>
                  <Box textAlign={'left'} mx={1}>
                    <Typography variant="caption">from:</Typography>
                    <Box>
                      <TextField
                        name="from"
                        error={workForrm.errors.from && workForrm.touched.from ? true : false}
                        onChange={workForrm.handleChange}
                        value={workForrm.values.from}
                        onBlur={workForrm.handleBlur}
                        type="date"
                      />
                    </Box>
                  </Box>
                  <Box textAlign={'left'} mx={1}>
                    <Typography variant="caption">to:</Typography>
                    <Box>
                      <TextField
                        name="to"
                        error={workForrm.errors.to && workForrm.touched.to ? true : false}
                        onChange={workForrm.handleChange}
                        value={workForrm.values.to}
                        onBlur={workForrm.handleBlur}
                        type="date"
                      />
                    </Box>
                  </Box>
                </Box>
                <Button onClick={workForrm.handleSubmit} sx={{ mt: 2 }} variant="contained" size="large" color="secondary">
                  {isLoading ? <CircularProgress color="primary" /> : 'Submit'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h2">Upload Resume</Typography>
              <Box>
                <Button
                  color="secondary"
                  onClick={() => {
                    document.getElementById('resumeupload').click();
                  }}
                  variant="outlined"
                  sx={{ my: 1 }}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  // value={resumeupload}
                  onChange={async (e) => {
                    // console.log(e);
                    if (e.target.files[0]) {
                      const res = await uploadFiles(e.target.files[0]);
                      console.log(res);
                      setresumeupload(e.target.files[0]);
                    }
                  }}
                  hidden
                  id="resumeupload"
                />
                <Typography variant="body1" component={'span'} mx={1}>
                  {resumeupload?.name}
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}></Box>
              <Card variant="outlined">
                <CardContent sx={{ '&:last-child': { pb: 2 }, py: 2 }}>
                  <CardActionArea onClick={DownloadImage}>
                    <Typography variant="body2">{resumeupload?.name}</Typography>
                  </CardActionArea>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
