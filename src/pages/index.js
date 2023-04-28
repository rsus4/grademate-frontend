import Head from 'next/head';
import {React, useState, useEffect}from 'react';
import axios from 'axios';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => {
  const [selected, setSelected] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('CSE673_Compilers');
  const [selectedSem, setSelectedSem] = useState('Winter 2023');

  const [data, setData] = useState([]);
  const [courseName, setCourseName] = useState(null);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(()=>{
    console.log(data)
    if(Array.isArray(data)){
      setCourseName(data.map((item=> item[0]+": " + item[1])))
    }
  },[data])


  useEffect(()=>{
    if(selected && data){

      for(let i=0; i<data.length;i++){
        for(let j=0;j<selected.length;j++){
          // console.log(data[i])
          console.log(selected[j])
          if(data[i][0]==selected[j]['course'].slice(0,6)){
            // setFilteredData([...filteredData, data[i]]);
            setFilteredData(prevData => [...prevData, data[i]]);
            console.log("Hi")
            console.log(data[i])
            console.log(filteredData)
          }
        }
      }
    }
  },[selected, data])



  useEffect(() => {
    // console.log("I came here")
    const email = window.sessionStorage.getItem('email');
    fetch(`http://localhost:8000/api/collection?email=${email}`)
    .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  

  const handleSelect = () => {
    const temp = selected.filter((item) => !(item['course'] == selectedCourse && item['sem'] == selectedSem))
    setSelected([... temp, {'course' : selectedCourse, 'sem' : selectedSem}])
  }
  const handleDelete = (sem, course) => {
    setSelected(selected.filter((item) => item['course'] != course || item['sem'] != sem))
  }
  return(
    console.log(filteredData),
  <>
   
    <Head>
      <title>
        Overview | GradeMate
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
              data={courseName}
              
              handleChange={setSelectedCourse}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
              handleChange={setSelectedSem}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
              handleSelect={handleSelect}
            />
          </Grid>

  <Grid container spacing={2}>
    <Grid item xs={12}>
      {filteredData && filteredData.length>0 && <OverviewSales
        chartSeries={filteredData.map(item => ({
          name: item[0] + ": " + item[1],
          data: item[3] // replace this with the data for each item
        }))}
        sx={{ height: '100%' }}
        course={"Compare Grade Curves"}
        // sem={item['sem']}  
        handleDelete={handleDelete}
      />}
    </Grid>
    {/* {filteredData.map((item)=>{
      return(
        <Grid item xs={12} md={6}>
          <OverviewTraffic
            chartSeries={item[3].map(str => parseInt(str))}
            labels={['A+','A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F']}
            sx={{ height: '100%' }}
            course={item[0] + ": " + item[1]}
            sem={"Winter 2023"}
          />
        </Grid>
      )
    })} */}
    {filteredData
  .filter((item, index, self) => self.findIndex(t => t[1] === item[1] && t[0] === item[0]) === index)
  .map((item)=>{
    return(
      <Grid item xs={12} md={6}>
        <OverviewTraffic
          chartSeries={item[3].map(str => parseInt(str))}
          labels={['A+','A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F']}
          sx={{ height: '100%' }}
          course={item[0] + ": " + item[1]}
          sem={"Winter 2023"}
        />
      </Grid>
    )
})}

  </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
