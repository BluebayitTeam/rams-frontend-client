/* eslint-disable no-nested-ternary */
import { Box, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTimetables } from 'app/store/dataSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  tablecell: {
    fontSize: '50px'
  },
  pagination: {
    padding: '20px'
  },
  modal: {
    position: 'absolute',
    // display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    marginTop: '15%',
    marginLeft: '35%',
    // transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    boxShadow: 24,
    color: theme.palette.background.paper,
    backgroundColor: '#252f3e'
  }
}));

function WidgetTable(props) {
  const dispatch = useDispatch();
  const employeeSchedule = useSelector(({ schedulesManagement }) => schedulesManagement?.employeeSchedule);
  // const employeeSchedule = useSelector(({ schedulesManagement }) => schedulesManagement.employeeSchedule);
  // const employeeSchedule = [];
  const user_role = localStorage.getItem('user_role');
  const classes = useStyles(props);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Change this to the desired number of items per page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForCurrentPage = 0
  // const itemsForCurrentPage = employeeSchedule?.slice(startIndex, endIndex);

  console.log("all_data_", employeeSchedule)

  function handleUpdateShift(item, event) {
    localStorage.removeItem('deleteSchedule');
    localStorage.setItem('updateSchedule', event);
    history.push(`/apps/schedules-management/${item.id}/${item?.name}`);
  }
  function handleDeleteShift(item, event) {
    localStorage.removeItem('updateSchedule');

    localStorage.setItem('deleteSchedule', event);
    history.push(`/apps/schedules-management/${item.id}/${item?.name}`);
  }
  useEffect(() => {
    dispatch(getTimetables());
  }, []);

  useEffect(() => {
    if (itemsForCurrentPage?.length == 0) {
      // dispatch(resetSchedule());
      // dispatch(resetScheduleTimePeriod());
    }
  }, [itemsForCurrentPage]);

  const employeeIdGettimetable = e => {
    localStorage.setItem('shiftId', e);
    // dispatch(getEmployeeTimetalbe(e));
  };


  return (
    <Paper className="w-full rounded-40" style={{ backgroundColor: '#c1d4ce' }}>
      <div className="flex items-center justify-between p-20 h-64">
        <Typography className="text-16 font-medium"> Employee Schedule</Typography>
      </div>
      <Box>
        {itemsForCurrentPage?.length !== 0 && itemsForCurrentPage ? (
          <Table>
            <TableHead>
              <TableRow style={{ fontSize: '14px' }}>
                <TableCell style={{ fontSize: '14px' }} className="whitespace-nowrap font-medium">
                  <Typography className="text-14 font-medium"> Employee Name </Typography>
                </TableCell>
                <TableCell style={{ fontSize: '14px' }} className="whitespace-nowrap font-medium">
                  <Typography className="text-14 font-medium">Employee Shift</Typography>
                </TableCell>
                <TableCell style={{ fontSize: '14px' }} className="whitespace-nowrap font-medium">
                  <Typography className="text-14 font-medium"> Beginning Data </Typography>
                </TableCell>
                <TableCell style={{ fontSize: '14px' }} className="whitespace-nowrap font-medium">
                  <Typography className="text-14 font-medium"> End Data </Typography>
                </TableCell>
                <TableCell style={{ fontSize: '14px' }} className="whitespace-nowrap font-medium">
                  <Typography className="text-14 font-medium"> Action </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsForCurrentPage?.map(employee => {
                return (
                  <TableRow hover key={employee?.id}>
                    <TableCell onClick={() => employeeIdGettimetable(employee)}>
                      {`${employee?.employee?.first_name} ${employee?.employee?.last_name}`}
                    </TableCell>
                    <TableCell onClick={() => employeeIdGettimetable(employee)}>
                      {employee?.shift?.name}
                    </TableCell>
                    <TableCell onClick={() => employeeIdGettimetable(employee)}>
                      {employee?.start_date &&
                        format(new Date(employee?.start_date), 'dd-MM-yyyy')}
                    </TableCell>
                    <TableCell onClick={() => employeeIdGettimetable(employee)}>
                      {employee?.end_date && format(new Date(employee?.end_date), 'dd-MM-yyyy')}
                    </TableCell>
                    <TableCell
                      whitespace-nowrap
                      className="p-4 md:p-16"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <div>
                        <EditIcon
                          onClick={shiftEvent =>
                            handleUpdateShift(employee, 'updateSchedule')
                          }
                          className="cursor-pointer"
                          style={{ color: 'green' }}
                        />
                        <DeleteIcon
                          onClick={shiftEvent =>
                            handleDeleteShift(employee, 'deleteSchedule')
                          }
                          className="cursor-pointer"
                          style={{
                            color: 'red'
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full"
          >
            <Typography color="textSecondary" variant="h5">
              There are no schedule!
            </Typography>
          </motion.div>
        )}
      </Box>
      {/* <Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					p: 2
				}}
			>
				<Pagination
					count={totalPages}
					page={page}
					defaultPage={1}
					color="primary"
					showFirstButton
					showLastButton
					variant="outlined"
					shape="rounded"
					onChange={handlePagination}
				/>
			</Box> */}
      {/* {itemsForCurrentPage?.length !== 0 && itemsForCurrentPage ? (
        <Pagination
          className={classes.pagination}
          classes={{ ul: 'flex-nowrap' }}
          defaultPage={1}
          color="primary"
          showFirstButton
          showLastButton
          variant="outlined"
          shape="rounded"
          count={Math.ceil(employeeSchedule?.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      ) : (
        ' '
      )} */}
    </Paper>
  );
}

export default memo(WidgetTable);
