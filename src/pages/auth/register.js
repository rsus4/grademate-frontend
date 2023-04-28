import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const auth = useAuth();
  const departments = [
    { label: 'Computer Science and Engineering', value: 'cse' },
    { label: 'Computer Science and Design', value: 'csd' },
    { label: 'Computer Science and Artificial Intelligence', value: 'csai' },
    { label: 'Computer Science and Biology', value: 'csb' },
    { label: 'Computer Science and Social Science', value: 'csss' },
    { label: 'Electronics and Communication Engineering', value: 'ece' },
    { label: 'Electronics and VLSI Engineering', value: 'eve' },
  ];
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      department:'',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long'
        ),    
        confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        department: Yup
        .string()
        .oneOf([
          'Computer Science and Engineering',
          'Computer Science and Design',
          'Computer Science and Artificial Intelligence',
          'Computer Science and Biology',
          'Computer Science and Social Science',
          'Electronics and Communication Engineering',
          'Electronics and VLSI Engineering'
        ], 'Invalid department')
        .required('Department is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // await auth.signUp(values.email, values.name, values.password);
        // router.push('/');
        // const body = {
        //   ...values,
        //   verified: false
        // };
        const { confirmPassword, ...body } = values;
        body.verified = false
        const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (data.message.includes("User with email")) {
        setErrorMessage(data.message);
      } else {
        console.log("HELLO THIS IS EMAIL FRONTEND")
        console.log(values.email)
        router.push(`/auth/otp?email=${values.email}`);
      }
    } catch (err) {
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false);
      console.error(err);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | GradeMate
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                 {/* <TextField
                  error={!!(formik.touched.department && formik.errors.department)}
                  fullWidth
                  helperText={formik.touched.department && formik.errors.department}
                  label="Department"
                  name="department"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.department}
                /> */}
                 <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  label="Department"
                  name="department"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.department}
                >
                  <MenuItem value="" disabled>Select Department</MenuItem>
                  <MenuItem value="Computer Science and Engineering">Computer Science and Engineering</MenuItem>
                  <MenuItem value="Computer Science and Design">Computer Science and Design</MenuItem>
                  <MenuItem value="Computer Science and Artificial Intelligence">Computer Science and Artificial Intelligence</MenuItem>
                  <MenuItem value="Computer Science and Biology">Computer Science and Biology</MenuItem>
                  <MenuItem value="Computer Science and Social Science">Computer Science and Social Science</MenuItem>
                  <MenuItem value="Electronics and Communication Engineering">Electronics and Communication Engineering</MenuItem>
                  <MenuItem value="Electronics and VLSI Engineering">Electronics and VLSI Engineering</MenuItem>
                </Select>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              <TextField
                error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                fullWidth
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                label="Confirm Password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
              />  
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              {errorMessage && errorMessage.includes("User with email") && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {errorMessage}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
