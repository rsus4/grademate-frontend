import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';

const OTPPage = () => {
const router = useRouter();
const [email, setEmail] = useState('');

useEffect(() => {
    setEmail(router.query.email || '');
  }, [router.query.email]);

const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      otp: '',
      submit: null
    },
    validationSchema: Yup.object({
      otp: Yup
        .string()
        .length(6, 'OTP must be 6 digits')
        .required('OTP is required')
    }),
    onSubmit: async (values, helpers) => {
        try {
            const response = await fetch('http://localhost:8000/api/verifyotp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                otp: values.otp,
                email: email
              })
            });
            const data = await response.json();
            if (response.ok) {
              // OTP verified successfully, redirect to home page
              window.sessionStorage.setItem('email', email); // store the email ID in sessionStorage
              window.sessionStorage.setItem('authenticated', 'true');
              router.push('/');
            } else {
              // OTP verification failed, display error message
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: data.message });
              helpers.setSubmitting(false);
            }
          } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        console.error(err);
      }
    }
  });

  useEffect(() => {
    setEmail(router.query.email);
  }, [router.query.email]);

  return (
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
          <Typography variant="h4" sx={{ mb: 3 }}>
            Enter OTP
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              error={!!(formik.touched.otp && formik.errors.otp)}
              fullWidth
              helperText={formik.touched.otp && formik.errors.otp}
              label="OTP"
              name="otp"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.otp}
            />
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
            {errorMessage && (
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
              Submit
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default OTPPage;
