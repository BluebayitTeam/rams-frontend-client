/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { getBranches, getCities, getCountries, getRoles, getThanas } from 'app/store/dataSlice';
import {
	Box,
	FormControl,
	FormControlLabel,
	Grid,
	Modal,
	Paper,
	Radio,
	RadioGroup,
	TablePagination,
	Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { BASE_URL, UPDATE_TICKET } from 'src/app/constant/constants';
import clsx from 'clsx';
import { selectFilteredSupports, useGetSupportsQuery } from '../SupportsApi';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	tblContainer: {
		borderRadius: '0px'
	},
	table: {
		minWidth: 600
	},
	tableHead: {
		backgroundColor: theme.palette.primary[500]
	},
	dateOfSaleContainer: {
		display: 'flex',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		minWidth: '250px'
	},
	dateOfSale: {
		width: '45px',
		background: theme.palette.background.paper,
		'& > div': {
			'&:before': {
				borderBottom: '0px solid black !important'
			}
		},
		'& input': {
			boxSizing: 'inherit',
			marginLeft: '-11px',
			marginTop: '2px'
		}
	},
	paytypeLabel: {
		'&& > label': {
			fontSize: '16px'
		}
	},
	paidAmount: {
		'&& > p': {
			marginTop: '-27px'
		}
	},
	modal: {
		position: 'relative',

		marginTop: '22%',
		marginLeft: '50%',
		transform: 'translate(-50%, -50%)',
		width: 350,
		height: 180,
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		// color: theme.palette.background.paper,
		backgroundColor: theme.palette.background.paper
	},
	close: { position: 'absolute', top: '10', right: '10', color: 'red', fontSize: '20px' },
	paper: {
		marginTop: '3%',
		width: '100%',
		backgroundColor: theme.palette.grey,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing(2, 4, 3),
		marginLeft: '20px',
		marginRight: '10px'
	},
	totalSummery: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	underline: {
		borderBottom: '1px solid grey',
		marginTop: '4%',
		marginBottom: '1%'
	},
	textMarginBottom: {
		marginBottom: '2%',
		marginTop: '3%',
		marginLeft: '3%'
	},
	boxStyle: {
		display: 'flex',
		justifyContent: 'flex-start'
	}
}));

