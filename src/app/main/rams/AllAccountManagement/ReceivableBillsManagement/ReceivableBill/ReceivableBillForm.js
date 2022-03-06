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
import File from 'app/@components/File';
import getTotalAmount from 'app/@helpers/getTotalAmount';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getLedgers, getPassengers, getSubLedgers } from '../../../../../store/dataSlice';
import { getAccountFormStyles } from '../../AccountUtils/accountMakeStyles';

const useStyles = makeStyles(theme => ({
	...getAccountFormStyles(theme)
}));

function ReceivableBillForm({ setLetFormSave, setExtraItem }) {
	const classes = useStyles();
	const receivableBill = useSelector(({ receivableBillsManagement }) => receivableBillsManagement.receivableBill);
	const methods = useFormContext();
	const { control, formState, getValues, setValue, reset, watch } = methods;
	const dispatch = useDispatch();
	const passengers = useSelector(state => state.data.passengers);
	const branchs = useSelector(state => state.data.branches);
	const subLedgers = useSelector(state => state.data.subLedgers);
	const ledgers = useSelector(state => state.data.ledgers);

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

	useEffect(() => {
		const ledgerCompanyPurchaseId = ledgers?.find(data => data?.name === 'Company Sales')?.id;
		setExtraItem(item => ({ ...item, ledger: ledgerCompanyPurchaseId }));
	}, [ledgers]);

	const setExtraItemState = async () => {
		const items = getValues()?.items || [];
		const totalDebitAmount = getTotalAmount(items || [], 'debit_amount');
		setExtraItem(item => ({ ...item, credit_amount: totalDebitAmount }));
	};

	const checkEmptyLedger = async itms => {
		setTimeout(() => {
			const items = itms || getValues()?.items || [];

			let isLedgerEmpty = false;
			items.map(itm => {
				if (!itm.ledger) {
					isLedgerEmpty = true;
				}
			});

			if (isLedgerEmpty) {
				setLedgerMessage('Account type is required');
				setLetFormSave(false);
			} else {
				setLedgerMessage('');
				setLetFormSave(true);
			}
		}, 0);
	};

	useEffect(() => {
		checkEmptyLedger(receivableBill?.items || []);
	}, [receivableBill]);

	useEffect(() => {
		console.log('ledger updated');
	}, [ledgers]);

	//rerender feildsArray after ledgers fetched otherwise ledger's option not be shown
	useEffect(() => {
		reset({ ...getValues(), items: watch('items') });
	}, [ledgers]);

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
						options={branchs}
						value={value ? branchs.find(data => data.id == value) : null}
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
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="passenger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						autoHighlight
						options={passengers}
						value={value ? passengers.find(data => data.id == value) : null}
						getOptionLabel={option =>
							`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
						}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
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

			<Controller
				name="sub_ledger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						options={subLedgers}
						value={value ? subLedgers.find(data => data.id == value) : null}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Sub Ledger"
								label="Sub Ledger"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="sales_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Sales Date" required />;
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

			<File name="file" label="File" />
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
													render={({ field: { onChange, value } }) => (
														<Autocomplete
															className="mt-8 mb-16"
															freeSolo
															options={ledgers}
															value={
																value ? ledgers.find(data => data.id == value) : null
															}
															getOptionLabel={option => `${option.name}`}
															InputLabelProps={{ shrink: true }}
															onChange={(_event, newValue) => {
																onChange(newValue?.id);
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
																		setExtraItemState();
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
																disabled
															/>
														);
													}}
												/>
											</TableCell>
											{idx === 0 ? (
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
											) : (
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
																setExtraItemState();
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
				</div>
			</Grid>
		</div>
	);
}

export default ReceivableBillForm;
