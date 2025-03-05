/* eslint-disable no-unsafe-optional-chaining */
import { getAccountFormStyles } from '@fuse/utils/accountMakeStyles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Autocomplete,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { getBranches, getLedgers, getLedgersWithoutBankCash, getPassengers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';

const useStyles = makeStyles((theme) => ({
	...getAccountFormStyles(theme)
}));

function JournalForm() {
	const classes = useStyles();

	const dispatch = useDispatch();
	const methods = useFormContext();
	const { journalId } = useParams();

	const { control, formState, getValues, setValue, reset, watch } = methods;

	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const branchs = useSelector((state) => state.data.branches);
	const subLedgers = useSelector((state) => state.data.subLedgers);
	const ledgers = useSelector((state) => state.data.ledgers);
	const currencies = useSelector((state) => state.data.currencies);
	const accountName = ledgers.filter((data) => data?.head_group?.name === 'Bank Accounts');
	const bangladeshAllBanks = useSelector((state) => state.data.bangladeshAllBanks);
	const ledgersWithoutCashAndBank = useSelector((state) => state.data.ledgersWithoutCashAndBank);
	const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
	const [debitCreditMessage, setDebitCreditMessage] = useState('');
	const [haveEmptyLedger, setHaveEmptyLedger] = useState(true);
	const [ledgerMessage, setLedgerMessage] = useState('');

	const [bankInfo, setBankInfo] = useState(getValues()?.items);
	const { fields, remove } = useFieldArray({
		control,
		name: 'items',
		keyName: 'key'
	});
	const values = getValues();

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getBranches());
		dispatch(getSubLedgers());
		dispatch(getLedgers());
		dispatch(getLedgersWithoutBankCash());
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
		}
	};

	const checkEmptyLedger = async (itms) => {
		setTimeout(() => {
			const items = itms || getValues()?.items || [];

			let isLedgerEmpty = false;
			items.map((itm) => {
				if (!itm?.ledger) {
					isLedgerEmpty = true;
				}
			});

			if (isLedgerEmpty) {
				setHaveEmptyLedger(true);
				setLedgerMessage('Account type is required   ');
			} else {
				setHaveEmptyLedger(false);
				setLedgerMessage('');
			}
		}, 0);
	};

	useEffect(() => {
		checkEmptyLedger(watch('items') || []);
	}, [getValues()]);

	// rerender feildsArray after ledgers fetched otherwise ledger's option not be shown
	useEffect(() => {
		reset({ ...getValues(), items: watch('items') });
	}, [ledgers]);

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
						value={value ? branchs.find((data) => data.id == value) : null}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						disabled={!!value}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Branch"
								label="Branch"
								variant="outlined"
								readonly
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<CustomDatePicker
				name="journal_date"
				label="Journal Date"
				required
				placeholder="DD-MM-YYYY"
			/>

			<Grid
				xs={12}
				className="mt-10"
			>
				<div className={classes.mainContainer}>
					<TableContainer
						component={Paper}
						className={classes.tblContainer}
					>
						<Table
							className={classes.table}
							aria-label="simple table"
						>
							{/* <TableHead className={classes.tableHead}>
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
							</TableHead> */}

							<TableBody>
								{fields.map((item, idx) => {
									return (
										<TableRow key={item.key}>
											<TableCell
												className={classes.tableCellInBody}
												component="th"
												scope="row"
											>
												{idx + 1}
											</TableCell>
											<TableCell className={classes.tableCellInBody} style={{ minWidth: '300px' }}>
												<Controller
													name={`items.${idx}.ledger`}
													control={control}
													render={({ field: { value, onChange } }) => (
														<Autocomplete
															className="mt-8 mb-16"
															freeSolo
															options={ledgersWithoutCashAndBank}
															value={
																value ? ledgersWithoutCashAndBank.find((data) => data.id == value) : null
															}
															getOptionLabel={(option) => `${option.name} ${option.ledger_code !== null ? ` - ${option.ledger_code}` : ''}`}
															InputLabelProps={{ shrink: true }}
															onChange={(_event, newValue) => {
																onChange(newValue?.id);
																checkEmptyLedger();
															}}
															renderInput={(params) => (
																<TextField
																	{...params}
																	placeholder="Select a account"
																	label="Account"
																	variant="outlined"
																	autoFocus
																	// error={!value}
																	// InputLabelProps={{
																	// 	shrink: true
																	// }}

																	InputLabelProps={
																		value
																			? { shrink: true }
																			: { style: { color: 'red' } }
																	}
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
																onChange={(e) => {
																	const { value } = e.target;

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
																onChange={(e) => {
																	const { value } = e.target;

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
																const values = getValues();
																reset({
																	...values,
																	items: [
																		...values?.items,
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
					<Typography style={{ color: 'red' }}>{ledgerMessage}</Typography>
					{debitCreditMessage && (
						<Typography style={{ color: isDebitCreditMatched ? 'green' : 'red' }}>
							{debitCreditMessage}
						</Typography>
					)}
				</div>
			</Grid>
			<br />
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
		</div>
	);
}

export default JournalForm;
