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
import Chart from 'react-apexcharts';
import { useGetProjectDashboardFlightChartQuery } from '../ProjectDashboardApi';

function FlightChart(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const todaysDate = moment().format('YYYY-MM-DD');
  const [months, setMonths] = useState(todaysDate);

  const { data: flightChartData } = useGetProjectDashboardFlightChartQuery({
    month: moment(months).format('MM'),
    year: moment(months).format('YYYY'),
  });

  const transformChartData = (data) => {
    const daysInMonth = moment(months).daysInMonth();
    const transformedData = Array(daysInMonth).fill(0);

    if (data) {
      Object.entries(data).forEach(([day, count]) => {
        const dayIndex = parseInt(day, 10) - 1;
        transformedData[dayIndex] = count;
      });
    }

    return transformedData;
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: '100%',
        toolbar: {
          show: false, // Hides the menu (three horizontal lines)
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
        },
      },
      colors: ['#00E396', '#775DD0'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        showForSingleSeries: true,
        markers: {
          fillColors: ['#00E396', '#775DD0'],
        },
      },
      xaxis: {
        categories: Array.from(
          { length: moment(months).daysInMonth() },
          (_, i) => (i + 1).toString()
        ),
      },
    },
    series: [
      {
        name: 'Total Flight',
        data: transformChartData(flightChartData),
      },
    ],
  });

  useEffect(() => {
    if (flightChartData) {
      setChartData((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            data: transformChartData(flightChartData),
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: Array.from(
              { length: moment(months).daysInMonth() },
              (_, i) => (i + 1).toString()
            ),
          },
        },
      }));
    }
  }, [flightChartData, months]);

  return (
    <Paper className='w-full rounded-40 shadow'>
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          <FlightTakeoff /> Flights
        </Typography>
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={350}
        width='100%'
      />

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
