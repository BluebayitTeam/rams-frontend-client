import {
	Grid,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import getTotalAmount from 'app/@helpers/getTotalAmount';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getBranches, getLedgers, getPassengers, getSubLedgers } from '../../../../../store/dataSlice';

const useStyles = makeStyles(theme => {
	console.log('theme', theme);
	return {
		mainContainer: {
			width: '100%',
			border: `2px solid ${theme.palette.primary.dark}`,
			borderRadius: '5px',
			height: 'fit-content',
			display: 'flex',
			alignItems: 'flex-start',
			justifyContent: 'space-between',
			padding: '20px'
		},
		btnContainer: {
			cursor: 'pointer',
			borderRadius: '3px',
			fontWeight: 'bold',
			borderWidth: '2px',
			height: '50px',
			width: '50px',
			margin: 'auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.palette.primary.dark,
			color: theme.palette.background.default,
			'&:hover': {
				backgroundColor: theme.palette.background.default,
				color: theme.palette.primary.dark,
				borderColor: theme.palette.primary.dark
			}
		},
		tblContainer: {
			borderRadius: '5px'
		},
		table: {
			minWidth: 600
		},
		tableHead: {
			backgroundColor: theme.palette.primary.main
		},
		tableCell: {
			color: theme.palette.background.paper
		},
		tableCellInBody: {
			border: `1px solid ${theme.palette.primary.dark}`,
			fontWeight: 'bold',
			color: theme.palette.primary.dark
		}
	};
});

function PaymentVoucherForm() {
	const classes = useStyles();
	const methods = useFormContext();
	const { paymentVoucherId } = useParams();
	const { control, formState, getValues, setValue, reset } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();
	const passengers = useSelector(state => state.data.passengers);
	const branchs = useSelector(state => state.data.branches);
	const subLedgers = useSelector(state => state.data.subLedgers);
	const ledgers = useSelector(state => state.data.ledgers);

	const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
	const [debitCreditMessage, setDebitCreditMessage] = useState('');
	// const [debitCreditMessage, setDebitCreditMessage] = useState('');

	const values = getValues();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
		keyName: 'key'
	});

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getBranches());
		dispatch(getSubLedgers());
		dispatch(getLedgers());
	}, []);

	const cheackEquality = items => {
		const totalDebitAmount = getTotalAmount(items, 'debit_amount');
		const totalCreditAmount = getTotalAmount(items, 'credit_amount');
	};

	console.log('values', values);

	return (
		<div>
			<Controller
				name="passenger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? passengers.find(data => data.id == value) : null}
						options={passengers}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								error={!!errors.passenger}
								helperText={errors?.passenger?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="branch"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? branchs.find(data => data.id == value) : null}
						options={branchs}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Branch"
								label="Branch"
								error={!!errors.branch}
								helperText={errors?.branch?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="sub_ledger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? subLedgers.find(data => data.id == value) : null}
						options={subLedgers}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Sub Ledger"
								label="Sub Ledger"
								error={!!errors.sub_ledger}
								helperText={errors?.sub_ledger?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="payment_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Payment Date" />;
				}}
			/>

			<Controller
				name="details"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.details}
							helperText={errors?.details?.message}
							label="Details"
							id="details"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<br />
			<Grid xs={12}>
				<div className={classes.mainContainer}>
					<TableContainer component={Paper} className={classes.tblContainer}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead className={classes.tableHead}>
								<TableRow>
									<TableCell className={classes.tableCell}>No.</TableCell>
									<TableCell className={classes.tableCell} align="center">
										Account Type
									</TableCell>
									<TableCell className={classes.tableCell} align="center">
										Dr
									</TableCell>
									<TableCell className={classes.tableCell} align="center">
										Cr
									</TableCell>
									<TableCell className={classes.tableCell} align="center">
										Action
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{/* {fields.map((item, idx) => {
									return (
										<li key={item.id}>
											<Controller
												render={({ field }) => <input {...field} />}
												name={`test.${idx}.lastName`}
												control={control}
											/>
											<button type="button" onClick={() => remove(idx)}>
												Delete
											</button>
										</li>
									);
								})} */}
								{fields.map((item, idx) => {
									console.log('item', item);
									return (
										<TableRow key={item.key}>
											<TableCell className={classes.tableCellInBody} component="th" scope="row">
												{idx + 1}
											</TableCell>
											<TableCell className={classes.tableCellInBody}>
												<Controller
													name={`items.${idx}.ledger`}
													control={control}
													render={({ field: { onChange, value } }) => (
														<Autocomplete
															className="mt-8 mb-16"
															freeSolo
															value={
																value
																	? ledgers.find(ledger => ledger.id === value)
																	: null
															}
															options={ledgers}
															getOptionLabel={option => `${option.name}`}
															InputLabelProps={{ shrink: true }}
															onChange={(_event, newValue) => {
																onChange(newValue?.id);
															}}
															renderInput={params => (
																<TextField
																	{...params}
																	placeholder="Select a account"
																	label="Account"
																	error={!!errors.ledger}
																	required
																	helperText={errors?.ledger?.message}
																	variant="outlined"
																	autoFocus
																	InputLabelProps={{
																		shrink: true
																	}}
																/>
															)}
														/>
													)}
												/>
											</TableCell>
											<TableCell className={classes.tableCellInBody}>
												<Controller
													name={`items.${idx}.debit_amount`}
													control={control}
													render={({ field }) => {
														return (
															<TextField
																{...field}
																className="mt-8 mb-16"
																label="Debit"
																id="debit"
																required
																onChange={e => {
																	field.onChange(e);
																}}
																variant="outlined"
																InputLabelProps={{ shrink: true }}
																fullWidth
																disabled={!!(paymentVoucherId === 'new' && idx === 0)}
															/>
														);
													}}
												/>
											</TableCell>
											<TableCell className={classes.tableCellInBody}>
												<Controller
													name={`items.${idx}.credit_amount`}
													control={control}
													render={({ field }) => {
														return (
															<TextField
																{...field}
																className="mt-8 mb-16"
																label="Credit"
																id="credit"
																required
																variant="outlined"
																InputLabelProps={{ shrink: true }}
																fullWidth
															/>
														);
													}}
												/>
											</TableCell>
											{idx === 0 && (
												<TableCell
													className="p-0 md:p-0"
													align="center"
													component="th"
													scope="row"
													style={{ minWidth: '80px' }}
												>
													<div>
														<div
															variant="outlined"
															className={classes.btnContainer}
															onClick={() =>
																append({
																	ledger: null,
																	debit_amount: 0,
																	credit_amount: 0
																})
															}
														>
															<AddIcon />
														</div>
													</div>
												</TableCell>
											)}
											{idx !== 0 && idx !== 1 && (
												<TableCell
													className="p-0 md:p-0"
													align="center"
													component="th"
													scope="row"
													style={{ minWidth: '80px' }}
												>
													<div>
														<DeleteIcon
															onClick={() => remove(idx)}
															className="h-72 cursor-pointer"
															style={{ color: 'red' }}
														/>
													</div>
												</TableCell>
											)}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					{'ledgerError' && <Typography style={{ color: 'red' }}>{'ledgerError'}</Typography>}
					{'debitCreditErrorMessage' && (
						<Typography style={{ color: 'debitAndCreditMatched' ? 'green' : 'red' }}>
							{'debitCreditErrorMessage'}
						</Typography>
					)}
				</div>
			</Grid>
		</div>
	);
}

export default PaymentVoucherForm;
