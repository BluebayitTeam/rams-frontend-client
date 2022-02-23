import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addPPTableRow } from '../store/makeAListReportSlice';

const useStyles = makeStyles(theme => ({
	ppContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: '10px 0px',
		'& > div': {
			paddingTop: '10px',
			borderTop: `1px solid ${theme.palette.primary.main}`,
			minWidth: '200px'
		}
	}
}));

const MakeAListPPTable = () => {
	const classes = useStyles();

	const methods = useFormContext();
	const { getValues, control } = methods;
	const values = getValues();

	const passengers = useSelector(state => state.data.passengers);

	const dispatch = useDispatch();

	const ppTableRows = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeALists.ppTableRows);

	useEffect(() => {
		dispatch(getPassengers());
	}, []);

	return (
		<>
			<div className={classes.ppContainer}>
				<Controller
					name="passenger"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							freeSolo
							autoHighlight
							options={passengers}
							value={value ? passengers.find(data => data.id == value) : null}
							getOptionLabel={option =>
								`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
							}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
								dispatch(addPPTableRow(newValue?.id));
							}}
							renderInput={params => (
								<TextField
									{...params}
									size="small"
									placeholder="Select Passenger"
									label="Passenger"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					)}
				/>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<td>Sl.No</td>
							<td>ID</td>
							<td>Name</td>
							<td>Passport</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{ppTableRows?.map(ppRow => (
							<tr>
								<td>{ppRow.passenger_id}</td>
								<td>{ppRow.passenger_name}</td>
								<td>{ppRow.passenger_id}</td>
								<td>{ppRow.passport_no}</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default MakeAListPPTable;
