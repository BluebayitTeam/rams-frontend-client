/* eslint-disable prettier/prettier */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import withRouter from '@fuse/core/withRouter';
import { Pagination, TableCell, TablePagination } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CREATE_MAKEALIST_ROW } from 'src/app/constant/constants';
import MultiplePassengersTableHead from './MultiplePassengersTableHead';

// ... (style object remains unchanged)

function MultiplePassengersTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  console.log('passengerIds', props?.passengerIds);
  
  const [passengerList, setPassengerList] = useState([])
  // console.log('passengerList',setPassengerList);
  

  useEffect(() => {
    if (props?.passengerIds) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };

     

      fetch(`${CREATE_MAKEALIST_ROW}${props?.passengerIds}`, authTOKEN)
        .then((response) => response.json())
        .then((data) => {
          console.log('dataCheck', data);
          setPassengerList(data)
        })
        .catch(() => {
         
        });
    }
  }, [props?.passengerIds]);

  useEffect(() => {
    if (props.passengers && props.passengers.length > 0) {
      setRows(props.passengers);
    }
  }, [props.passengers]);



  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  // Pagination handlers
  const handlePagination = (event, newPage) => {
    setPage(newPage - 1);
  };

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  // Calculate the number of pages
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  return (
    <div className='w-full flex flex-col min-h-full px-10 '>
      <FuseScrollbars className='grow overflow-x-auto '>
        <Table stickyHeader className='min-w-xl ' aria-labelledby='tableTitle'>
          <MultiplePassengersTableHead />
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, sl) => (
                <TableRow
                  className='h-72 cursor-pointer'
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={n.id}>
                  <TableCell
                    className='w-40 md:w-64'
                    component='th'
                    scope='row'>
                    {sl + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell className='p-4 md:p-16' component='th' scope='row'>
                    {n?.passenger_id}
                  </TableCell>
                  <TableCell className='p-4 md:p-16' component='th' scope='row'>
                    {n?.passenger_name}
                  </TableCell>
                  <TableCell className='p-4 md:p-16' component='th' scope='row'>
                    {n?.passport_no}
                  </TableCell>
                  <TableCell className='p-4 md:p-16' component='th' scope='row'>
                    {n?.agent}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16'
                    align='center'
                    component='th'
                    scope='row'>
                    <div>
                      <Delete
                        onClick={() =>
                          props?.setMltPassengerList(
                            props?.passengers.filter(
                              (item) => item.id !== n?.id
                            )

                            
                          )
                        }
                        className='cursor-pointer'
                        style={{ color: 'red' }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <div id='pagiContainer' className='flex justify-between mb-6'>
        <Pagination
          count={pageCount}
          page={page + 1}
          defaultPage={1}
          color='primary'
          showFirstButton
          showLastButton
          variant='outlined'
          shape='rounded'
          onChange={handlePagination}
        />

        <TablePagination
          className='shrink-0 mb-2'
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default withRouter(MultiplePassengersTable);
