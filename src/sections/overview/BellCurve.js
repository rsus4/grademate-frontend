import { React, useState, useEffect, useRef} from "react";
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsBellCurve from 'highcharts/modules/histogram-bellcurve';
import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import DeleteIcon from '@heroicons/react/24/solid/TrashIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

const useChartOptions = () => {
    const theme = useTheme();
  
    return {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      colors: [
        '#D32F2F', // red
        '#7B1FA2', // purple
        '#303F9F', // indigo
        '#00897B', // teal
        '#43A047', // green
        '#FBC02D', // yellow
        '#FB8C00', // orange
        '#E65100', // deep orange
      ],
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      legend: {
        offsetY:30,
        show: true,
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      theme: {
        mode: theme.palette.mode
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        categories: [
          'A+',
          'A',
          'A-',
          'B',
          'B-',
          'C',
          'C-',
          'D',
          'F',
        ],
        labels: {
          offsetY: 5,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => (value > 0 ? `${value}` : `${value}`),
          offsetX: -10,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      type: 'line'
    };
  };


// bellcurve(ReactHighCharts.Highcharts);
if (typeof Highcharts === 'object') {
    highchartsBellCurve(Highcharts); // Execute the bell curve module
}


// function BellCurve({ data, gradepoints }) {
//     const [config, setConfig] = useState(null);
//     const chartRef = useRef(null);
//     let lst = [0, 0, 0, 0, 0, 0, 0, 0];
//     const chartOptions = useChartOptions();
//     const [chartSeries, setChartSeries] = useState([]);

//     const appendTochartSeries = (newElement) => {
//         setChartSeries([...chartSeries, newElement]);
//     }

  
//     if (data.length > 0) {
//     console.log(data)
//     // appendTochartSeries({
//     //     name: data[0][0] + ": " + data[0][1] + "- " + data[0][2],
//     //     data: data[0][3],
//     //   })
//     console.log(chartSeries)
//     const newSeries = [{
//         name: data[data.length-1][0] + ": " + data[data.length-1][1] + "- " + data[data.length-1][2],
//         data: data[data.length-1][3],
//       }];
    
//       setChartSeries(chartSeries.concat(newSeries));
    
//     //   chartSeries.push({
//     //     name: data[data.length-1][0] + ": " + data[data.length-1][1] + "- " + data[data.length-1][2],
//     //     data: data[data.length-1][3],
//     //   });
//     }
  
//     return (
//       <>
//         {data.length > 0 && (
//           <Card>
//             <CardHeader
//               action={
//                 <Button
//                   color="inherit"
//                   size="small"
//                   startIcon={<SvgIcon fontSize="small"><DeleteIcon /></SvgIcon>}
//                   onClick={() => handleDelete(sem, course)}
//                 >
//                   Delete
//                 </Button>
//               }
//               title="Course Bell Curve Comparison Chart"
//             />
//             <CardContent>
//               <Chart
//                 height={350}
//                 options={chartOptions}
//                 series={chartSeries}
//                 type="line"
//                 width="100%"
//               />
//             </CardContent>
//             <Divider />
//           </Card>
//         )}
//       </>
//     );
//   }
  

// export default BellCurve;


function BellCurve({ data, gradepoints }) {
    const [config, setConfig] = useState(null);
    const chartRef = useRef(null);
    const chartOptions = useChartOptions();
    const [chartSeries, setChartSeries] = useState([]);
  
    useEffect(() => {
      if (data.length > 0) {
        const newSeries = [{
          name: data[data.length - 1][0] + ": " + data[data.length - 1][1] + "- " + data[data.length - 1][2],
          data: data[data.length - 1][3],
        }];
        setChartSeries(prevChartSeries => [...prevChartSeries, ...newSeries]);
        console.log(chartSeries)
      }
    }, [data]);
  
    return (
      <>
        {data.length > 0 && (
          <Card>
            <CardHeader
              // action={
              //   <Button
              //     color="inherit"
              //     size="small"
              //     startIcon={<SvgIcon fontSize="small"><DeleteIcon /></SvgIcon>}
              //     onClick={() => handleDelete(sem, course)}
              //   >
              //     Delete
              //   </Button>
              // }
              title="Course Bell Curve Comparison Chart"
            />
            <CardContent>
              <Chart
                height={350}
                options={chartOptions}
                series={chartSeries}
                type="line"
                width="100%"
              />
            </CardContent>
            <Divider />
          </Card>
        )}
      </>
    );
  }
  
  export default BellCurve;
  