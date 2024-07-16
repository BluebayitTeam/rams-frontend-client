import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Pagination, TableCell, TablePagination, Typography } from '@mui/material';
import { CREATE_MAKEALIST_ROW, DELETE_MAKEALIST_ROW, GET_MAKEALIST_ROW_BY_LIST_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import withRouter from '@fuse/core/withRouter';
import axios from 'axios';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import MultiplePassengersTableHead from './MultiplePassengersTableHead';

function MultiplePassengersTable(props) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const { passengerId } = props;
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });
	const [passengerList, setPassengerList] = useState([]);
	const routeParams = useParams();

	const { makeAListId } = routeParams;

	const [rows, setRows] = useState([]);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [selected, setSelected] = useState([]);

	const handleGetPassengerTableData = () => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(
			`${GET_MAKEALIST_ROW_BY_LIST_ID}${makeAListId}?page=${pageAndSize.page}&size=${pageAndSize.size}`,
			authTOKEN
		)
			.then((response) => response.json())
			.then((data) => {
				setPassengerList(data?.make_list_items || []);
			})
			.catch((error) => {
				CustomNotification('error', `${error?.response?.data?.detail}`);
			});
	};

	const handleAddPassenger = async (passengerId) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const data = {
			passenger: passengerId,
			make_list: makeAListId
		};

		try {
			const response = await axios.post(CREATE_MAKEALIST_ROW, data, authTOKEN);

			if (response) {
				handleGetPassengerTableData();
				CustomNotification('success', 'Passenger Added Successfully');
			}
		} catch (error) {
			CustomNotification('error', `${error?.response?.data?.detail}`);
		}
	};

	const handleRemovePassenger = (id) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		axios
			.delete(`${DELETE_MAKEALIST_ROW}${id}`, authTOKEN)
			.then((response) => {
				if (response) {
					CustomNotification('success', 'Passenger Removed Successfully');
					handleGetPassengerTableData();
				}
			})
			.catch((error) => {
				CustomNotification('error', `${error?.response?.data?.detail}`);
			});
	};

	useEffect(() => {
		handleGetPassengerTableData();
	}, [makeAListId]);

	useEffect(() => {
		if (passengerId) {
			handleAddPassenger(passengerId);
		}
	}, [passengerId]);

	const handlePagination = (event, newPage) => {
		setPage(newPage - 1);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function handleRequestSort(makeAListEvent, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(makeAListEvent) {
		if (makeAListEvent.target.checked) {
			setSelected(passengerList.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleCheck(makeAListEvent, id) {
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

	const pageCount = Math.ceil(rows.length / rowsPerPage);

	if (passengerList?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="textSecondary"
					variant="h5"
				>
					Row is Empty!
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
					<MultiplePassengersTableHead
						selectedMakeAListIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={passengerList.length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>
					<TableBody>
						{passengerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, index) => (
							<TableRow
								key={n.id}
								hover
								role="checkbox"
								tabIndex={-1}
							>
								<TableCell className="w-40 md:w-64">{index + 1 + page * rowsPerPage}</TableCell>
								<TableCell className="p-4 md:p-16">{n?.passenger?.passenger_id}</TableCell>
								<TableCell className="p-4 md:p-16">{n?.passenger?.passenger_name}</TableCell>
								<TableCell className="p-4 md:p-16">{n?.passenger?.passport_no}</TableCell>
								<TableCell className="p-4 md:p-16">
									{n?.passenger?.agent?.first_name || ''} {n?.passenger?.agent?.last_name || ''}
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									align="center"
								>
									<Delete
										onClick={() => handleRemovePassenger(n.id, n)} // pass `n` or `n.id`, depending on your API requirements
										className="cursor-pointer"
										style={{ color: 'red' }}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<div
				id="pagiContainer"
				className="flex justify-between mb-6"
			>
				<Pagination
					count={pageCount}
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
					className="shrink-0 mb-2"
					component="div"
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
