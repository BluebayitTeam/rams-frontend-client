/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@material-ui/icons';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import increaseYear from 'src/app/@helpers/increaseYear';
import { genders, maritalStatuses, religions } from 'src/app/@data/data';
import Autocomplete from '@mui/material/Autocomplete';
import { GET_SITESETTINGS } from 'src/app/constant/constants';
import { useSelector, useDispatch } from 'react-redux';
import { getPassengers } from 'app/store/dataSlice';

const useStyles = makeStyles(() => ({
	textField: {
		'& > div': {
			height: '35px'
		}
	},
	container: {
		padding: '0px 25px',
		minWidth: '900px',
		'& *': {
			boxSizing: 'border-box'
		},
		'& .row': {
			marginRight: '-15px',
			marginLeft: '-15px'
		},
		'& .ppBrcodeWraper': {
			'& svg': {
				margin: 'auto'
			}
		}
	}
}));

const barcodeConfig = {
	width: 1,
	height: 30,
	margin: 0,
	marginTop: 5,
	marginBottom: 0,
	marginLeft: 10,
	marginRight: 10,
	format: 'CODE128',
	displayValue: false
};
const barcodeConfig2 = {
	width: 1,
	height: 50,
	margin: 0,
	marginTop: 5,
	marginBottom: 10,
	marginLeft: 20,
	marginRight: 20,
	format: 'CODE128'
};

function KsaVisaManualForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, reset, formState } = methods;
	const classes = useStyles();
	const [showPrint, setShowPrint] = useState(false);
	const [formData, setFormData] = useState({});
	console.log('formData', formData);

	const componentRef = useRef();
	const passengers = useSelector((state) => state.data.passengers);
	const { errors } = formState;

	// Reset form
	useEffect(() => {
		reset({ religion: 'Muslim', pp_expire_year: '10' });
	}, [reset]);

	// Handle show click
	const handleShowClick = () => {
		const data = watch();
		setFormData(data);
		setShowPrint(true);
	};

	// Printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	// Fetch passengers data
	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

	// Update formData when passengers data is available
	useEffect(() => {
		if (passengers.length > 0) {
			setFormData((formData) => ({
				...formData,
				passengers
			}));
		}
	}, [passengers]);

	const [generalData, setGeneralData] = useState({});
	// Get general setting data
	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);

	useEffect(() => {
		if (formData.passenger) {
			setValue('passenger_name', formData.passenger.passenger_name);
			setValue('gender', formData.passenger.gender);
			setValue('father_name', formData.passenger.father_name);
			setValue('marital_status', formData.passenger.marital_status);
			setValue('passport_no', formData.passenger.passport_no);

			const address = `${formData.passenger.district}, ${formData.passenger.post_office},${formData.passenger.police_station}  `;

			setValue('address', address);
			setValue('date_of_birth', formData.passenger.date_of_birth);
			setValue('passport_issue_date', formData.passenger.passport_issue_date);
			setValue('visa_number', formData.passenger.visa_entry);
			setValue('mother_name', formData.passenger.mother_name);
		} else {
			reset({
				religion: 'Muslim',
				pp_expire_year: '10',
				passenger_name: '',
				gender: '',
				father_name: '',
				marital_status: '',
				passport_no: '',
				address: '',
				date_of_birth: '',
				passport_issue_date: '',
				visa_number: '',
				mother_name: ''
			});
		}
	}, [formData.passenger, setValue, reset]);
	return (
		<>
			<div className="flex justify-center">
				<Controller
					name="passenger"
					control={control}
					render={({ field: { value, onChange } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-1/4 "
							freeSolo
							value={value ? passengers.find((data) => data.id === value) : null}
							options={passengers}
							getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
								setFormData((formData) => ({
									...formData,
									passenger: newValue
								}));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Passenger"
									label="Passenger"
									error={!value}
									helperText={errors?.agency?.message}
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

			<br />

			<div className="bg-white pb-10">
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="passenger_name"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									required
									label="Passenger Name"
									id="passenger_name"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
								/>
							);
						}}
					/>
					<Controller
						name="religion"
						control={control}
						defaultValue="Muslim"
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full md:w-6/12"
								freeSolo
								value={value ? religions.find((data) => data.id === value) : null}
								options={religions}
								getOptionLabel={(option) => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Religion"
										label="Religion"
										id="religion"
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
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="gender"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full md:w-6/12"
								freeSolo
								value={value ? genders.find((data) => data.id === value) : null}
								options={genders}
								getOptionLabel={(option) => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setFormData((prevFormData) => ({
										...prevFormData,
										passenger: newValue
									}));
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Gender"
										label="Gender"
										required
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
						name="pp_expire_year"
						control={control}
						defaultValue="10"
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									required
									label="PP Expiry Years"
									id="pp_expire_year"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
								/>
							);
						}}
					/>
				</div>

				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="father_name"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Father's Name"
									id="father_name"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="mother_name"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									required
									label="Mother's Name"
									id="mother_name"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
								/>
							);
						}}
					/>
				</div>

				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="marital_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full md:w-6/12"
								freeSolo
								value={value ? maritalStatuses.find((data) => data.id === value) : null}
								options={maritalStatuses}
								getOptionLabel={(option) => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Marital Status"
										label="Marital Status"
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
						name="passport_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									required
									label="Passport No"
									id="passport_no"
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
								/>
							);
						}}
					/>
				</div>

				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="address"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full "
									label="Address"
									id="address"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>

				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<div className="w-full">
						<Controller
							name="date_of_birth"
							control={control}
							render={({ field }) => {
								return (
									<CustomDatePicker
										field={field}
										className="mt-8 mb-16 w-full md:w-6/12"
										label="Date of Birth"
										onChange={(value) => {
											// setValue('passport_expiry_date', increaseYear(value, 5));
										}}
									/>
								);
							}}
						/>
					</div>

					<div className="w-full">
						<Controller
							name="passport_issue_date"
							control={control}
							render={({ field }) => {
								return (
									<CustomDatePicker
										field={field}
										className="mt-8 mb-16 w-full md:w-6/12"
										label="Passport Issue Date"
										onChange={(value) => {
											setValue('passport_expiry_date', increaseYear(value, 10));
										}}
									/>
								);
							}}
						/>
					</div>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="visa_number"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Visa No"
									id="visa_number"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<div className="w-full">
						<Controller
							name="visa_issue_date"
							control={control}
							render={({ field }) => {
								return (
									<CustomDatePicker
										field={field}
										className="mt-8 mb-16 w-full md:w-6/12"
										label="Visa Issue Date"
										onChange={(value) => {
											// setValue('passport_expiry_date', increaseYear(value, 5));
										}}
									/>
								);
							}}
						/>
					</div>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="sponsor_name_arabic"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Sponsor Name"
									id="sponsor_name_arabic"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="mofa_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Mofa No"
									id="mofa_no"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="occupation_arabic"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Occupation(Arabic)"
									id="occupation_arabic"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="profession_english"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Occupation(English)"
									id="profession_english"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="musaned_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Musaned No"
									id="musaned_no"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="okala_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Okala No"
									id="okala_no"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="police_clearance_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Police Clearance No"
									id="police_clearance_no"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>

					<Controller
						name="license"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="License"
									id="license"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="finger_no"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									label="Finger No"
									id="finger_no"
									required
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
				</div>

				<div className="flex justify-evenly items-center flex-wrap m-5">
					<div className="flex">
						<button
							style={{
								background: 'white',
								border: '1px solid grey',
								borderRadius: '4px',
								padding: '0px 5px',
								height: '35px'
							}}
							onClick={handleShowClick}
						>
							Show
						</button>
						{showPrint && (
							<button
								style={{
									background: 'white',
									border: '1px solid grey',
									borderRadius: '4px',
									padding: '0px 5px',
									height: '35px'
								}}
								onClick={() => printAction()}
							>
								<Print />
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default KsaVisaManualForm;
