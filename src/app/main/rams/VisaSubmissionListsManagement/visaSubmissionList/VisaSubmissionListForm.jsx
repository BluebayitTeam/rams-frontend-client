/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getAgencys, getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { makeStyles } from '@mui/styles';
import { Search } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { MANPOWER_SUBMISSION_LIST_FOOTER } from 'src/app/constant/FormContentTitle/formContentTitle';

const useStyles = makeStyles(theme => ({
	searchContainer: ({ isPassenger }) => ({
		color: theme.palette.primary.main,
		background: 'transparent',
		borderColor: theme.palette.primary.main,
		cursor: isPassenger && 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid',
		height: '52px',
		width: '52px',
		marginTop: '8px',
		borderRadius: '5px',
		'&:hover': {
			color: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.light : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main
		},
		'&:active': {
			color: isPassenger ? theme.palette.primary.light : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.dark : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.light : theme.palette.primary.main
		}
	})
}));

function VisaSubmissionListForm({
	handleSearchPassengerClick,
	handleSearchManPowerDateClick,
	handleCreateVisaSubmissionList,
	handleCancel
}) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { watch } = methods;

	const { agencies, passengers } = useSelector((state) => state.data);
	const [cancelList, setCancelList] = useState(false);
	const [newList, setNewList] = useState(true);

	const handlecancelList = event => {
		setCancelList(event.target.checked);
		dispatch(getVisaSubmissionList({ submission_date: watch('submission_date') }));

		sessionStorage.setItem('CancelVisaList', event.target.checked);
	};
	const handlenewList = event => {
		setNewList(event.target.checked);
		dispatch(getVisaSubmissionList({ submission_date: watch('submission_date') }));

		sessionStorage.setItem('NewVisaList', event.target.checked);
	};


	const classes = useStyles({ isPassenger: watch('passenger') });

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
	}, []);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${MANPOWER_SUBMISSION_LIST_FOOTER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentFooterData', data?.formcontent_detail[0]?.details || '')
			);
	}, []);


	function handleSaveNewVisaSubmissionList() {
		dispatch(
			saveVisaSubmissionList({
				submission_date: getValues().submission_date,
				agency: getValues().agency,
				passenger: getValues().passenger,
				list_type: 'new'
			})
		).then(res => {
			if (res?.payload?.data?.id) {
				dispatch(getVisaSubmissionList({ submission_date: getValues().submission_date }));
			} else {
				setError('passenger', {
					type: 'manual',
					message: `This Passenger has already assigned`
				});
			}
		});
	}
	function handleSaveCancelVisaSubmissionList() {
		dispatch(
			saveVisaSubmissionList({
				submission_date: getValues().submission_date,
				agency: getValues().agency,
				passenger: getValues().cancelpassenger,
				list_type: 'cancel'
			})
		).then(res => {
			if (res?.payload?.data?.id) {
				dispatch(getVisaSubmissionList({ submission_date: getValues().submission_date }));

				dispatch(getVisaSubmissionList({ submission_date: getValues().submission_date })).then(res => {
					if (res.payload?.data?.id) {
						console.log(`clicked`);
					} else if (res.payload?.data?.detail) {
						setError('passenger', { type: 'manual', message: res.payload.data.detail });
					}
				});
			} else {
				setError('cancelpassenger', {
					type: 'manual',
					message: `This Passenger has already assigned`
				});
			}
		});
	}


	return (
		// <div>
		// 	<CustomDropdownField
		// 		name="agency"
		// 		label="Agency"
		// 		options={agencies}
		// 		optionLabelFormat={(option) => `${option?.name}`}
		// 	/>
		// 	<CustomDropdownField
		// 		name="country"
		// 		label="Country"
		// 		options={countries}
		// 		optionLabelFormat={(option) => `${option?.name}`}
		// 	/>

		// 	<div className="flex flex-nowrap">
		// 		<div className="w-full">
		// 			<CustomDropdownField
		// 				name="passenger"
		// 				label="Passenger"
		// 				options={passengers}
		// 				optionLabelFormat={(option) =>
		// 					`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
		// 				}
		// 			/>
		// 		</div>
		// 		<div
		// 			className={classes.searchContainer}
		// 			onClick={() => {
		// 				handleSearchPassengerClick();
		// 			}}
		// 		>
		// 			<Search className="cursor-pointer" />
		// 		</div>
		// 	</div>

		// 	<div className="flex flex-nowrap">
		// 		<div className="w-full">
		// 			<CustomDatePicker
		// 				name="man_power_date"
		// 				label="Manpower Date"
		// 				required
		// 				placeholder="DD-MM-YYYY"
		// 			/>
		// 		</div>
		// 		<div
		// 			className={classes.searchContainer}
		// 			onClick={() => {
		// 				handleSearchManPowerDateClick();
		// 			}}
		// 		>
		// 			<Search className="cursor-pointer" />
		// 		</div>
		// 	</div>

		// 	<Button
		// 		className="whitespace-nowrap mx-4"
		// 		variant="contained"
		// 		color="secondary"
		// 		onClick={() => {
		// 			handleCreateVisaSubmissionList();
		// 		}}
		// 	>
		// 		Save
		// 	</Button>

		// 	<Button
		// 		className="whitespace-nowrap mx-4"
		// 		variant="contained"
		// 		style={{ backgroundColor: '#FFAA4C', color: 'white' }}
		// 		onClick={() => handleCancel()}
		// 	>
		// 		Cancel
		// 	</Button>
		// </div>
		<div>
			<div>
				<Checkbox
					cancelList={cancelList}
					onChange={handlecancelList}
					inputProps={{ 'aria-label': 'controlled' }}
				/>{' '}
				Cancel List
				<Checkbox
					defaultChecked
					newList={newList}
					onChange={handlenewList}
					inputProps={{ 'aria-label': 'controlled' }}
				/>{' '}
				New List
			</div>
			{/* <Controller
				name="agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						id="agency"
						value={value ? agencys.find(data => data.id == value) : null}
						options={agencys}
						getOptionLabel={option => `${option.name}`}
						disabled={!!value}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							setValue('agency_info', newValue);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Agency"
								label="Agency"
								error={!!errors.agency}
								helperText={errors?.agency?.message}
								variant="outlined"
								required
								disabled={value}
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>{' '} */}
				 <CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
          optionLabelFormat={(option) => `${option?.name}`}
           onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>
			
			<CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
				style={{ display: 'none' }}
                optionLabelFormat={(option) => `${option?.name}`}
                onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>
			
			<div className="flex flex-nowrap">
				      <CustomDatePicker
						name="submission_date"
						label="Submission Date"
						required
						placeholder="DD-MM-YYYY"
					/>
				<div
					className={classes.searchContainer}
					onClick={() => {
						handleSearchManPowerDateClick();
					}}
				>
					<Search />
				</div>
			</div>
			<p className="text-base text-red-900" style={{ display: newList ? 'block' : 'none' }}>
				New List
			</p>
			<div style={{ display: newList ? 'block' : 'none' }}>
				<div className="flex flex-nowrap">
					{/* <Controller
						name="passenger"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								fullWidth
								autoHighlight
								value={value ? passengers.find(data => data.id == value) : null}
								options={passengers}
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
										id="passenger"
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
					/> */}

					<CustomDropdownField
				name="passenger"
				label="Passenger"
				options={agencies}
				style={{ display: 'none' }}
                optionLabelFormat={(option) => `${option?.name}`}
                onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>

					<div
						className={classes.searchContainer}
						onClick={() =>
							watch('passenger') && dispatch(getVisaSubmissionList({ passenger: watch('passenger') }))
						}
					>
						<Search />
					</div>
				</div>
			</div>
			<Button
				className="whitespace-nowrap mx-4"
				style={{ display: newList ? 'block' : 'none' }}
				variant="contained"
				color="secondary"
				onClick={handleSaveNewVisaSubmissionList}
			>
				Save
			</Button>
			<p className="text-base text-red-900" style={{ display: cancelList ? 'block' : 'none' }}>
				Cancel List
			</p>
			<div style={{ display: cancelList ? 'block' : 'none' }}>
				<div className="flex flex-nowrap">
					{/* <Controller
						name="cancelpassenger"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								fullWidth
								autoHighlight
								value={value ? passengers.find(data => data.id == value) : null}
								options={passengers}
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
										error={!!errors.cancelpassenger}
										helperText={errors?.cancelpassenger?.message}
										variant="outlined"
										required
										InputLabelProps={{
											shrink: true
										}}
									/>
								)}
							/>
						)}
					/> */}
					<div
						className={classes.searchContainer}
						onClick={() =>
							watch('passenger') && dispatch(getVisaSubmissionList({ passenger: watch('passenger') }))
						}
					>
						<Search />
					</div>
				</div>
			</div>
			<Button
				style={{ display: cancelList ? 'block' : 'none' }}
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary"
				onClick={handleSaveCancelVisaSubmissionList}
			>
				Save
			</Button>
		</div>
	);
}

export default VisaSubmissionListForm;
