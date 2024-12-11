/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TicketeditsTableHead from './TicketeditsTableHead';
import { selectFilteredTicketedits, useGetTicketeditsQuery } from '../TicketeditsApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import moment from 'moment';

import { makeStyles } from '@mui/styles';

/**
 * The ticketedits table.
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#fff',
    padding: '10px 20px',
    zIndex: 1000,
    
    width: '75%',
	},
	
	tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: '#fff',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 20px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}));


function TicketeditsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	  const classes = useStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetTicketeditsQuery({
    ...pageAndSize,
    searchKey,
  });
	const totalData = useSelector(selectFilteredTicketedits(data));
	const ticketedits = useSelector(
    selectFilteredTicketedits(data?.iata_tickets || [])
	);
let serialNumber = 1;

	useEffect(() => {
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
	const [selected, setSelected] = useState([]);

	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});
		const user_role = localStorage.getItem('user_role');


	function handleRequestSort(event, property) {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(ticketedits.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/ticketedit/ticketedits/${item.id}/${item.handle}`);
	}

	function handleUpdateTicketedit(item, event) {
		localStorage.removeItem('deleteTicketedit');
		localStorage.setItem('updateTicketedit', event);
		navigate(`/apps/ticketedit/ticketedits/${item.id}/${item.handle}`);
	}

	function handleDeleteTicketedit(item, event) {
		localStorage.removeItem('updateTicketedit');
		localStorage.setItem('deleteTicketedit', event);
		navigate(`/apps/ticketedit/ticketedits/${item.id}/${item.handle}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	// pagination
	const handlePagination = (e, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPageAndSize({ ...pageAndSize, size: event.target.value });
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (ticketedits?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no ticketedits!
				</Typography>
			</motion.div>
		);
	}

	return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <div className='grow overflow-x-auto overflow-y-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <TicketeditsTableHead
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'red',
              zIndex: 10,
            }}
            selectedTicketeditIds={selected}
            tableOrder={tableOrder}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={ticketedits.length}
            onMenuItemClick={handleDeselect}
            className={classes.tableHead}
          />

          <TableBody>
            {_.orderBy(
              ticketedits,
              [tableOrder.id],
              [tableOrder.direction]
            ).map((n) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className='h-72 cursor-pointer border-t-1  border-gray-200'
                  hover
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}>


                  <TableCell
                    className='w-40 md:w-64 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {pageAndSize.page * pageAndSize.size -
                      pageAndSize.size +
                      serialNumber++}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.issue_date)).format('YYYY-MM-DD')}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.invoice_no}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {`${n.issue_person?.first_name} ${n.issue_person?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.final_passenger}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {`${n.ticket_agency?.first_name} ${n.ticket_agency?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.flight_date)).format('YYYY-MM-DD')}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.gds?.name}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.gds_pnr}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.airline_pnr}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.return_flight_date)).format(
                      'YYYY-MM-DD'
                    )}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.ticket_no}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.sector}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.current_airway?.name}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.flight_no}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n._class}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.fare_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.airline_commission_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.customer_commission_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.tax_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.service_charge}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.purchase_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.sales_amount}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    align='center'
                    component='th'
                    scope='row'>
                    <div>
                      {/* {UserPermissions?.includes(IATATICKET_UPDATE) && ( */}
                      <Edit
                        onClick={(ticketeditEvent) => handleUpdateTicketedit(n)}
                        className='cursor-pointer custom-edit-icon-style'
                      />
                      {/* )} */}
                      {/* {UserPermissions?.includes(IATATICKET_DELETE) && ( */}
                      <Delete
                        onClick={(event) => handleDeleteTicketedit(n, 'Delete')}
                        className='cursor-pointer'
                        style={{
                          color: 'red',
                          visibility:
                            user_role === 'ADMIN' || user_role === 'admin'
                              ? 'visible'
                              : 'hidden',
                        }}
                      />
                      {/* )} */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <br />
      <br />
      <br />

      <div className={classes.root} id='pagiContainer'>
        <Pagination
          count={totalData?.total_pages}
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
          component='div'
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_pages}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default withRouter(TicketeditsTable);
