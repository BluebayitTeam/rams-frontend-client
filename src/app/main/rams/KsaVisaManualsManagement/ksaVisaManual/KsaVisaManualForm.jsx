/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@material-ui/icons';
import _ from 'lodash';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import moment from 'moment';
import Barcode from 'react-barcode';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import increaseYear from 'src/app/@helpers/increaseYear';
import { genders, maritalStatuses, religions } from 'src/app/@data/data';
import Autocomplete from '@mui/material/Autocomplete';
import { GET_SITESETTINGS } from 'src/app/constant/constants';
import { useGetKsaVisaManualQuery } from '../KsaVisaManualsApi';

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
	const { control, formState, watch, setValue, setError, reset } = methods;

	const routeParams = useParams();
	const classes = useStyles(props);
	const [ksaVisaManualId, setKsaVisaManualId] = useState('');
	const [showPrint, setShowPrint] = useState(false);
	const [generalData, setGeneralData] = useState({});

	const { data, refetch } = useGetKsaVisaManualQuery(ksaVisaManualId, {
		skip: !ksaVisaManualId
	});

	useEffect(() => {
		// Fetch data when ksaVisaManualId is defined
		if (ksaVisaManualId) {
			refetch();
		} else {
			// Reset form when ksaVisaManualId is not set
			reset({
				name: ksaVisaManualId
			});
		}
	}, [ksaVisaManualId, refetch, reset]);

	useEffect(() => {
		if (!data || _.isEmpty(data)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams?.ksaVisaManualId !== 'ksa-visa-form') {
			setValue('name', routeParams?.ksaVisaManualId);
		}
	}, [data, routeParams?.ksaVisaManualId, setValue]);

	// print dom ref
	const componentRef = useRef();

	// printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

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

	const handleShowClick = () => {
		const value = watch('name');

		if (value) {
			setKsaVisaManualId(value);
		} else {
			setError('name', {
				type: 'manual',
				message: 'Please enter a valid ID or Passport Number'
			});
		}
	};

	return (
		<>
			<div className="bg-white pb-10">
				<div className="flex md:space-x-12 flex-col md:flex-row m-10">
					<Controller
						name="religion"
						control={control}
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

					<Controller
						name="pp_expire_year"
						control={control}
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
						name="passenger_name"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16 w-full md:w-6/12"
									required
									label="Name"
									id="passenger_name"
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
			<div
				ref={componentRef}
				className={`${classes.container}`}
			>
				<div className="row">
					<div className="md:w-full">
						<div>
							<table style={{ height: '600px', width: '100%' }}>
								<tr>
									<td style={{ textAlign: 'center' }}>
										<table width="100%">
											<tr style={{ textAlign: 'center' }}>
												<td
													colSpan="3"
													style={{ textAlign: 'center' }}
												>
													<table align="center">
														<tr>
															<td align="center">
																Visa Number:
																{data?.visa_number}
															</td>
														</tr>
														<tr>
															<td align="right">
																{data?.visa_number && (
																	<Barcode
																		value={data?.visa_number}
																		{...barcodeConfig}
																	/>
																)}
															</td>
														</tr>
														<tr>
															<td align="center">
																Visa Date:
																{data?.visa_issue_date &&
																	moment(new Date(data?.visa_issue_date)).format(
																		'DD-MM-YYYY'
																	)}
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table width="100%">
											<tr>
												<td style={{ width: '20%' }}>
													<table
														style={{
															border: '1px solid black',
															width: '90px',
															height: '90px',
															float: 'left',
															textAlign: 'Center',
															fontSize: '9.5pt'
														}}
													>
														<tr>
															<td>
																صورة
																<br />
																Photos
															</td>
														</tr>
													</table>
												</td>
												<td style={{ width: '50%' }}>
													<div style={{ float: 'right' }}>
														<table width="50%">
															<tr>
																<td>
																	<img
																		src="assets/images/logos/ksaVisaManualLogo.jpg"
																		alt=""
																		style={{ width: '15px' }}
																	/>
																</td>
															</tr>
														</table>
													</div>
												</td>
												<td style={{ width: '30%' }}>
													<table
														style={{ width: '300px', textAlign: 'Center', float: 'right' }}
													>
														<tr>
															<td>
																<div style={{ float: 'right', fontSize: '9.5pt' }}>
																	<table
																		style={{ width: '100%', textAlign: 'center' }}
																	>
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				E{data?.mofa_no}&nbsp;
																			</td>
																		</tr>
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				سفارة المملكة العربية السعودية
																			</td>
																		</tr>
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				القسم القنصلي
																			</td>
																		</tr>
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				EMBASSY OF SAUDI ARABIA
																			</td>
																		</tr>
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				CONSULAR SECTION
																			</td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<table
											width="100%"
											style={{
												border: '0px solid #fff',
												borderCollapse: 'collapse',
												fontSize: '9.5pt'
											}}
										>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Full
																name:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
																<b>
																	{data?.passenger_name &&
																		`${data?.passenger_name} ${
																			data?.gender
																				? data?.gender?.match(/female/i)
																					? 'D/O'
																					: 'S/O'
																				: ''
																		} ${data?.father_name || ''}`}
																</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الاسم الكامل{' '}
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Mother's name:&emsp;&emsp;
																{data?.mother_name}
															</td>
															<td style={{ textAlign: 'right' }}>:&nbsp;إسم الأم</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Date of birth:&emsp;
																{data?.date_of_birth &&
																	moment(new Date(data?.date_of_birth)).format(
																		'DD-MM-YYYY'
																	)}
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;تاريخ الولادة&emsp;&emsp;Place of birth:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;
																<b>{data?.place_of_birth}</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;محل الولادة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Previous nationality:&emsp;&emsp;BANGLADESHI
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;الجنسية السابقة&emsp;&emsp;Present nationality:
															</td>
															<td style={{ textAlign: 'left', fontSize: '12pt' }}>
																&emsp;&emsp;BANGLADESHI
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الجنسية الحالية
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																style={{
																	textAlign: 'left',
																	fontSize: '9.5pt',
																	display: 'flex',
																	height: '20px'
																}}
															>
																Sex:&emsp;&emsp;&emsp;
																<span
																	style={{ border: '1px solid', padding: '0px 3px' }}
																>
																	{data?.gender
																		? data?.gender?.match(/female/i)
																			? 'Female أنثي'
																			: 'Male ذكر'
																		: ''}
																</span>
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;الجنس&emsp;&emsp;Marital Status:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;
																{data?.marital_status}
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الحالة الإجتماعية
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '12pt' }}>
																Sect.:&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9pt' }}>
																&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:&emsp;المـذهـب&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;&emsp;Religion:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
																<b>{data?.religion}</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الديـانـة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style={{ textAlign: 'right' }}>:&nbsp;مصدرة</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;المؤهل العلمي</td>
												<td style={{ textAlign: 'right', fontFamily: 'Arial' }}>
													<span style={{ color: 'white', fontSize: '1px' }}>a</span>
													{data?.[0]?.unknown} :&nbsp;المهنـة
												</td>
											</tr>
											<td colSpan="3">
												<table width="100%">
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ textAlign: 'left' }}>Place of issue:</td>
														<td style={{ textAlign: 'left' }}>Qualification:</td>

														<td
															style={{ textAlign: 'Center', fontFamily: 'Arial' }}
															colSpan="2"
														>
															Profession:&emsp;
															<b>{data?.profession_english}</b>
														</td>
													</tr>
												</table>
											</td>
											<tr
												style={{
													borderBottom: '1px solid black',
													borderTop: '1px solid black'
												}}
											>
												<td style={{ textAlign: 'left' }}>Home address and telephone No.:</td>
												<td style={{ textAlign: 'left' }}>{`${data?.address || ''} `}</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;عنوان المنزل ورقم التلفون</td>
											</tr>

											<tr
												style={{
													borderBottom: '1px solid black',
													borderTop: '1px solid black'
												}}
											>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Business address and telephone No.:&emsp;
																<b>{`${generalData?.agency_name_arabic || ''} RL No- ${
																	generalData?.rl_no || ''
																}`}</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;عنواان الشركة (المؤسسة) ورقم التلفون{' '}
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td
													style={{ textAlign: 'Center', fontWeight: 'bold' }}
													colSpan="3"
												>
													<b>{generalData?.address}</b>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																style={{
																	textAlign: 'left',
																	width: '15%',
																	fontSize: '9.5pt'
																}}
															>
																Purpose of travel:
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '9.5%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label5" runat="server" Text="عمل&nbsp;<br/>Work" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '9.5%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label6" runat="server" Text="مرور&nbsp;<br/>Transit" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '9.5%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label7" runat="server" Text="زيارة&nbsp;<br/>Visit" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '9.5%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label8" runat="server" Text="عمـرة&nbsp;<br/>Umrah" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '12%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label9" runat="server" Text="للإقامة&nbsp;<br/>Residence" BorderStyle="Solid" BorderWidth="1px" Width="95%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '9%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label10" runat="server" Text="حــج&nbsp;<br/>Hajj" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	// textAlign: 'Center',
																	float: 'left',
																	width: '13%',
																	fontSize: '9.5pt'
																}}
															>
																{/* <asp:Label ID="Label11" runat="server" Text="دبلوماسية&nbsp;<br/>Diplomacy" BorderStyle="Solid" BorderWidth="1px" Width="95%"></asp:Label> */}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'right',
																	width: '12%',
																	fontSize: '9.5pt'
																}}
															>
																:&nbsp;الغاية من السفر
															</td>
														</tr>
													</table>
												</td>
											</tr>

											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																style={{
																	textAlign: 'Center',
																	fontSize: '8pt',
																	borderBottom: '1px solid black'
																}}
															>
																Place of issue:&emsp;محل الإصدار
																<br />
																<b style={{ fontSize: '10pt' }}>
																	{data?.[0]?.passenger?.passport_issue_place}
																</b>
															</td>
															<td
																style={{
																	textAlign: 'Center',
																	fontSize: '8pt',
																	borderBottom: '1px solid black'
																}}
															>
																&nbsp;&nbsp;Passport issued date:&nbsp;تاريخ الإصدار
																<br />
																<b style={{ fontSize: '10pt' }}>
																	{data?.passport_issue_date &&
																		moment(
																			new Date(data?.passport_issue_date)
																		).format('DD-MM-YYYY')}
																</b>
															</td>
															<td
																style={{
																	textAlign: 'Center',
																	fontSize: '8pt',
																	borderBottom: '1px solid black'
																}}
															>
																&nbsp;&nbsp;Date of passport's expiry:&emsp;تاريخ إنتهاء
																صلاحية الجواز
																<br />
																<b style={{ fontSize: '10pt' }}>
																	{data?.passport_expiry_date &&
																		moment(
																			new Date(data?.passport_expiry_date)
																		).format('DD-MM-YYYY')}
																</b>
															</td>
															<td style={{ textAlign: 'Center', fontSize: '8pt' }}>
																Passport No.:&emsp;رقم الجواز
																<br />
																<b style={{ fontSize: '10pt' }}>{data?.passport_no}</b>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3" />
											</tr>
											<tr>
												<td style={{ textAlign: 'right' }}>:&nbsp;مدة الإقامة بالمملكة</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;تاريخ الوصول</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;تاريخ المغادرة</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td style={{ textAlign: 'left' }}>
													Duration of stay in the Kingdom:&nbsp;&nbsp;2 Years
												</td>
												<td style={{ textAlign: 'center' }}>Date of arrival:&nbsp;</td>
												<td style={{ textAlign: 'center' }}>Date of departure:</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;تاريخ
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;( ) ايصال رقم
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;تاريخ
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;( ) بشيك رقم
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;( ) نقداً
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;( ) مجاملة
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;طريقة الدفع
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Mode of Payment:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																( ) Free
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																( ) Cash
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																( ) Cheque No.
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Date:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																( )
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																No.
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Date:
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style={{ textAlign: 'right' }}>:&nbsp;صلتـه</td>
												<td
													style={{ textAlign: 'right' }}
													colSpan="2"
												>
													:&nbsp;إسم المحرم
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td style={{ textAlign: 'left' }}>Relationship:</td>
												<td
													style={{ textAlign: 'left' }}
													colSpan="2"
												>
													&nbsp;Name Of Mahram:
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Destination:&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;جهة الوصول بالمملكة&emsp;&emsp;Carrier's
																name:&nbsp;&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }} />
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;اسم الشركة الناقلة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style={{ textAlign: 'left', fontSize: '9pt' }}>
													Dependents traveling in the same passport:
												</td>

												<td style={{ textAlign: 'right' }}>
													:إيضاحات تخص أفراد العائلة (المضافين) علي نفس جواز السفر
												</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table
														width="100%"
														style={{
															borderCollapse: 'collapse',
															border: '1px solid black',
															fontSize: '9.5pt'
														}}
													>
														<tr style={{ textAlign: 'Center', fontSize: '9.5pt' }}>
															<td style={{ border: '1px solid black' }}>
																نوع الصلة&nbsp;
																<br />
																Relationship
															</td>
															<td style={{ border: '1px solid black' }}>
																تــاريخ الميــلاد&nbsp;
																<br />
																Date of Birth
															</td>
															<td style={{ border: '1px solid black' }}>
																الجنـــس&nbsp;
																<br />
																Sex
															</td>
															<td style={{ border: '1px solid black' }}>
																الاسم بـالكــامل&nbsp;
																<br />
																Full name
															</td>
														</tr>

														<tr style={{ textAlign: 'left', fontSize: '9.5pt' }}>
															<td
																style={{
																	border: '1px solid black',
																	textAlign: 'center'
																}}
															/>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
														</tr>

														<tr style={{ textAlign: 'left', fontSize: '9.5pt' }}>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
														</tr>
														<tr style={{ textAlign: 'left', fontSize: '9.5pt' }}>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
														</tr>
														<tr style={{ textAlign: 'left', fontSize: '9.5pt' }}>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
															<td style={{ border: '1px solid black' }}>&nbsp;</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Name and address of company or individual in the
																kingdom:
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;اسم وعنوان الشركة أو اسم الشخص وعنوان بالمملكة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																The undersigned hereby certify that all the information
																I have provided are correct.
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																.&nbsp;أنا الموقع أدناه أقر بأن كل المعلومات التي دونها
																صحيصة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																I will abide by the laws of the Kingdom during the
																period of my residence in it.
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																.&nbsp;وسأكون ملتزما بقوانين المملكة أثناء فترة وجودي
																بها{' '}
															</td>
														</tr>
													</table>
												</td>
											</tr>

											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																colSpan="3"
																style={{ textAlign: 'left' }}
															>
																Date:
															</td>
															<td
																colSpan="3"
																style={{ textAlign: 'right' }}
															>
																&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;التاريخ
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;&emsp;Signature:
															</td>
															<td style={{ textAlign: 'Center', fontSize: '9.5pt' }}>
																:&nbsp;التوقيع&emsp;Name:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;
																<b style={{ fontSize: '10pt' }}>
																	{data?.[0]?.passenger?.passenger_name}
																</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الاسم
															</td>
														</tr>
													</table>
												</td>
											</tr>

											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																style={{
																	textAlign: 'left',
																	fontSize: '9.5pt',
																	fontWeight: 'bold'
																}}
															>
																<u>For official use only</u>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																<u>:&nbsp;للا ستعمال الرسمى فقط </u>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td style={{ textAlign: 'left' }}>
													Date:&emsp;&emsp;&emsp;
													{data?.visa_issue_date &&
														moment(new Date(data?.visa_issue_date)).format('DD-MM-YYYY')}
												</td>
												<td style={{ textAlign: 'left' }}>
													:&nbsp;تاريخه&emsp;&emsp;Authorization:&emsp;&emsp;&emsp;
													<b>{data?.visa_number}</b>
												</td>
												<td style={{ textAlign: 'right' }}>
													:&nbsp;رقم الامر المعتمد عليه في إعطاء التأشيرة
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Visit/ Work for:
															</td>
															<td
																style={{
																	textAlign: 'Center',
																	fontSize: '9.5pt',
																	fontFamily: 'Arial'
																}}
															>
																<span style={{ fontSize: '13pt' }}>
																	{data?.sponsor_name_arabic}
																</span>
																<span style={{ color: 'white', fontSize: '1px' }}>
																	a
																</span>
															</td>
															<td
																style={{
																	textAlign: 'right',
																	fontSize: '9.5pt',
																	fontFamily: 'Arial'
																}}
															>
																&nbsp;&nbsp;:&nbsp;لزيارة – العمل لدي
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td style={{ textAlign: 'left' }}>Date:&emsp;&emsp;&emsp;</td>
												<td style={{ textAlign: 'left' }}>
													:&nbsp;وتاريخ&emsp;&emsp;Visa No.:&emsp;
													{data?.sponsor_id_no}
												</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;أشر له برقم</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																FEE COLLECTED&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																المبلغ المحصل
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Type:
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;نوعها
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;Duration:
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;مدتها
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;&emsp;القنصل العام
															</td>
															<td style={{ textAlign: 'Center', fontSize: '9.5pt' }} />

															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;مـدقق البيانات
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colSpan="3">
													<table width="100%">
														<tr>
															<td
																style={{
																	textAlign: 'left',
																	fontSize: '9.5pt',
																	width: '20%'
																}}
															>
																&emsp;Consul General
															</td>
															<td
																align="right"
																style={{ width: '70%' }}
																className="ppBrcodeWraper"
															>
																{data?.passport_no && (
																	<Barcode
																		value={data?.passport_no}
																		{...barcodeConfig2}
																	/>
																)}
															</td>
															<td
																style={{
																	textAlign: 'right',
																	fontSize: '9.5pt',
																	width: '20%'
																}}
															>
																Checked by:
															</td>
														</tr>
														<tr>
															<td
																colSpan="3"
																align="center"
															/>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>

							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />

							<div style={{ display: 'block' }} />
							<div
								style={{
									backgroundImage: 'url(../Form/padairtrade1.jpg) !important',
									width: '100%',
									height: '1080px',
									backgroundRepeat: 'no-repeat',
									marginBottom: '250px'
								}}
							>
								<table
									width="100%"
									style={{ marginTop: '300px' }}
								>
									<tr>
										<td
											valign="top"
											align="center"
										>
											<table width="93%">
												<tr>
													<td
														className="auto-style1"
														align="justify"
														style={{ paddingTop: '300px' }}
													>
														To,
														<br />
														<br />
														HIS EXCLLENCY THE CHIEF OF CONSULATE SECTION
														<br />
														THE ROYAL EMBASSY OF SAUDI ARABIA
														<br />
														GULSHAN, DHAKA, BANGLADESH
														<br />
														<br />
														<br />
														EXCELLENCY,
														<br />
														<br />
														WITH DUE RESPECT WE ARE SUBMITTING ONE PASSPORT FOR WORK VISA
														WITH ALL NECESSARY DOCUMENT AND PARTICULARS MENTIONED AS BELOW,
														KNOWING ALL INSTRUCTIONS AND REGULATIONS OF THE CONSULATE
														SECTION:
														<br />
														<br />
													</td>
												</tr>
												<tr>
													<td>
														<table
															style={{
																textAlign: 'Center',
																fontWeight: 'normal',
																borderCollapse: 'collapse',
																width: '100%'
															}}
														>
															<tr>
																<td
																	valign="top"
																	className="auto-style2"
																>
																	1.
																</td>
																<td
																	valign="top"
																	align="left"
																	className="auto-style3"
																>
																	NAME OF THE EMPLOYER IN SAUDI ARABIA
																</td>
																<td
																	valign="top"
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	:&nbsp;&nbsp;
																	{data?.sponsor_name_arabic}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	&nbsp;
																</td>
																<td
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	&nbsp;&nbsp;
																</td>
															</tr>
															<tr>
																<td style={{ width: '5%' }}>2.</td>
																<td align="left">VISA NO. AND DATE</td>
																<td align="left">
																	:&nbsp;&nbsp;
																	{data?.visa_number}
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE: &nbsp;
																	{data?.visa_issue_date &&
																		moment(new Date(data?.visa_issue_date)).format(
																			'DD-MM-YYYY'
																		)}
																	&nbsp;
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	&nbsp;
																</td>
																<td
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	&nbsp;&nbsp;
																</td>
															</tr>
															<tr>
																<td className="auto-style2">3.</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	FULL NAME OF THE EMPLOYEE
																</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	:&nbsp;&nbsp;
																	{data?.passenger_name}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	&nbsp;
																</td>
																<td
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	&nbsp;&nbsp;
																</td>
															</tr>

															<tr>
																<td style={{ width: '5%' }}>4.</td>
																<td align="left">PASSPORT NO. WITH DATE</td>
																<td align="left">
																	:&nbsp;&nbsp;
																	{data?.passport_no}
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DATE: &nbsp;
																	{data?.passport_expiry_date &&
																		moment(
																			new Date(data?.passport_expiry_date)
																		).format('DD-MM-YYYY')}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	&nbsp;
																</td>
																<td
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	&nbsp;&nbsp;
																</td>
															</tr>
															<tr>
																<td style={{ width: '5%' }}>5.</td>
																<td align="left">PROFESSION</td>
																<td align="left">
																	:&nbsp;&nbsp;
																	{data?.profession_english}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td
																	align="left"
																	className="auto-style3"
																>
																	&nbsp;
																</td>
																<td
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	&nbsp;&nbsp;
																</td>
															</tr>
															<tr>
																<td style={{ width: '5%' }}>6.</td>
																<td align="left">RELIGION</td>
																<td align="left">
																	:&nbsp;&nbsp;
																	{data?.religion}
																</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="justify">
														<br />
														WE DO HEREBY CONFIRM AND DECLARE THAT THE RELIGION STATED IN THE
														VISA FORM AND FORWARDING LETTER IS FULLY CORRECT. WE ALSO DO
														GIVEN THE UNDERTAKEN WITH OUR OWN RESPONSIBILTY TO CANCEL THE
														VISA AND TO STOP FUNCTIONING&nbsp; WITH OUR OFFICE, IF THE
														STATEMENT IS FOUND INCORRECT.
														<br />
														<br />
														WE, THEREFORE REQUEST YOUR EXCELLENCY TO KINDLY ISSUE WORK VISA
														OUT OF ....... VISA AND OBLIGE THERE BY.
														<br />
														<br />
														<br />
														<br />
														<br />
														<br />
														SL.
														NO..............&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;YOUR
														FAITHFULLY,
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</div>
							<div className="col-sm-4">
								{/* <asp:SqlDataSource ID="SqlPassMedical" runat="server" ConnectionString="<%$ ConnectionStrings:travelConnectionString %>" ProviderName="<%$ ConnectionStrings:travelConnectionString.ProviderName %>" SelectCommand="SELECT UPPER(tbl_visa_details.copil_name) AS copil_name, UPPER(tbl_country.country_name) AS sector_name_country, UPPER(tbl_passenger_details.passenger_name) AS passenger_name, UPPER(tbl_passenger_pp_details.passenger_pp_no) AS passenger_pp_no, UPPER(tbl_visa_details.destination) AS visa_comment, UPPER(tbl_visa_details.group_name) AS job_title FROM tbl_passenger_details INNER JOIN tbl_passenger_pp_details ON tbl_passenger_details.passenger_id = tbl_passenger_pp_details.passenger_id INNER JOIN tbl_visa_details ON tbl_passenger_details.passenger_id = tbl_visa_details.passenger_id INNER JOIN tbl_country ON tbl_passenger_details.country_id = tbl_country.country_id WHERE (CONVERT (varchar(50), tbl_passenger_details.passenger_id) = @search) OR (tbl_passenger_pp_details.passenger_pp_no = @search)">
                        <SelectParameters>
                            <asp:ControlParameter ControlID="txtPassportJobID" Name="search" PropertyName="Text" />
                        </SelectParameters>
                    </asp:SqlDataSource> */}
							</div>

							<table
								width="100%"
								className="print:mt-200"
							>
								<tr>
									<td
										valign="top"
										align="center"
									>
										<table width="95%">
											<tr>
												<td
													style={{
														fontWeight: 'bold',
														fontSize: 'large',
														textAlign: 'center',
														paddingTop: '300px'
													}}
												>
													<h3>
														<u>EMPLOYEMENT AGREEMENT</u>
													</h3>
													<br />
												</td>
											</tr>

											<tr>
												<td
													style={{
														fontWeight: 'bold',
														fontSize: 'small',
														textAlign: 'center'
													}}
												/>
											</tr>
											<tr>
												<td align="left">
													<table width="95%">
														<tr>
															<td>NAME OF COMPANY: M/S</td>
															<td>
																:&nbsp;
																{data?.sponsor_name_arabic}
															</td>
														</tr>

														<tr>
															<td>HERE BY APPOINTED MR/MRS</td>
															<td>
																:&nbsp;
																{data?.passenger_name}
															</td>
														</tr>
														<tr>
															<td>HOLDER OF BANGLADESH PASSPORT NO</td>
															<td>
																:&nbsp;
																{data?.passport_no}
															</td>
														</tr>

														<tr>
															<td>
																AS A/AN &nbsp;&emsp;&emsp;
																{data?.profession_english}
																&nbsp;&nbsp;
															</td>
															<td />
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td>
													<table
														style={{
															textAlign: 'left',
															fontWeight: 'normal',
															borderCollapse: 'collapse',
															width: '100%'
														}}
													>
														<tr>
															<td colSpan="3">
																<u>UNDER THE FOLLOWING TERMS. AND CONDITIONS </u>
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>1.</td>
															<td>
																MONTHLY SALARY
																{/* <asp:Label ID="lblVisaComment" runat="server"></asp:Label> */}
																&nbsp;to the 2nd party as his monthly salary to serve
																him as a{data?.profession_english}
																&nbsp;
															</td>
															<td>:SR 1000/-</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>2.</td>
															<td>FOOD & ACCOMMODATION </td>
															<td style={{ width: '40%' }}>:FREE</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>3.</td>
															<td>AIR PASSAGE </td>
															<td>:BORNE BY THE EMPLOYER</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>4.</td>
															<td>DUTY HOURS</td>
															<td>:8 HOURS DAILY.</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>5.</td>
															<td>HOLIDAY </td>
															<td>:AS PER SAUDI LABOUR LAWS.</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>6.</td>
															<td>LEAVE </td>
															<td>:AS PER SAUDI LABOUR LAWS.</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>7.</td>
															<td>OVERTIME & OTHER BENEDIT</td>
															<td>:AS PER SAUDI LABOUR LAWS.</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>8.</td>
															<td>MEDICAL FACILITIES</td>
															<td>:FREE</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>9.</td>
															<td>PERIOD OF CONTRACT </td>
															<td>:TWO/THREE YEARS</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>10.</td>
															<td>
																REPATRIATION ARRANGEMENT INCLUDING RETURN OF DEAD & BODY
																SERVICE BENEFIT TO THE LEGAL HEIR OF THE EMPOLYEE
															</td>
															<td>:RESPONSIBILITY OF THE EMPLOYER</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>11.</td>
															<td>
																OTHER TERMS & CONDITIONS NOT CONVERED BY THE AGREEMENT{' '}
															</td>
															<td>:AS PER SAUDI LABOUR LAW</td>
														</tr>

														<tr>
															<td style={{ width: '5%' }}>12.</td>
															<td>
																The 1st party shall grant leave to the 2nd party on
																usual holiday.
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>13.</td>
															<td>
																The 2nd party shall observe the local Saudi Laws and
																Traditions.
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>14.</td>
															<td>
																The period of this Agreement is 2 (two) years starting
																from signing the contact by the two parties.
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>15.</td>
															<td>
																Each party should have one copy of this contact and if
																the two copies are found differnt have the one who made
																change should be punnished according to the Saudi Laws.
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>16.</td>
															<td>
																Regarding all other matters not covered by the above
																provisions the Saudi Labour Laws and standard rules of
																the Kingdom shall apply.
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td>
																<div
																	style={{
																		borderTop: '2px solid #000',
																		float: 'left'
																	}}
																>
																	SIGNATURE OF THE 1ST PARTY
																</div>
															</td>
															<td>
																<div
																	style={{
																		borderTop: '2px solid #000',
																		float: 'right'
																	}}
																>
																	SIGNATURE OF THE 2ND PARTY
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							{/* 3rd Page   */}
							<h2
								className="print:mt-200"
								style={{ marginTop: '900px' }}
							>
								<center style={{ paddingTop: '400px' }}>إرفاق الجدول التالي في كل معاملة</center>
							</h2>
							<table
								style={{ width: '100%', border: '1px solid' }}
								cellSpacing="0"
								cellPadding="0"
							>
								<thead>
									<tr>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												<b>
													{' '}
													المالحظات
													<br /> REMARK
												</b>
											</center>
										</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												<b>
													المنفذ
													<br /> PORT
												</b>
											</center>
										</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												<b>
													{' '}
													المكتب
													<br /> AGENCY{' '}
												</b>
											</center>
										</td>
										<td>
											<center>
												<b>
													{' '}
													االجراء
													<br /> PROCEDURE{' '}
												</b>
											</center>
										</td>
									</tr>
								</thead>

								<tbody>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid', width: '22%' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid', width: '22%' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid', width: '22%' }}>
											<center> {data?.mofa_no ? data?.mofa_no : 'N/A'}</center>
										</td>
										<td>
											<center>Mofa No / إنجاز ر</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.visa_number}</center>
										</td>
										<td>
											<center>Visa No/ المستند رقم</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.passenger_name}</center>
										</td>
										<td>
											<center>Passport Name / الجواز في االسم</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.passport_no}</center>
										</td>
										<td>
											<center>Passport No/ الجواز رقم</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.passport_expiry_date &&
													moment(new Date(data?.passport_expiry_date)).format('DD-MM-YYYY')}
											</center>
										</td>
										<td>
											<center>Passport Validity/ الجواز صالحية</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.date_of_birth
													? differenceInYears(new Date(), new Date(data?.date_of_birth))
													: ''}{' '}
												Years{' '}
												{data?.date_of_birth
													? differenceInMonths(new Date(), new Date(data?.date_of_birth)) % 12
													: ''}{' '}
												Months{' '}
												{data?.date_of_birth
													? differenceInDays(new Date(), new Date(data?.date_of_birth)) % 30
													: ''}{' '}
												Days
											</center>
										</td>
										<td>
											<center>Age/ العمر</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.gender}</center>
										</td>
										<td>
											<center>Sex/ الجنس</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.musaned_no ? data?.musaned_no : 'N/A'} </center>
										</td>
										<td>
											<center>Musaned/ مساند</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.okala_no ? data?.okala_no : 'N/A'} </center>
										</td>
										<td>
											<center>Okalah/ الوكالة</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.medical_result ? data?.medical_result : 'N/A'} </center>
										</td>
										<td>
											<center>Medical/ طبي فحص</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.police_clearance_no ? data?.police_clearance_no : 'N/A'}{' '}
											</center>
										</td>
										<td>
											<center>Police Clearance/ الشرطة ورقة</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.driving_license_no ? data?.driving_license_no : 'N/A'}{' '}
											</center>
										</td>
										<td>
											<center>License/ الرخصة</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.profession_english ? data?.profession_english : 'N/A'}
											</center>
										</td>
										<td>
											<center>Profession/ المهنة</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center>
												{' '}
												{data?.certificate_experience
													? data?.certificate_experience
													: 'N/A'}{' '}
											</center>
										</td>
										<td>
											<center>Certificate & Experience/ المؤهل وشهادة الخبرة</center>
										</td>
									</tr>
									<tr style={{ borderTop: '1px solid' }}>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>&nbsp;</td>
										<td style={{ borderRight: '1px solid' }}>
											<center> {data?.finger_no ? data?.finger_no : 'N/A'} </center>
										</td>
										<td>
											<center>Finger/ البصمة</center>
										</td>
									</tr>
								</tbody>
							</table>
							<br />
							<br />
							<br />
							<table
								align="right"
								style={{ marginTop: '20px' }}
							>
								<tr>
									<td>
										<b align="right">{data?.agency}</b>
									</td>
									<td>
										<b align="left">: - إسم المكتب </b>
									</td>
								</tr>
								<tr>
									<td>{data?.agency?.rl_no}</td>
									<td>
										<b align="left">: رقم الرخصة</b>
									</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
								<tr>
									<td>
										<b align="right" />
									</td>
									<td>
										<b align="left">:الختم</b>
									</td>
								</tr>
								<tr>
									<td>
										<b align="right" />
									</td>
									<td>
										<b align="left">:التوقيع</b>
									</td>
								</tr>
							</table>

							{/* </asp:Panel> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default KsaVisaManualForm;
