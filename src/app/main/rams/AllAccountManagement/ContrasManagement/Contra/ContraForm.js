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
import { getAccountFormStyles } from '../../AccountUtils/accountMakeStyles';

const useStyles = makeStyles(theme => ({
	...getAccountFormStyles(theme)
}));

function ContraForm({ setLetFormSave }) {
	const classes = useStyles();
	const contra = useSelector(({ contrasManagement }) => contrasManagement.contra);
	const { contraId } = useParams();
	const methods = useFormContext();
	const { control, formState, getValues, setValue, reset } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();
	const passengers = useSelector(state => state.data.passengers);
	const branchs = useSelector(state => state.data.branches);
	const subLedgers = useSelector(state => state.data.subLedgers);
	const ledgers = useSelector(state => state.data.ledgers);

	const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
	const [debitCreditMessage, setDebitCreditMessage] = useState('');
	const [haveEmptyLedger, setHaveEmptyLedger] = useState(true);
	const [ledgerMessage, setLedgerMessage] = useState('');

	const values = getValues();

	const { fields, remove } = useFieldArray({
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

	const cheackDbCdEquality = async () => {
		const items = getValues()?.items || [];
		const totalDebitAmount = getTotalAmount(items || [], 'debit_amount');
		const totalCreditAmount = getTotalAmount(items || [], 'credit_amount');
		if (totalDebitAmount == totalCreditAmount) {
			setIsDebitCreditMatched(true);
			setDebitCreditMessage('Congratulations, Debit & Credit match...');
			haveEmptyLedger || setLetFormSave(true);
		} else {
			setIsDebitCreditMatched(false);
			setDebitCreditMessage("Sorry, Debit and Credit doesn't match...");
			setLetFormSave(false);
		}
	};

	const checkEmptyLedger = async itms => {
		const items = itms || getValues()?.items || [];

		let isLedgerEmpty = false;
		items.map(itm => {
			if (!itm?.ledger) {
				isLedgerEmpty = true;
			}
		});

		if (isLedgerEmpty) {
			setHaveEmptyLedger(true);
			setLedgerMessage('Account type is required');
			setLetFormSave(false);
		} else {
			setHaveEmptyLedger(false);
			setLedgerMessage('');
			isDebitCreditMatched && setLetFormSave(true);
		}
	};

	useEffect(() => {
		checkEmptyLedger(contra?.items || []);
	}, [contra]);

	console.log('values', values);

	return (
		<div>
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
						disabled={!!value}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Branch"
								label="Branch"
								error={!!errors.branch || !value}
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
								error={!!errors.sub_ledger || !value}
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
				name="contra_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Contra Date" />;
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
								{fields.map((item, idx) => {
									return (
										<TableRow key={item.key}>
											<TableCell className={classes.tableCellInBody} component="th" scope="row">
												{idx + 1}
											</TableCell>
											<TableCell className={classes.tableCellInBody}>
												<Controller
													name={`items.${idx}.ledger`}
													control={control}
													render={({ field: { value } }) => (
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
																setValue(`items.${idx}.ledger`, newValue?.id);
																checkEmptyLedger();
															}}
															renderInput={params => (
																<TextField
																	{...params}
																	placeholder="Select a account"
																	label="Account"
																	required
																	variant="outlined"
																	autoFocus
																	error={!value}
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
																	const value = e.target.value;
																	if (!isNaN(value)) {
																		setValue(
																			`items.${idx}.debit_amount`,
																			value?.slice(-1) == '.'
																				? value
																				: Number(value)
																		);
																		setValue(`items.${idx}.credit_amount`, 0);
																		cheackDbCdEquality();
																	}
																}}
																variant="outlined"
																InputLabelProps={{ shrink: true }}
																fullWidth
																disabled={!!(contraId === 'new' && idx === 0)}
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
																onChange={e => {
																	const value = e.target.value;
																	if (!isNaN(value)) {
																		setValue(
																			`items.${idx}.credit_amount`,
																			value?.slice(-1) == '.'
																				? value
																				: Number(value)
																		);
																		setValue(`items.${idx}.debit_amount`, 0);
																		cheackDbCdEquality();
																	}
																}}
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
															onClick={() => {
																reset({
																	...getValues(),
																	items: [
																		...getValues()?.items,
																		{
																			ledger: null,
																			debit_amount: 0,
																			credit_amount: 0
																		}
																	]
																});
																checkEmptyLedger();
															}}
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
															onClick={() => {
																remove(idx);
																cheackDbCdEquality();
																checkEmptyLedger();
															}}
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
					{<Typography style={{ color: 'red' }}>{ledgerMessage}</Typography>}
					{debitCreditMessage && (
						<Typography style={{ color: isDebitCreditMatched ? 'green' : 'red' }}>
							{debitCreditMessage}
						</Typography>
					)}
				</div>
			</Grid>
		</div>
	);
}

export default ContraForm;
