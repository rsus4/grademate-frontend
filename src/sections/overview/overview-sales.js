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

export const OverviewSales = (props) => {
  const { chartSeries, sx, sem, course, handleDelete } = props;
  const chartOptions = useChartOptions();
  const uniqueChartSeries = chartSeries.reduce((acc, current) => {
    const existing = acc.find(item => item.name === current.name);
    if (!existing) {
      acc.push(current);
    }
    return acc;
  }, []);
  
  return (
    console.log(chartSeries),
    console.log(uniqueChartSeries),
    <Card sx={sx}>
      <CardHeader
        // action={(
        //   <Button
        //     color="inherit"
        //     size="small"
        //     startIcon={(
        //       <SvgIcon fontSize="small">
        //         <DeleteIcon />
        //       </SvgIcon>
        //     )}
        //     onClick={() => handleDelete(sem, course)}
        //   >
        //     Delete
        //   </Button>
        // )}
        title={`${course}`}
        />
      {/* {course} + ".png" */}
      {/* <img src = {`/assets/${course}.png`} style={{maxWidth:'750px', marginTop:'30px'}}/> */}
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={uniqueChartSeries}
          type="line"
          width='100%'
        />
      </CardContent>
      <Divider />
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
