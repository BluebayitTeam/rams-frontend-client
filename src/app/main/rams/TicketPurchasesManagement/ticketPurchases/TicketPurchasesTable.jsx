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
import TicketPurchasesTableHead from './TicketPurchasesTableHead';
import { selectFilteredTicketPurchases, useGetTicketPurchasesQuery } from '../TicketPurchasesApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import moment from 'moment';

/**
 * The ticketPurchases table.
 */
function TicketPurchasesTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetTicketPurchasesQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredTicketPurchases(data));
	const ticketPurchases = useSelector(
    selectFilteredTicketPurchases(data?.ticket_purchases)
  );
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
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

	function handleRequestSort(event, property) {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(ticketPurchases.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/ticketPurchase/ticketPurchases/${item.id}/${item.handle}`);
	}

	function handleUpdateTicketPurchase(item, event) {
		localStorage.removeItem('deleteTicketPurchase');
		localStorage.setItem('updateTicketPurchase', event);
		navigate(`/apps/ticketPurchase/ticketPurchases/${item.id}/${item.handle}`);
	}

	function handleDeleteTicketPurchase(item, event) {
		localStorage.removeItem('updateTicketPurchase');
		localStorage.setItem('deleteTicketPurchase', event);
		navigate(`/apps/ticketPurchase/ticketPurchases/${item.id}/${item.handle}`);
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

	if (ticketPurchases?.length === 0) {
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
					There are no ticketPurchases!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full px-10">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<TicketPurchasesTableHead
						selectedTicketPurchaseIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={ticketPurchases.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(ticketPurchases, [tableOrder.id], [tableOrder.direction]).map((n) => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
                <TableRow
                  className='h-20 cursor-pointer border-t-1  border-gray-200'
                  hover
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}>
                  <TableCell
                    className='w-40 md:w-64 border-t-1  border-gray-200'
                    component='th'
                    scope='row'
                    style={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: '#fff',
                    }}>
                    {pageAndSize.page * pageAndSize.size -
                      pageAndSize.size +
                      serialNumber++}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.issue_date &&
                      moment(new Date(n.issue_date)).format('DD-MM-YYYY')}{' '}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.invoice_no}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.passenger?.passenger_name}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {`${n.ticket_agency?.first_name} ${n.ticket_agency?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {`${n.ticket_agency?.first_name} ${n.ticket_agency?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.flight_date &&
                      moment(new Date(n.flight_date)).format('DD-MM-YYYY')}{' '}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.ticket_no}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.passenger?.target_country?.name}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.sector_name}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.carrier_air_way}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.flight_no}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.flight_time}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.notes}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-12 whitespace-nowrap	'
                    component='th'
                    scope='row'>
                    {n.purchase_amount}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'
                    align='right'
                    style={{
                      position: 'sticky',
                      right: 0,
                      zIndex: 1,
                      backgroundColor: '#fff',
                    }}>
                    {hasPermission('DEPARTMENT_UPDATE') && (
                      <Edit
                        onClick={() =>
                          handleUpdateTicketPurchase(n, 'updateTicketPurchase')
                        }
                        className='cursor-pointer custom-edit-icon-style'
                      />
                    )}

                    {hasPermission('DEPARTMENT_DELETE') && (
                      <Delete
                        onClick={() =>
                          handleDeleteTicketPurchase(n, 'deleteTicketPurchase')
                        }
                        className='cursor-pointer custom-delete-icon-style'
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div id="pagiContainer">
				<Pagination
					// classes={{ ul: 'flex-nowrap' }}
					count={totalData?.total_pages}
					page={page + 1}
					defaultPage={1}
					color="primary"
					showFirstButton
					showLastButton
					variant="outlined"
					shape="rounded"
					onChange={handlePagination}
				/>

				<TablePagination
					className="shrink-0 border-t-1"
					component="div"
					rowsPerPageOptions={rowsPerPageOptions}
					count={totalData?.total_pages}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
}

export default withRouter(TicketPurchasesTable);