function SupportsTable(props) {
	const dispatch = useDispatch();
	const { navigate } = props;
	const { data, isLoading, refetch } = useGetSupportsQuery(props?.searchKey);
	const [ticketId, setTicketId] = useState('');
	const [customerId, setCustomerId] = useState('');
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const handleOpen = (ticketIdx, customerId) => {
		setTicketId(ticketIdx);
		setCustomerId(customerId.created_by.id);

		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {}
	});
	console.log('sdsdsds', data);
	const { reset, watch, control, onChange, formState, getValues, setValue } = methods;
	const totalData = useSelector(selectFilteredSupports(data));
	const supports = useSelector(selectFilteredSupports(data?.tickets));
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const support = useSelector((state) => state.data.supports);
	console.log('supportsss', totalData);

	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getRoles());
		dispatch(getCities());
		dispatch(getCountries());
	}, []);
	console.log(`props?.searchKey`, props?.searchKey);
	useEffect(() => {
		refetch(props?.searchKey);
	}, [props?.searchKey]);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);

	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});

	function getTickets(n) {
		navigate(`/apps/support/supports/${n.id}`);
	}

	function handleDeleteTicket(tickets, event) {
		localStorage.removeItem('updateTicketStatus');
		localStorage.setItem('deleteTicketEvent', event);
		navigate(`/apps/supports/${tickets.id}`);
	}

	const handleChangeTicketStatus = () => {
		// const ticketStatuss = {
		// 	ticket_status: id,
		// 	user: customerId
		// };
		console.log('Support', getValues());
		const updateData = getValues();
		updateData.user = customerId;

		const authToken = {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			},
			body: JSON.stringify(updateData)
		};
		fetch(`${UPDATE_TICKET}${ticketId}`, authToken).then(() => {
			refetch();
			setOpen(false);
			// dispatch(getSupports()).then(() => setLoading(false));
		});
	};

	function handleRequestSort(event, property) {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(supports.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/support/supports/${item.id}/${item.handle}`);
	}

	function handleUpdateSupport(item, event) {
		debugger;
		localStorage.removeItem('deleteSupport');
		localStorage.setItem('updateSupport', event);
		navigate(`/apps/support/supports/${item.id}/${item.handle}`);
	}

	function handleDeleteSupport(item, event) {
		localStorage.removeItem('updateSupport');
		localStorage.setItem('deleteSupport', event);
		navigate(`/apps/support/supports/${item.id}/${item.handle}`);
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

	function handleChangePage(event, page) {
		setPage(+page);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (supports?.length === 0) {
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
					There are no supports!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={classes.modal}>
					<Box style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
						<CloseIcon
							style={{ fontSize: '20px', cursor: 'pointer' }}
							className={classes.close}
							onClick={handleClose}
						/>
					</Box>
					<Box style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
						<FormProvider {...methods}>
							<Controller
								name="ticket_status"
								control={control}
								render={({ field }) => (
									<FormControl component="fieldset">
										<RadioGroup
											row
											aria-label="position"
											name="position"
											defaultValue="top"
											onChange={(event) => {
												event.target.value;
												handleChangeTicketStatus();
											}}
										>
											<FormControlLabel
												{...field}
												value="open"
												control={
													<Radio
														checked={field.value === 'open' ? field.value : false}
														style={{ color: 'green' }}
													/>
												}
												label="Open"
											/>
											<FormControlLabel
												{...field}
												value="in_process"
												control={
													<Radio
														checked={field.value === 'in_process' ? field.value : false}
														style={{ color: '#22d3ee' }}
													/>
												}
												label="In Process"
											/>

											<FormControlLabel
												{...field}
												value="closed"
												control={
													<Radio
														checked={field.value === 'closed' ? field.value : false}
														style={{ color: 'red' }}
													/>
												}
												label="Closed"
											/>
										</RadioGroup>
									</FormControl>
								)}
							/>
						</FormProvider>
						{/* })} */}
					</Box>
				</Box>
			</Modal>
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Typography
					variant="h6"
					gutterBottom
					component="div"
					sx={{ m: 2 }}
					className={classes.textMarginBottom}
				>
					Support Ticket
				</Typography>

				{supports?.map((support) => (
					<Box>
						<Grid
							container
							xs={12}
							spacing={2}
						>
							<Paper className={classes.paper}>
								<Box>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											marginBottom: '10px'
										}}
									>
										<img
											src={
												support?.user?.image
													? `${BASE_URL}${support?.user?.image}`
													: 'assets/images/logos/default.png'
											}
											style={{
												height: '50px',
												width: '50px',
												borderRadius: '50%',
												marginRight: '15px'
											}}
											alt=""
										/>
										<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
											<Typography
												variant="p"
												gutterBottom
												component="div"
												style={{ marginRight: '5px' }}
											>
												{`${support?.user?.first_name} ${support?.user?.last_name}`}
											</Typography>
											<Typography
												variant="p"
												gutterBottom
												component="div"
												style={{ marginRight: '5px' }}
											>
												<span style={{ fontWeight: 700 }}>Subject: </span>
												{` ${support?.subject}`}
											</Typography>
										</div>
									</div>
									<Box className={classes.boxStyle}>
										<Typography
											variant="p"
											gutterBottom
											component="div"
											className={clsx(
												'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
												support?.ticket_status?.name === ('open' || 'Open')
													? 'bg-green-800'
													: support?.ticket_status?.name === ('closed' || 'Closed')
														? 'bg-red-800'
														: support?.ticket_status?.name ===
															  ('customer-reply' ||
																	'Customer-reply' ||
																	'Customer-Reply' ||
																	'Customer Reply')
															? 'bg-blue-800'
															: support?.ticket_status?.name ===
																  ('answered' || 'Answered')
																? 'bg-purple-800'
																: support?.ticket_status?.name ===
																	  ('in_process' || 'In process')
																	? 'bg-orange-800'
																	: ''
											)}
											style={{ marginRight: '5px' }}
										>
											{/* {_.isEmpty(ticketStatus) || ticketStatus.find(ticketSt => ticketSt?.name === support?.ticket_status)?.name} */}
											{support?.ticket_status?.name}
										</Typography>
										<Typography
											variant="p"
											gutterBottom
											component="div"
											className={clsx(
												'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
												support?.ticket_priority?.name === ('high' || 'High')
													? 'bg-green-400'
													: support?.ticket_priority?.name === ('normal' || 'Normal')
														? 'bg-orange-400'
														: support?.ticket_priority?.name === ('low' || 'Low')
															? 'bg-blue-400'
															: support?.ticket_priority?.name
																? 'bg-black'
																: ''
											)}
											style={{ marginRight: '5px' }}
										>
											{support?.ticket_priority?.name}
										</Typography>

										<Typography
											variant="p"
											gutterBottom
											component="div"
											className={clsx(
												'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white bg-black'
											)}
											style={{ marginRight: '5px' }}
										>
											{support?.ticket_department?.name}
										</Typography>
										<Typography
											variant="p"
											gutterBottom
											component="div"
											className={clsx(
												'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-black bg-gray-300'
											)}
											style={{ marginRight: '5px' }}
										>
											Ticket#{support?.ticket_number}
										</Typography>
										<Typography
											variant="p"
											gutterBottom
											component="div"
											style={{ color: 'grey', display: 'flex', alignItems: 'center' }}
										>
											{format(new Date(support?.updated_at), 'MMM dd, yyyy')}
										</Typography>
									</Box>
								</Box>
								<div
									// className="flex items-center sm:mb-12"
									// component={Link}
									// role="button"
									// to="/apps/support-management/"
									color="inherit"
								>
									<EditIcon
										className="h-52 cursor-pointer"
										style={{ color: 'green' }}
										onClick={(event) => {
											handleOpen(support.id, support);
											setValue('ticket_status', support?.ticket_status?.name);
										}}
									/>

									{/* <DeleteIcon
										className="h-52 cursor-pointer"
										onClick={(event) => handleDeleteTicket(support, 'deleteTicketEvent')}
									/> */}

									<ArrowForwardIcon
										className="h-52 cursor-pointer"
										onClick={(event) => getTickets(support)}
									/>
								</div>
							</Paper>
						</Grid>
					</Box>
				))}
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(SupportsTable);
