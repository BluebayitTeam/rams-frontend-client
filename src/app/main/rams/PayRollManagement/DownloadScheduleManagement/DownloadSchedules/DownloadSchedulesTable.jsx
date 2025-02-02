
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Box, Button, CircularProgress, LinearProgress, List, ListItem, ListItemText, Popover, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getDeviceAll } from 'app/store/dataSlice';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ATTENDANCE_IMPORT } from 'src/app/constant/constants';
import { getPayrollMakeStyles } from '../../PayRollUtils/payrollMakeStyles';

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
	...getPayrollMakeStyles(theme),

	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		overflow: 'auto',
		minHeight: '35px'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	},
	box: {
		background: '#fff',
		border: '1px solid',
		borderColor: 'grey',
		borderRadius: 2,
		fontSize: '0.875rem',
		fontWeight: '700',
		width: '50%',
		padding: '20px',
		height: 'fit-content'
	},
	tableBox: {
		background: '#fff',
		border: '1px solid',
		borderColor: 'grey',
		borderRadius: 2,
		fontSize: '0.875rem',
		fontWeight: '700',
		padding: '20px',
		height: 'fit-content',
		margin: '20px'
	},

	itemHead: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

export default function DownloadSchedulesTable(props) {
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [attendance, setAttendance] = useState([]);
	const [afterLoadedText, setAfterLoadedText] = useState('');
	const devices = useSelector(state => state.data.devices);


	const [loading, setLoading] = useState(false);
	const classes = useStyles(props);
	const dispatch = useDispatch();

	let serialNumber = 1;
	useEffect(() => {
		dispatch(getDeviceAll());
	}, [dispatch]);
	const handleClick = () => {
		setLoading(true);
		// if (attendance.length == 0) {
		fetch(`${ATTENDANCE_IMPORT}${selectedDevice.id}`)
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					setLoading(false);

					setAfterLoadedText('No Data Faound');
				} else {
					setLoading(false);

					setIsLoading(true);
					setTimeout(() => {
						setIsLoading(false);
						setAttendance(data || []);
					}, 3000);
				}
			})
			.catch(error => {
				setIsLoading(false);
				setLoading(true);

				console.error(error);
			});
		// } else {
		// 	setLoading(false);

		// 	setAfterLoadedText('Already downloaded');
		// }
	};
	/// menu Item
	const [isPopoverOpen, setIsPopoverOpen] = useState(false); // To manage the popover's open/closed state
	const [anchorEl, setAnchorEl] = useState(null); // To store the anchor element for the popover
	const [selectedDevice, setSelectedDevice] = useState(null); // To track the selected device

	const handleOpenPopover = event => {
		setIsPopoverOpen(true);
		setAnchorEl(event.currentTarget); // Set the anchor element for the popover
	};

	const handleClosePopover = () => {
		setIsPopoverOpen(false);
	};

	const handleDeviceSelection = device => {
		setAttendance([]);
		setSelectedDevice(device);
		handleClosePopover(); // Close the popover after selection
	};

	useEffect(() => {
		if (isLoading) {
			const timer = setInterval(() => {
				setProgress(prevProgress => (prevProgress >= 130 ? 0 : prevProgress + 10));
			}, 200);
			setTimeout(() => {
				clearInterval(timer);
				if (progress < 130) {
					setProgress(0);
				}
			}, 5000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [isLoading]);

	useEffect(() => {
		if (progress === 130) {
			setIsLoading(false);
		}
	}, [progress]);

	useEffect(() => {
		setTimeout(() => {
			setAfterLoadedText('');
		}, 5000);
	}, [afterLoadedText]);

	return (
		<>
			<Box>
				<Box sx={{ m: 1, position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
					<div>
						<Button
							variant="outlined"
							onClick={handleOpenPopover}
							aria-controls="device-menu"
							aria-haspopup="true"
						>
							{selectedDevice ? selectedDevice.name : 'Select Device'}
						</Button>
						<Popover
							open={isPopoverOpen}
							anchorEl={anchorEl} // Set the anchor element for the popover
							onClose={handleClosePopover}
							anchorOrigin={{
								vertical: 'bottom', // Position the popover below the button
								horizontal: 'left' // Align with the left side of the button
							}}
						>
							<List>
								{devices?.map(device => (
									<ListItem key={device.id} button onClick={() => handleDeviceSelection(device)}>
										<ListItemText primary={device.name} />
									</ListItem>
								))}
							</List>
						</Popover>
					</div>
					{selectedDevice && (
						<Button
							variant="contained"
							startIcon={<DownloadForOfflineIcon />}
							onClick={handleClick}
							disabled={loading}
						>
							Start Import Employee Schedule
						</Button>
					)}

					{loading && (
						<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
							<CircularProgress size={24} />
						</Box>
					)}
				</Box>

				{/* </div> */}
				{afterLoadedText && (
					<Box className="flex justify-center mt-10">
						<p className="text-red">{afterLoadedText}</p>
					</Box>
				)}
				{isLoading && (
					<Box sx={{ width: '50%' }} m="auto" alignItems="center">
						<LinearProgressWithLabel
							{...props}
							sx={{ height: '20px' }}
							value={progress > 100 ? 100 : progress}
						/>
					</Box>
				)}
			</Box>
			{/* <Paper className=" rounded-40 shadow"> */}
			{attendance.length !== 0 && (
				<>
					<Box
						style={{
							margin: '0 50px 50px 50px',
							border: '2px solid #1b2330',
							height: 'fit-content',
							display: 'flex',
							// className={classes.mainContainer}
							padding: '10px',
							alignItems: 'flex-start',
							borderRadius: '5px',
							justifyContent: 'space-between'
						}}
					>
						<TableContainer component={Paper} className={classes.tblContainer}>
							<Table className={`${classes.table}`} aria-label="simple table">
								<TableHead className={classes.tableHead}>
									<TableRow hover style={{ fontSize: '14px' }}>
										<TableCell className={classes.tableCell} style={{ fontSize: '14px' }}>
											<Typography className="text-14 font-medium text-center">
												Employee Name
											</Typography>
										</TableCell>
										<TableCell style={{ fontSize: '14px' }} className={classes.tableCell}>
											<Typography className="text-14 font-medium text-center">
												Check Date
											</Typography>
										</TableCell>
										<TableCell style={{ fontSize: '14px' }} className={classes.tableCell}>
											<Typography className="text-14 font-medium text-center">
												Check Time
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{/* {Object.entries(attendance ? attendance : {}).map(
										([employeeName, employeeValue]) => {
											
											return (
												<Fragment key={employeeName}>
													{Object.entries(employeeValue ? employeeValue : {}).map(
														([employeeDetailsKey, employeeDetailsValue], index, array) => {
															const isLastRow = index === array.length - 1;
															
															return (
																<TableRow hover key={index}>
																	{index === 0 && (
																		<TableCell
																			rowSpan={array.length}
																			className={classes.tableCellInBody}
																			align="center"
																		>
																			{employeeName}
																		</TableCell>
																	)}
																	
																	<>
																		<TableCell
																			className={`text-12 font-medium p-5 ${
																				isLastRow ? classes.lastRow : null
																			}`}
																		>
																			{employeeDetailsKey}
																		</TableCell>
																		<TableCell
																			className={`text-12 font-medium p-5 ${
																				isLastRow ? classes.lastRow : null
																			}`}
																		>
																			{employeeDetailsValue?.in?.check_time}
																		</TableCell>
																		<TableCell
																			className={`text-12 font-medium p-5 ${
																				isLastRow ? classes.lastRow : null
																			}`}
																		>
																			{employeeDetailsValue?.out?.check_time}
																		</TableCell>
																	</>
																	
																</TableRow>
															);
														}
													)}
												</Fragment>
											);
										}
									)} */}
									{attendance.map(n => {
										return (
											<TableRow
												className="h-52 cursor-pointer"
												hover
												role="checkbox"
												// aria-checked={isSelected}
												tabIndex={-1}
												key={n.id}
											// selected={isSelected}
											>
												<TableCell
													className="whitespace-nowrap p-4 md:p-16"
													component="th"
													scope="row"
												>
													{n?.employee}
												</TableCell>
												<TableCell
													className="whitespace-nowrap p-4 md:p-16"
													component="th"
													scope="row"
												>
													{n?.check_date}
												</TableCell>
												<TableCell
													className="whitespace-nowrap p-4 md:p-16"
													component="th"
													scope="row"
												>
													{n?.check_time}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</>
			)}
			{/* </Paper> */}
		</>
	);
}
