import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid, 
  TableContainer, Table, TableHead,TableRow, TableCell, TableBody, Paper
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'University of Saskatchewan-angeles',
    label: 'University of Saskatchewan'
  }
];


export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: 'Payel',
    lastName: 'Mukherjee',
    email: 'payel@iiitd.ac.in',
    phone: '',
    state: 'University of Saskatchewan, Canada',
    department: 'SSH'
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [myCourses, setMyCourses] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
    console.log("PRINTING 1")
    const email = window.sessionStorage.getItem('email');
    console.log("PRINTING EMAIL")
    console.log(email);
    const api_path = `/api/user/${email}`
    console.log(api_path)
     const response = await fetch(`http://localhost:8000/api/user/${email}`);
     console.log(response)
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setDepartment(data.department);
    };
    fetchData();
  }, []);

  useEffect( () => {
    const fetchData = async () => {
    const email = window.sessionStorage.getItem('email');
    console.log(email);
    const api_path = `/api/mycourses/${email}`
    console.log(api_path)
     const response = await fetch(`http://localhost:8000/api/mycourses/${email}`);
     const data = await response.json();
    console.log(data)
     setMyCourses(data)
    };
    fetchData();
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
<Card sx={{ maxWidth: 700 }}>
  <CardHeader
    title="Instructor Profile Card"
    sx={{ bgcolor: '#3cb9b2', color: 'white' }}

  />
  <CardContent>


    <Box sx={{ m: 0 }}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          md={6}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
          <Typography>{name}</Typography>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Email address</Typography>
          <Typography>{email}</Typography>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Department</Typography>
          <Typography>{department}</Typography>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Typography sx={{ fontWeight: 'bold' }}>State</Typography>
          <Typography>New Delhi</Typography>
        </Grid>
        {myCourses.length>0 && <Grid item xs={12}>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#3cb9b2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCourses.map((course, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>}
      </Grid>
    </Box>
{/* 
<Box sx={{ p: 3 }}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Name</Typography>
      <Typography>{name}</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Email address</Typography>
      <Typography>{email}</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Department</Typography>
      <Typography>{department}</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>State</Typography>
      <Typography>New Delhi</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Courses</Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#3cb9b2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCourses.map((course, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </Grid>
</Box> */}



  </CardContent>
</Card>
  );
};
