import { useCallback, useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/navigation';
import BellCurve from 'src/sections/overview/BellCurve';

import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  }
];

const Page = () => {

  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const fileReader = new FileReader();
  const array1 = []
  // const navigate = useNavigate();


  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const appendToArray = (newElement) => {
    setArray([...array, newElement]);
  }

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

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    console.log(csvHeader);
    console.log(csvRows);
    let count = 0;
    let courseName = "courseName";
    let courseNumber = "courseNumber"
    let instructor = "instructor"
    const percentageOfStudentsForEachGrade = [0,0,0,0,0,0,0,0,0];
    const array = csvRows.map(i => {
      const values = i.split(",");
      count+=1;
      if(count==4){
        courseName = values[1];
        courseNumber = values[2];
        instructor = values[3]
      }
      let grade = "I";
      let percentageOfStudents = "0"
      if(count>=4){
        grade = values[4];
        percentageOfStudents = values[8];
        if(grade.trim()=="A+"){
          percentageOfStudentsForEachGrade[0]=percentageOfStudents
        }
        if(grade.trim()=="A"){
          percentageOfStudentsForEachGrade[1]=percentageOfStudents
        }
        if(grade.trim()=="A-"){
          percentageOfStudentsForEachGrade[2]=percentageOfStudents
        }
        if(grade.trim()=="B"){
          percentageOfStudentsForEachGrade[3]=percentageOfStudents
        }
        if(grade.trim()=="B-"){
          percentageOfStudentsForEachGrade[4]=percentageOfStudents
        }
        if(grade.trim()=="C"){
          percentageOfStudentsForEachGrade[5]=percentageOfStudents
        }
        if(grade.trim()=="C-"){
          percentageOfStudentsForEachGrade[6]=percentageOfStudents
        }
        if(grade.trim()=="D"){
          percentageOfStudentsForEachGrade[7]=percentageOfStudents
        }
        if(grade.trim()=="F"){
          percentageOfStudentsForEachGrade[8]=percentageOfStudents
        }
      }
      console.log(courseName, courseNumber, instructor, percentageOfStudentsForEachGrade);
      return [courseName, courseNumber, instructor, percentageOfStudentsForEachGrade];
    });
    appendToArray(array[array.length-1]);
    console.log(array)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(file)
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        console.log(text)
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const [formData, setFormData] = useState({});
  const array2=[1,"My name is rishit Gupta"]

  const handleOnSubmit1 = (event) => {
    event.preventDefault();
    console.log(array);
    const newArray = array.map(entry => {
      const [courseCode, courseName, instructorName, grades] = entry;
      return [courseCode, courseName, instructorName, grades, name, email, department];
    });
    fetch('http://localhost:8000/api/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newArray)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // do something with the response data
      console.log("THE IN THE HOUSE")
      // router.push('/');
    })
    .catch(error => {
      console.log("THE ERROR TIME")
      console.error(error);
      // router.push('/');
    });
  };
  
  const headerKeys = Object.keys(Object.assign({}, ...array));
  return (
    <>
      <Head>
        <title>
          Add | GradeMate
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1} style={{marginTop:"-50px", marginBottom:"10px"}}>
                <Typography variant="h4">
                  Add New Course
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <form>
  <input
    type="file"
    id="csvFileInput"
    accept=".csv"
    onChange={handleOnChange}
    style={{
      display: 'none', // Hide the input element
    }}
  />
  <label htmlFor="csvFileInput">
    <Button
      variant="contained"
      color="primary"
      component="span"
      style={{
        marginRight: '20px', // Add margin to the right of the button
      }}
      
    >
      Upload CSV
    </Button>
  </label>
  <Button
    variant="contained"
    color="primary"
    onClick={handleOnSubmit}
  >
    Import
  </Button>
  {file && (
    <div>
  <p style={{ color: 'green' }}>Import the selected file: {file.name}</p>
  </div>
  )}
</form>

                  {/* <TextField id="standard-basic" label="Course Name" variant="standard" style={{ marginLeft: '70px', marginBottom: '25px' }}/>
                  <TextField id="standard-basic" label="Course Semester" variant="standard" style={{ marginLeft: '70px', marginBottom: '25px' }} /> */}
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOnSubmit1} 
                >
                  Submit

                </Button>
              </div>
            </Stack>
            <Stack spacing={1}>
              <BellCurve data={array} gradepoints={array1} />
              {array.map((item)=>{
                console.log(item)
                const finalArray=[]
                for(let i =0; i <9;i++){
                  finalArray.push(parseInt(item[3][i]))
                }
                console.log(finalArray)
      return(
        <Grid item xs={4} md={6}>
          <OverviewTraffic
            chartSeries={finalArray}
            labels={['A+','A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F']}
            sx={{ height: '100%' }}
            course={item[0] + ": " + item[1]+ "- " + item[2]}
            sem={item['sem']}
          />
        </Grid>
      )
    })}
              {/* <OverviewTraffic
                chartSeries={[10, 15, 25, 25, 10, 10, 1, 4]}
                labels={['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F']}
                sx={{ height: '100%' }}
                course={'CSE673_Compilers'}
                sem={'Monsoon 2022'}
              /> */}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
