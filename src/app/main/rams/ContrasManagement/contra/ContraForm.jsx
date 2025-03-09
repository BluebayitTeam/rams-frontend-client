/* eslint-disable no-unsafe-optional-chaining */
import { getAccountFormStyles } from '@fuse/utils/accountMakeStyles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Autocomplete,
	Button,
	Dialog,
	DialogContent,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {
	getBangladeshAllBanks,
	getBranches,
	getCurrencies,
	getLedgerBankCashs,
	getLedgers,
	getPassengers,
	getSubLedgers
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
import { BASE_URL, CHECK_BANK_OR_CASH, GET_LEDGER_CURRENT_BALANCE } from 'src/app/constant/constants';

const useStyles = makeStyles((theme) => ({
	...getAccountFormStyles(theme)
}));

function ContraForm({ setLetFormSave }) {
	const classes = useStyles();

	const dispatch = useDispatch();
	const methods = useFormContext();
	const { contraId } = useParams();

	const { control, formState, getValues, setValue, reset, watch } = methods;

	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const branchs = useSelector((state) => state.data.branches);
	const subLedgers = useSelector((state) => state.data.subLedgers);
	const ledgers = useSelector((state) => state.data.ledgers);
	const currencies = useSelector((state) => state.data.currencies);
	const accountName = ledgers.filter((data) => data?.head_group?.name === 'Bank Accounts');
	const bangladeshAllBanks = useSelector((state) => state.data.bangladeshAllBanks);
	const ledgerBankCashs = useSelector((state) => state.data.ledgerBankCashs);
	const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
	const [debitCreditMessage, setDebitCreditMessage] = useState('');
	const [haveEmptyLedger, setHaveEmptyLedger] = useState(true);
	const [ledgerMessage, setLedgerMessage] = useState('');
	const [checked, setChecked] = useState(!!contraId?.currency);
	const [checked3, setChecked3] = useState(
		localStorage.getItem('post_date') ? localStorage.getItem('post_date') : false
	);
	const [bankInfo, setBankInfo] = useState(getValues()?.items);
	const { fields, remove } = useFieldArray({
		control,
		name: 'items',
		keyName: 'key'
	});
	const values = getValues();

	console.log(`sbdkbfsdf`, getValues());
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getBranches());
		dispatch(getSubLedgers());
		dispatch(getLedgers());
		dispatch(getLedgerBankCashs());
		dispatch(getCurrencies());
		dispatch(getBangladeshAllBanks());
	}, []);

	const [file, setFile] = useState(null);
	useEffect(() => {
		const currentFile = getValues('file');

		if (currentFile && !currentFile.name) {
			setFile(`${BASE_URL}/${currentFile}`);
		}
	}, [contraId, watch('file')]);
	useEffect(() => {
		cheackDbCdEquality();
	}, [getValues()]);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	const handleChange3 = (event) => {
		setChecked3(event.target.checked);
	};
	const cheackDbCdEquality = async () => {
		const items = getValues()?.items || [];
		const totalDebitAmount = getTotalAmount(items || [], 'debit_amount');

		const totalCreditAmount = getTotalAmount(items || [], 'credit_amount');

		if (totalDebitAmount == totalCreditAmount) {
			setIsDebitCreditMatched(true);
			setDebitCreditMessage('Congratulations, Debit & Credit match...');
			// haveEmptyLedger || setLetFormSave(true);
		} else {
			setIsDebitCreditMatched(false);
			setDebitCreditMessage("Sorry, Debit and Credit doesn't match...");
			// setLetFormSave(false);
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
				// setLetFormSave(false);
			} else {
				setHaveEmptyLedger(false);
				setLedgerMessage('');
				// isDebitCreditMatched && setLetFormSave(true);
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

	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const handleCheckBankOrCash = (bankId, idx) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${CHECK_BANK_OR_CASH}${bankId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setValue(`items.${idx}.bank_or_cash`, data?.has_bank_accounts);

				if (data?.has_bank_accounts) {
					setSelectedId(idx);

					setModalOpen(true);
					setValue(`items.${idx}.is_cheque`, 'cheque');
				} else {
					setValue(`items.${idx}.cheque_no`, '');
					setValue(`items.${idx}.cheque_date`, '');
					setValue(`items.${idx}.balance`, 0);
				}
			});
	};
	const handleAutocompleteChange = (_event, newValue) => {
		// onChange(newValue?.id);
		checkEmptyLedger();

		if (newValue?.name === 'Bank') {
			setModalOpen(true);
		}
	};

	useEffect(() => {
		setBankInfo(watch('items'));
	}, [fields]);
	<Autocomplete onChange={handleAutocompleteChange} />;
	const handleGetLedgerCurrentBalance = (ledgerId, idx) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_LEDGER_CURRENT_BALANCE}?ledger=${ledgerId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				// fields[idx] = data?.total_balance;
				setValue(`items.${idx}.balance`, data?.total_balance || 0);
			});
	};

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
						value={value ? branchs?.find((data) => data.id === value) : null}
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
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<CustomDatePicker
				name="contra_date"
				label="Contra Date"
				required
				placeholder="DD-MM-YYYY"
			/>
			<Grid xs={12} >
				<div className={classes.mainContainer}>
					<TableContainer
						component={Paper}
						className={classes.tblContainer}
					>
						<Table
							className={classes.table}
							aria-label="simple table"
						>
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
											<TableCell className={classes.tableCellInBody}>
												<div>
													<div style={{ display: 'flex' }}>
														<Controller
															name={`items.${idx}.ledger`}
															control={control}
															render={({ field: { value, onChange } }) => (
																<Autocomplete
																	className="mt-8 mb-16"
																	freeSolo
																	options={ledgerBankCashs}
																	value={
																		value
																			? ledgerBankCashs?.find((data) => data.id == value)
																			: null
																	}
																	getOptionLabel={(option) => `${option.name}`}
																	InputLabelProps={{ shrink: true }}
																	onChange={(_event, newValue) => {
																		onChange(newValue?.id);
																		checkEmptyLedger();
																		handleCheckBankOrCash(newValue?.id, idx);
																		handleGetLedgerCurrentBalance(
																			newValue?.id,
																			idx
																		);
																	}}
																	renderInput={(params) => (
																		<TextField
																			{...params}
																			placeholder="Select a account"
																			label="Account"
																			style={{ width: '300px' }}
																			variant="outlined"
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
														<Controller
															name={`items.${idx}.bank_or_cash`}
															control={control}
															render={({ field }) => (
																<div className="mt-8 ">
																	{field?.value && (
																		<VisibilityIcon
																			style={{
																				marginTop: '10px',
																				marginLeft: '10px'
																			}}
																			onClick={() => {
																				setSelectedId(idx);
																				setModalOpen(true);
																			}}
																		/>
																	)}
																</div>
															)}
														/>
													</div>

													<Controller
														name={`items.${idx}.balance`}
														control={control}
														render={({ field }) => (
															<div className="mt-8 ">
																{field.value !== 0 && (
																	<Typography
																		style={{
																			color: field.value > 0 ? 'green' : 'red',
																			paddingLeft: '5px'
																		}}
																	>
																		Balance: {field.value}
																	</Typography>
																)}
															</div>
														)}
													/>
												</div>
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

			{isModalOpen && (
				<Dialog
					open={isModalOpen}
					onClose={() => setModalOpen(false)}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: '20px'
						}}
					>
						<Typography
							className="text-center m-10 "
							variant="h5"
							component="div"
						>
							Bank Details
						</Typography>
						<CloseIcon
							onClick={(event) => setModalOpen(false)}
							className="cursor-pointer custom-delete-icon-style mr-10"
						// style={{ color: 'red' }}
						/>
					</div>
					<DialogContent>
						{fields.map((item, idx) => {
							console.log("bank_details", item);
							return (
								<div>
									{idx === selectedId && (
										<div>
											<Controller
												name={`items.${idx}.is_cheque`}
												control={control}
												// defaultValue="" // Set the default value here
												render={({ field }) => (
													<RadioGroup
														value={field.value || (watch(`items.${idx}.cheque_no`) ? 'cheque_no' : watch(`items.${idx}.payorder_no`) ? 'payorder_no' : '')}
														// value={field.value} // Set the value directly
														style={{
															flexDirection: 'row'
														}}
														id={`items.${idx}.is_cheque`}
														onChange={(e) => {
															field.onChange(e.target.value); // Update the value in the field
														}}
													>
														<FormLabel
															disabled
															style={{
																marginRight: '1rem',
																marginTop: '1.5rem'
															}}
														>
															Select an option
														</FormLabel>
														<FormControlLabel
															value="cheque_no"
															control={<Radio />}
															label="Cheque"
														/>
														<FormControlLabel
															value="payorder_no"
															control={<Radio />}
															label="Pay Order"
														/>
													</RadioGroup>
												)}
											/>
											<Controller
												name={`items.${idx}.cheque_no`}
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16"
														error={!!errors.cheque_no}
														helperText={errors?.cheque_no?.message}
														label="Cheque/PO  No"
														id={`items.${idx}.cheque_no`}
														variant="outlined"
														fullWidth
														InputLabelProps={field.value ? { shrink: true } : {}}
													/>
												)}
											/>

											<CustomDatePicker
												name={`items.${selectedId}.cheque_date`}
												label="Cheque Date"
												required
												placeholder="DD-MM-YYYY"
											/>

											<Button
												className="whitespace-nowrap mx-4 text-center"
												variant="contained"
												color="secondary"
												onClick={() => {
													const updatedBankInfo = fields.map((item, idx) => {
														if (idx === selectedId) {
															return {
																...item,
																cheque_no: getValues(`items.${selectedId}.cheque_no`),
																is_cheque: getValues(`items.${selectedId}.is_cheque`),

																cheque_date: getValues(
																	`items.${selectedId}.cheque_date`
																)
															};
														}

														return item;
													});

													// Perform the reset operation
													reset({ ...getValues(), items: watch('items') });

													setModalOpen(false);
												}}
												style={{ backgroundColor: '#ea5b78', color: 'white' }}
											>
												Add
											</Button>
										</div>
									)}
								</div>
							);
						})}
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

export default ContraForm;
