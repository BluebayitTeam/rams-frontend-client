import { useTheme } from '@emotion/react';
import {
  ArrowBackIos,
  ArrowForwardIos,
  FlightTakeoff,
  PeopleAlt,
} from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import { useGetTicketDashboardChartQuery } from '../../../TicketDashboardApi';

function TicketSalesChart(props) {
  const dispatch = useDispatch();
  const [year, setYear] = useState(moment().format('YYYY'));

  const { data: ticketSalesChart } = useGetTicketDashboardChartQuery({
    yaerlyData: year,
  });

  const transformChartData = (data) => {
    const monthsOfYear = moment.months();
    const transformedData = Array(12).fill(0);
    if (data) {
      monthsOfYear.forEach((month, index) => {
        if (data[month]) {
          transformedData[index] = data[month];
        }
      });
    }
    return transformedData;
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: 500,
        toolbar: {
          show: false,
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
        categories: moment.monthsShort(),
      },
    },
    series: [
      {
        name: 'This month',
        data: ticketSalesChart?.total_sales_per_month || [],
      },
    ],
  });

  useEffect(() => {
    if (ticketSalesChart?.total_sales_per_month) {
      setChartData((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            data: transformChartData(ticketSalesChart?.total_sales_per_month),
          },
        ],
      }));
    }
  }, [ticketSalesChart?.total_sales_per_month]);

  return (
    <Paper {...props} className='w-full h-full rounded-40 shadow'>
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          <PeopleAlt className='mx-5' /> Ticket Sales by Month
        </Typography>
      </div>

      <Box
        sx={{
          height: 500,
          position: 'relative',
        }}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type='bar'
          height='100%'
        />
      </Box>
    </Paper>
  );
}

export default memo(TicketSalesChart);
