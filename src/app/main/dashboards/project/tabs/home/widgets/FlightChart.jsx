import { useTheme } from '@emotion/react';
import {
  ArrowBackIos,
  ArrowForwardIos,
  FlightTakeoff,
} from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProjectDashboardFlightChartQuery } from '../../../ProjectDashboardApi';
import Chart from 'react-apexcharts';

function FlightChart(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const todaysDate = moment().format('YYYY-MM-DD');
  const [months, setMonths] = useState(todaysDate);

  const { data: flightChartData } = useGetProjectDashboardFlightChartQuery({
    month: moment(months).format('MM'),
    year: moment(months).format('YYYY'),
  });

 
	const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 50,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: flightChartData || [], // Make sure it's an array
        label: 'Total Flight ',
        maxBarThickness: 20,
      },
    ],
    labels: Array.from({ length: 31 }, (_, index) => (index + 1).toString()), // Ensure 31 labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };


console.log('flightChartData', flightChartData);


  return (
    <Paper {...props} className='w-full rounded-40 shadow'>
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          <FlightTakeoff /> Flights
        </Typography>
      </div>

      <div>
        <Chart
          data={data}
          options={options}
          type='bar' 
          height={350}
          width={700}
        />
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 2,
        }}>
        <button>
          <ArrowBackIos
            fontSize='large'
            onClick={() => {
              setMonths(
                moment(months)
                  .subtract(1, 'months')
                  .endOf('month')
                  .format('YYYY-MM-DD')
              );
            }}
          />
        </button>
        <div
          className='text-16 font-medium'
          style={{
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {moment(months, 'YYYY/MM/DD').format('MMMM')} , {months.slice(0, 4)}
        </div>

        {months.slice(0, 7) === todaysDate.slice(0, 7) ? (
          <button>
            <ArrowForwardIos style={{ color: '#d1cfcf' }} fontSize='large' />
          </button>
        ) : (
          <button>
            <ArrowForwardIos
              fontSize='large'
              onClick={() => {
                setMonths(moment(months).add(1, 'months').format('YYYY-MM-DD'));
              }}
            />
          </button>
        )}
      </Box>
    </Paper>
  );
}

export default memo(FlightChart);
