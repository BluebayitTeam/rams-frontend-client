/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Box, Paper, TableHead } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDepartments, getEmployeeSchedule, getEmployeeTimetable } from 'app/store/dataSlice';


const useStyles = makeStyles(theme => ({
  tablecell: {
    fontSize: '50px'
  }
}));

function DepartmentTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const departments = useSelector(state => state.data?.departments);

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const DeptId = e => {
    dispatch(getEmployeeSchedule(e));
    dispatch(getEmployeeTimetable())
  };



  return (
    <FuseScrollbars className="flex-grow overflow-x-auto">
      <Paper className="w-full rounded-40" style={{ backgroundColor: '#8eb0ceed' }}>
        <div className="flex items-center justify-between p-20 h-64">
          <Typography className="text-16 font-medium"> Departments</Typography>
        </div>
        <Box m="10px">
          <Table>
            <TableHead></TableHead>
            <TableBody>
              {departments?.map(department => {
                return (
                  <TableRow hover key={department?.id}>
                    <TableCell style={{ fontSize: '12px' }} onClick={() => DeptId(department?.id)}>
                      {department?.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </FuseScrollbars>
  );
}

export default memo(DepartmentTable);
