import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import {useState, useEffect } from 'react';


const user = {
  avatar: '/assets/avatars/avatar-cao-yu.png',
  city: 'University of Saskatchewan, ',
  department: 'Canada',
  jobTitle: 'Senior Developer',
  name: 'Payel C Mukherjee'
};



export const AccountProfile = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

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

  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          New Delhi, {department}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        // disabled
        sx={{ color: '#3cb9b2'}}
      >
        Profile Picture
      </Button>
    </CardActions>
  </Card>
);};
