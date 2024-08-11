/* eslint-disable no-unsafe-optional-chaining */
import { getAccountFormStyles } from '@fuse/utils/accountMakeStyles';
import { FormControl } from '@mui/base';
import {
	Autocomplete,
	Button,
	Checkbox,
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
	getLedgers,
	getPassengers,
	getSubLedgers
} from 'app/store/dataSlice';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { BASE_URL, CHECK_BANK_OR_CASH, GET_LEDGER_CURRENT_BALANCE } from 'src/app/constant/constants';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
import FileUpload from 'src/app/@components/FileUploader';

const useStyles = makeStyles((theme) => ({
	...getAccountFormStyles(theme)
}));

function ReceiptVoucherForm() {
	const classes = useStyles();

	const dispatch = useDispatch();
	const methods = useFormContext();
	const { receiptVoucherId } = useParams();

	const { control, formState, getValues, setValue, reset, watch } = methods;

	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const branchs = useSelector((state) => state.data.branches);
	const subLedgers = useSelector((state) => state.data.subLedgers);
	const ledgers = useSelector((state) => state.data.ledgers);
	const currencies = useSelector((state) => state.data.currencies);
	const accountName = ledgers.filter((data) => data?.head_group?.name === 'Bank Accounts');
	const bangladeshAllBanks = useSelector((state) => state.data.bangladeshAllBanks);

	const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
	const [debitCreditMessage, setDebitCreditMessage] = useState('');
	const [haveEmptyLedger, setHaveEmptyLedger] = useState(true);
	const [ledgerMessage, setLedgerMessage] = useState('');
	const [checked, setChecked] = useState(!!receiptVoucherId?.currency);
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
		dispatch(getCurrencies());
		dispatch(getBangladeshAllBanks());
	}, []);

	const [file, setFile] = useState(null);
	useEffect(() => {
		const currentFile = getValues('file');

		if (currentFile && !currentFile.name) {
			setFile(`${BASE_URL}/${currentFile}`);
		}
	}, [receiptVoucherId, watch('file')]);
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
		const totalDebitAmount = getTotalAmount(items || [], 'credit_amount') || 0;
		!watch('is_dual_mode') && setValue(`items.0.debit_amount`, totalDebitAmount);

		if (watch('is_foreign_currency')) {
			const ForeignTotalAmount = totalCreditAmount / getValues().currency_rate || 0;
			setValue(`currency_amount`, ForeignTotalAmount || 0);
		}

		const totalCreditAmount = getTotalAmount(items || [], 'credit_amount');

		if (totalDebitAmount === totalCreditAmount && totalDebitAmount > 0) {
			setIsDebitCreditMatched(true);
			setDebitCreditMessage('Congratulations, Debit & Credit match...');
		} else {
			setIsDebitCreditMatched(false);
			setDebitCreditMessage("Sorry, Debit and Credit doesn't match...");
		}
	};

	const checkEmptyLedger = async (itms) => {
		setTimeout(() => {
			const items = itms || watch(items) || [];

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
				isDebitCreditMatched;
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
		setValue(`items.${idx}.is_cheque`, '');

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

				if (data?.has_bank_accounts === true) {
					setSelectedId(idx);
					setModalOpen(true);
					setValue(`items.${idx}.is_cheque`, 'pay_order');
				} else {
					setValue(`items.${idx}.is_post_date`, false);
					setValue(`items.${idx}.cheque_no`, '');
					setValue(`items.${idx}.is_cheque`, 'cheque');
					setValue(`items.${idx}.balance`, 0);
					setValue(`items.${idx}.inst_no`, '');
					setValue(`items.${idx}.cheque_date`, '');
					setValue(`items.${idx}.bank_name`, '');
					setValue(`items.${idx}.bank_or_cash`, false);
					setValue(`items.${idx}.pdc_note`, '');
					setValue(`items.${idx}.remarks`, '');
					setValue(`items.${idx}.favouring_name`, '');
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
				setValue(`items.${idx}.balance`, data?.total_balance || 0);
			});
	};

	useEffect(() => {
		if (watch('is_dual_mode') || fields?.length > 2) {
			setValue('is_foreign_currency', false);
			setValue('currency_rate', 0);
			setValue('currency_amount', 0);
			setValue('currency', '');
		}
	}, [watch('is_dual_mode'), watch('is_foreign_currency')]);
	useEffect(() => {
		if (!watch('is_foreign_currency')) {
			setValue('currency_rate', 0);
			setValue('currency_amount', 0);
			setValue('currency', '');
		}
	}, [watch('is_foreign_currency')]);
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
						value={value ? branchs.find((data) => data.id === value) : null}
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

			<Controller
				name="passenger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						autoHighlight
						options={passengers}
						value={value ? passengers.find((data) => data.id === value) : null}
						getOptionLabel={(option) =>
							`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
						}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
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
						value={value ? subLedgers.find((data) => data.id == value) : null}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
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

			<CustomDatePicker
				name="receipt_date"
				label="Receipt Date"
				required
				placeholder="DD-MM-YYYY"
			/>

			<div className="flex">
				<Controller
					name="is_foreign_currency"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Foreign Currency"
								control={
									<Checkbox
										{...field}
										checked={field.value ? field.value : false}
									/>
								}
							/>
						</FormControl>
					)}
				/>
				<Controller
					name="is_dual_mode"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Dual Mode"
								control={
									<Checkbox
										{...field}
										checked={field.value ? field.value : false}
									/>
								}
							/>
						</FormControl>
					)}
				/>
			</div>
			{watch('is_foreign_currency') && (
				<div
					style={{
						backgroundColor: 'rgb(243 239 239)',
						padding: '10px'
					}}
				>
					<Controller
						name="currency"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								options={currencies}
								value={value ? currencies.find((data) => data.id == value) : null}
								getOptionLabel={(option) => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Currency "
										label="Currency"
										id="currency"
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
						name="currency_rate"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16"
									error={!!errors.name}
									helperText={errors?.name?.message}
									label="Rate"
									id="currency_rate"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="currency_amount"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16"
									error={!!errors.name}
									helperText={errors?.name?.message}
									label="Amount"
									id="currency_amount"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
									InputProps={{
										readOnly: true
									}}
								/>
							);
						}}
					/>
				</div>
			)}

			<div
				style={{
					display: checked3 ? 'block' : 'none',
					backgroundColor: 'rgb(246 254 250)',
					padding: '10px'
				}}
			>
				<Controller
					name="cheque_no"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.cheque_no}
							helperText={errors?.cheque_no?.message}
							label="Cheque  No"
							id="cheque_no"
							variant="outlined"
							fullWidth
							InputLabelProps={field.value && { shrink: true }}
						/>
					)}
				/>

				<CustomDatePicker
					name="rp_date"
					label="Payment Date"
					required
					placeholder="DD-MM-YYYY"
				/>

				<Controller
					name="rp_bank_id"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16"
							freeSolo
							options={accountName}
							value={value ? accountName.find((data) => data.id == value) : null}
							getOptionLabel={(option) => `${option?.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Bank Account Name"
									label="Bank Account Name"
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
					name="pdc_note"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								value={field.value || ''}
								className="mt-8 mb-16"
								label="Note"
								id="pdc_note"
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

			<br />
			<Grid xs={12}>
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
												<div style={{ display: 'flex' }}>
													<Controller
														name={`items.${idx}.ledger`}
														control={control}
														render={({ field: { onChange, value } }) => (
															<Autocomplete
																freeSolo
																options={ledgers}
																value={
																	value
																		? ledgers.find((data) => data.id === value)
																		: null
																}
																getOptionLabel={(option) => `${option.name}`}
																onChange={(_event, newValue) => {
																	if (newValue) {
																		onChange(newValue.id);
																		checkEmptyLedger();
																		handleCheckBankOrCash(newValue.id, idx);
																		handleGetLedgerCurrentBalance(newValue.id, idx);
																	} else {
																		onChange(null);
																	}
																}}
																renderInput={(params) => (
																	<TextField
																		{...params}
																		placeholder="Select an account"
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
												<div>
													<Controller
														name={`items.${idx}.balance`}
														control={control}
														render={({ field }) => (
															<div className="mt-8 ">
																{field.value != 0 && (
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
																		!watch('is_dual_mode') &&
																			setValue(`items.${idx}.credit_amount`, 0);
																		cheackDbCdEquality();
																	}
																}}
																variant="outlined"
																InputLabelProps={{ shrink: true }}
																fullWidth
																disabled={
																	!!(
																		receiptVoucherId === 'new' &&
																		idx != 0 &&
																		!watch('is_dual_mode')
																	)
																}
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
																		!watch('is_dual_mode') &&
																			setValue(`items.${idx}.debit_amount`, 0);
																		cheackDbCdEquality();
																	}
																}}
																variant="outlined"
																InputLabelProps={{ shrink: true }}
																fullWidth
																disabled={
																	!!(
																		receiptVoucherId === 'new' &&
																		idx === 0 &&
																		!watch('is_dual_mode')
																	)
																}
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
														{watch('passenger') ? (
															<div
																variant="outlined"
																className={classes.btnContainer}
															>
																<AddIcon />
															</div>
														) : (
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
														)}
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
			<br />
			<div className="text-center">
				<div>
					<FileUpload
						name="file"
						label="File"
						control={control}
						setValue={setValue}
						setFile={setFile}
						file={file}
						BASE_URL={BASE_URL}
						classes={classes}
					/>
				</div>
			</div>
			{/* <File name='file' label='File' /> */}
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
							className="text-center m-10"
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
					</div>{' '}
					<DialogContent>
						{fields?.map((item, idx) => {
							return (
								<div>
									{idx === selectedId && (
										<div>
											<Controller
												name={`items.${idx}.is_post_date`}
												control={control}
												render={({ field }) => (
													<FormControl>
														<FormControlLabel
															label="Post Date"
															control={
																<Checkbox
																	{...field}
																	checked={field.value ? field.value : false}
																/>
															}
														/>
													</FormControl>
												)}
											/>

											<Controller
												name={`items.${idx}.is_cheque`}
												control={control}
												// defaultValue="" // Set the default value here
												render={({ field }) => (
													<RadioGroup
														value={field.value} // Set the value directly
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
															value="cheque"
															control={<Radio />}
															label="Cheque"
														/>
														<FormControlLabel
															value="pay_order"
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
														label={
															watch(`items.${idx}.is_cheque`) === 'cheque'
																? 'Cheque No'
																: 'Payorder No'
														}
														id={`items.${idx}.cheque_no`}
														variant="outlined"
														fullWidth
														InputLabelProps={field.value ? { shrink: true } : {}}
													/>
												)}
											/>

											<Controller
												name={`items.${selectedId}.bank_name`}
												control={control}
												render={({ field: { onChange, value } }) => (
													<Autocomplete
														className="mt-8 mb-16"
														freeSolo
														autoHighlight
														options={bangladeshAllBanks}
														value={
															value
																? bangladeshAllBanks.find((data) => data.id == value)
																: null
														}
														getOptionLabel={(option) => `${option.name}`}
														InputLabelProps={{ shrink: true }}
														onChange={(_event, newValue) => {
															onChange(newValue?.id);
															checkEmptyLedger();
														}}
														renderInput={(params) => (
															<TextField
																{...params}
																style={{ display: 'none' }}
																placeholder="Select a Bank Name Of Cheque/PO "
																label="Bank Name Of Cheque/PO "
																variant="outlined"
																// error={!value}
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
												name={`items.${selectedId}.favouring_name`}
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16"
														error={!!errors.favouring_name}
														helperText={errors?.favouring_name?.message}
														label="Favouring Name"
														id="favouring_name"
														variant="outlined"
														fullWidth
														InputLabelProps={field.value && { shrink: true }}
													/>
												)}
											/>

											<CustomDatePicker
												name={`items.${selectedId}.cheque_date`}
												label="Cheque Date"
												required
												placeholder="DD-MM-YYYY"
											/>

											<Controller
												name={`items.${selectedId}.pdc_note`}
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16"
														error={!!errors.pdc_note}
														helperText={errors?.pdc_note?.message}
														label="PDC Note"
														id="pdc_note"
														variant="outlined"
														fullWidth
														InputLabelProps={field.value && { shrink: true }}
													/>
												)}
											/>

											<Button
												className="whitespace-nowrap mx-4"
												variant="contained"
												color="secondary"
												onClick={() => {
													const updatedBankInfo = fields?.map((item, idx) => {
														if (idx === selectedId) {
															return {
																...item,
																is_post_date: getValues(
																	`items.${selectedId}.is_post_date`
																),
																cheque_no: getValues(`items.${selectedId}.cheque_no`),
																is_cheque: getValues(`items.${selectedId}.is_cheque`),
																inst_no: getValues(`items.${selectedId}.inst_no`),
																bank_name: getValues(`items.${selectedId}.bank_name`),
																favouring_name: getValues(
																	`items.${selectedId}.favouring_name`
																),
																cheque_date: getValues(
																	`items.${selectedId}.cheque_date`
																),
																pdc_note: getValues(`items.${selectedId}.pdc_note`),
																remarks: getValues(`items.${selectedId}.remarks`)
															};
														}

														return item;
													});
													reset({ ...getValues(), items: watch('items') });
													setModalOpen(false);
												}}
												style={{ backgroundColor: '#ea5b78', color: 'white' }}
											>
												Save
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

export default ReceiptVoucherForm;
