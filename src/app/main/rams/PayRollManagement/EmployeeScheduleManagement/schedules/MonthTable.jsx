/* eslint-disable no-nested-ternary */
import { Box, Pagination, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  tablecell: {
    fontSize: '50px'
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3)
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function MonthTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const timetable = []
  // const timetable = useSelector(({ schedulesManagement }) => schedulesManagement.employeeTimetableSchedule);
  const data = [null];
  // data.push(timetable);

  const startDate = new Date(timetable?.employee_schedule?.start_date);
  const endDate = new Date(timetable?.employee_schedule?.end_date);

  // Set the timezone offset to GMT+6
  startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
  endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());



  // const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' };
  const dates = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    // const formattedDate = d.toLocaleDateString('en-US', options).replace(/\d{4}/, year => year.slice(2));

    // dates.push(formattedDate);
    const year = d.getFullYear().toString().slice(2);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}, ${d.toLocaleDateString('en-US', { weekday: 'short' })}`;
    dates.push(formattedDate);
  }
  const [page, setPage] = useState(1);
  // const itemsPerPage = 10; // Change this to the desired number of items per page
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const itemsForCurrentPage = dates.slice(startIndex, endIndex);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dates.slice(indexOfFirstRow, indexOfLastRow);




  return (
    <Paper className="w-full rounded-40 shadow" style={{ backgroundColor: '#e7eaed' }}>
      <div className="flex items-center justify-between p-20 h-64">
        <Typography className="text-16 font-medium"> Employee Schedule TimePeriod</Typography>
      </div>

      {data[0] !== null ? (
        <Box className="w-full px-32">
          <table style={{ border: '1px solid gray', width: '100%' }}>
            <thead>
              <tr style={{ border: '1px solid gray' }}>
                <th> </th>
                {Array.from({ length: 24 }).map((_, index) => (
                  <th style={{ border: '1px solid gray' }} key={index}>
                    {index}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                return (
                  <>
                    {currentRows.map(e => (
                      <tr style={{ border: '1px solid gray' }} key={index}>
                        <td style={{ border: '1px solid gray' }}>{e}</td>
                        {Array.from({ length: 24 }).map((_, index) => {
                          const hour = index.toString().padStart(2, '0');
                          const [startHour, startMinute] = (
                            data?.timetable?.checkin_end ?? ''
                          )
                            .split(':')
                            .map(Number);
                          const [endHour, endMinute] = (data?.timetable?.checkout_end ?? '')
                            .split(':')
                            .map(Number);
                          const currentHour = Number(hour);

                          const currentMinute = Number(0); // use 0 for the minute since it is not provided in the hour value
                          let isHighlighted = false;
                          if (startHour <= endHour) {
                            // If start and end times are on the same day
                            isHighlighted =
                              (currentHour > startHour ||
                                (currentHour === startHour &&
                                  currentMinute >= startMinute)) &&
                              (currentHour < endHour ||
                                (currentHour === endHour &&
                                  currentMinute <= endMinute));
                          } else {
                            // If start and end times are on different days
                            isHighlighted =
                              (currentHour >= startHour &&
                                currentHour < 24 &&
                                currentMinute >= startMinute) ||
                              (currentHour >= 0 && currentHour <= endHour) ||
                              (currentHour === endHour && currentMinute <= endMinute) ||
                              (currentHour >= startHour && currentHour <= 23);
                          }

                          const dateStr = `${e}`;
                          const dateParts = dateStr.split(', ');
                          const formattedDate = dateParts[0];

                          const newDate = new Date(formattedDate);
                          const options = { weekday: 'long' };
                          const dayName = newDate.toLocaleDateString('en-US', options); // format the date and extract the day name
                          const isFriday = dayName === 'Friday';
                          const isSaturday = dayName === 'Saturday';
                          const isSunday = dayName === 'Sunday';
                          const isMonday = dayName === 'Monday';
                          const isTuesday = dayName === 'Tuesday';
                          const isWednesday = dayName === 'Wednesday';
                          const isThursday = dayName === 'Thursday';
                          const isFridayUnhighlighted = isFriday && !data?.friday;
                          const isSaturdayUnhighlighted = isSaturday && !data?.saturday;
                          const isSundayUnhighlighted = isSunday && !data?.sunday;
                          const isMondayUnhighlighted = isMonday && !data?.monday;
                          const isTuesdayUnhighlighted = isTuesday && !data?.tuesday;
                          const isWednesdayUnhighlighted = isWednesday && !data?.wednesday;
                          const isThursdayUnhighlighted = isThursday && !data?.thursday;
                          const cellStyle = {
                            backgroundColor:
                              isFridayUnhighlighted ||
                                isSaturdayUnhighlighted ||
                                isSundayUnhighlighted ||
                                isMondayUnhighlighted ||
                                isTuesdayUnhighlighted ||
                                isWednesdayUnhighlighted ||
                                isThursdayUnhighlighted
                                ? 'white'
                                : isHighlighted
                                  ? data?.timetable?.color
                                  : 'white',

                            border: isHighlighted ? 'none' : '1px solid #d9cfcf'
                          };
                          return <td key={index} style={cellStyle}></td>;
                        })}
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </Box>
      ) : (
        ''
      )}
      {/* <Pagination
				classes={{ ul: 'flex-nowrap' }}
				count={totalPages}
				page={page + 1}
				defaultPage={1}
				color="primary"
				showFirstButton

				showLastButton
				variant="outlined"
				shape="rounded"
				onChange={handlePagination}
			/> */}
      {/* <Pagination
				classes={{ ul: 'flex-nowrap' }}
				defaultPage={1}
				color="primary"
				showFirstButton
				showLastButton
				variant="outlined"
				shape="rounded"
				count={Math.ceil(dates.length / itemsPerPage)}
				page={page}
				onChange={(event, value) => setPage(value)}
			/>
			<TablePagination
				rowsPerPageOptions={[10, 20, 30]}
				component="div"
				count={dates.length}
				rowsPerPage={itemsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/> */}
      {data[0] !== null ? (
        <div className={classes.root}>
          <Pagination
            classes={{ ul: 'flex-nowrap' }}
            className={classes.pagination}
            defaultPage={1}
            color="primary"
            component="div"
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            count={Math.ceil(dates.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />

          {/* <TablePagination
						rowsPerPageOptions={[10, 30, 100]}
						component="div"
						count={Math.ceil(dates.length / rowsPerPage)}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/> */}
        </div>
      ) : (
        <div className={classes.root}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full"
          >
            <Typography color="textSecondary" variant="h5">
              There are no TimePeriod for Employee Schedule!
            </Typography>
          </motion.div>
        </div>
      )}
    </Paper>
  );
}

export default memo(MonthTable);
