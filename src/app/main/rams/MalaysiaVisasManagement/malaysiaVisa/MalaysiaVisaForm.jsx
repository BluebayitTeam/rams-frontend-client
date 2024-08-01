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
import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check';
import { useGetMalaysiaVisaQuery } from '../MalaysiaVisasApi';

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

function MalaysiaVisaForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;
	const [localData, setLocalData] = useState([]);

	const routeParams = useParams();
	const classes = useStyles(props);
	const [malaysiaVisaId, setMalaysiaVisaId] = useState('');
	const [showPrint, setShowPrint] = useState(false);

	const { data, isSuccess } = useGetMalaysiaVisaQuery(malaysiaVisaId, {
		skip: !malaysiaVisaId
	});

useEffect(() => {
		if (isSuccess) {
			setLocalData(data);
			setShowPrint(true);
		} else {
			setLocalData([]);
			setShowPrint(false);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (_.isEmpty(data)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.malaysiaVisaId !== 'malaysiaVisa-form') {
			setValue('name', routeParams.malaysiaVisaId);
		}
	}, [data]);

	// print dom ref
	const componentRef = useRef();

	// printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const { value } = e.target;

			if (value) {
				setMalaysiaVisaId(value);
			} else {
				setError('name', {
					type: 'manual',
					message: 'Please enter a valid ID or Passport Number'
				});
			}
		}
	};

	const handleShowClick = () => {
		const value = watch('name');

		if (value) {
			setMalaysiaVisaId(value);
		} else {
			setError('name', {
				type: 'manual',
				message: 'Please enter a valid ID or Passport Number'
			});
		}
	};

	return (
		<>
			<div className="flex justify-evenly items-center flex-wrap m-5">
				<div>
					<h4>Passenger Job ID or Passport No.</h4>
				</div>
				<div className="flex">
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								autoFocus
								id="name"
								className={classes.textField}
								variant="outlined"
								fullWidth
								onKeyDown={handleKeyDown}
							/>
						)}
					/>
					<button
						style={{
							background: 'white',
							border: '1px solid grey',
							borderRadius: '4px',
							padding: '0px 5px',
							height: '35px',
							marginTop: '3px',
							marginLeft: '1px'
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
								height: '35px',
								marginTop: '3px',
								marginLeft: '1px'
							}}
							onClick={() => printAction()}
						>
							<Print />
						</button>
					)}
				</div>
				<div style={{ minWidth: '250px' }}>
					<h4>(Please use Chrome browser only to Print)</h4>
				</div>
			</div>
			<div
				ref={componentRef}
				className={classes.container}
			>
				<div className="row">
					<div className="md:w-full p-20">
						<div>
							<h2
								style={{ float: 'right' }}
								className="bg-gray-400 font-bold m-2 p-3"
							>
								MULTIPLE/SINGLE
							</h2>
							<table
								width="100%"
								cellPadding="7"
								cellSpacing="2"
								className="mt-32"
							>
								<tr valign="middle">
									<td
										valign="middle"
										align="center"
										style={{ width: '15%', padding: 0, marginLeft: '50px' }}
									>
										<img
											src="assets/images/logos/malaysiaVisa.PNG"
											align="CENTER"
											width="120"
											height="120"
										/>
									</td>
									<td
										valign="middle"
										className="border-2 border-current"
										style={{ width: '70%' }}
									>
										<center>
											<b>
												{' '}
												<span style={{ fontSize: 'large' }}>
													{' '}
													JABATAN IMIGRESEN MALAYSIA
													<br />
													BORANG PERMOHONAN VISA
													<br />
													VISA APPLICATION FORM
												</span>
											</b>{' '}
										</center>
									</td>

									<td
										valign="middle"
										style={{ width: '15%' }}
									>
										{' '}
										&nbsp;
									</td>
								</tr>
							</table>
							<table
								width="100%"
								cellSpacing="2"
								cellPadding="7"
								className="mt-10"
							>
								<tr>
									<td style={{ width: '25%' }}>
										*Jenis Permohonan <br />
										&nbsp; Type of Application{' '}
									</td>
									<td style={{ width: '25%' }}>
										<tr>
											{' '}
											<td>
												Dalam Malaysia <br />
												&nbsp; In Malaysia &nbsp;&nbsp;
											</td>
											<td
												valign="middle"
												className="pl-10"
											>
												<div className="border border-black p-2">
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</div>
											</td>
										</tr>
									</td>
									<td style={{ width: '25%' }}>
										<tr>
											<td>
												Seberang Laut <br />
												&nbsp; Oversea &nbsp;&nbsp;
											</td>
											<td
												valign="middle"
												className="pl-10"
											>
												<td
													valign="middle"
													className="pl-10"
												>
													<div className="border border-black p-2">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</div>
												</td>
											</td>
										</tr>
									</td>
									<td
										rowSpan="4"
										style={{ width: '15%' }}
										className="text-center"
									>
										<div
											className="border border-black p-2 "
											style={{
												width: '133px',
												height: '148px',
												marginLeft: '40px',
												paddingTop: '20px'
											}}
										>
											Gambar <br /> Pemohon <br />
											Photograph of <br /> Applicant <br /> (3.5 cm * 5.00 cm)
										</div>{' '}
									</td>
								</tr>
								<tr>
									<td
										colSpan="3"
										className="bg-gray-400 font-bold	"
									>
										{' '}
										A . MAKLUMAT PEMOHON <br />
										&nbsp;&nbsp;&nbsp; PARTICULARS OF APPLICANT{' '}
									</td>
								</tr>
								<tr>
									<td
										colSpan="3"
										className=" font-bold"
									>
										{' '}
										1.&nbsp; Name Penuh (Huruf Besar) <br /> &nbsp;&nbsp;&nbsp;Full Name (Capital
										Letter)
									</td>
								</tr>
								<tr>
									<td
										colSpan="3"
										className="w-80 border border-black p-2 pl-96 font-bold text-center	"
									>
										&nbsp;{localData?.[0]?.passenger?.passenger_name?.toUpperCase()}
									</td>
								</tr>

								<tr>
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										2. *Jantina <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Gender{' '}
									</td>
									<td style={{ width: '25%' }}>
										<table>
											<tr>
												{' '}
												<td>
													Lelaki <br />
													Male &nbsp;&nbsp;
												</td>
												<td
													valign="middle"
													className="pl-10"
												>
													<div className="border border-black p-2">
														<CheckIcon
															className="cursor-pointer inside icon"
															style={{
																visibility:
																	localData?.[0]?.passenger?.gender === 'male'
																		? 'visible'
																		: 'hidden'
															}}
														/>
													</div>
												</td>
											</tr>
										</table>
									</td>
									<td style={{ width: '25%' }}>
										<table>
											<tr>
												<td>
													Perempuan
													<br />
													Female &nbsp;&nbsp;
												</td>
												<td
													valign="middle"
													className="pl-10"
												>
													<div className="border border-black p-2">
														{/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
														<CheckIcon
															className="cursor-pointer inside icon"
															style={{
																visibility:
																	localData?.[0]?.passenger?.gender == 'female'
																		? 'visible'
																		: 'hidden'
															}}
														/>
													</div>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										3. *Tempat/Negara Lahir
									</td>
									<td
										colSpan="2"
										className="w-100 border border-black p-2 text-center font-bold	"
									>
										{localData?.[0]?.passenger?.place_of_birth?.toUpperCase()}
									</td>
								</tr>
								<tr>
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										&nbsp;&nbsp;&nbsp;&nbsp; Place/Country of Birth{' '}
									</td>
									<td
										colSpan="2"
										className="w-100 "
									/>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										4. **Tarikh Lahir <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Date of Birth{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 font-bold	">
											{localData?.[0]?.passenger?.date_of_birth.slice(8, 10)}{' '}
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											{localData?.[0]?.passenger?.date_of_birth.slice(5, 7)}{' '}
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											{localData?.[0]?.passenger?.date_of_birth.slice(0, 4)}{' '}
										</div>
									</td>

									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										<div className="ml-80">
											5. Warganegara <br />
											&nbsp;&nbsp;&nbsp;&nbsp; Nationality{' '}
										</div>
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 pl-10 text-center font-bold	">
											{' '}
											BANGLADESHI
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									/>
									<td
										style={{ width: '25%' }}
										className="w-100 "
									>
										<table>
											<tr>
												<td align="center">
													Hari <br />
													day
												</td>
												<td align="center">
													{' '}
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bulan{' '}
													<br />
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;month
												</td>
												<td align="center">
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tahun{' '}
													<br />
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										6.Pekerjaan <br />
										&nbsp;&nbsp; Occupation{' '}
									</td>
									{/* <td style={{ width: '25%' }} className="w-100 border border-black p-2 mt-2"></td> */}
									<td
										style={{ width: '25%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											&nbsp; {localData?.[0]?.passenger?.profession?.name?.toUpperCase()}
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										7.Alamat <br />
										&nbsp;&nbsp; Address{' '}
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											{localData?.[0]?.passenger?.village?.toUpperCase()},{' '}
											{localData?.[0]?.passenger?.post_office?.toUpperCase()},{' '}
											{localData?.[0]?.passenger?.police_station?.name?.toUpperCase()},
											{localData?.[0]?.passenger?.district?.name?.toUpperCase()},
											{localData?.[0]?.passenger?.country?.name?.toUpperCase()} &nbsp;
										</div>
									</td>
								</tr>
								<tr className="">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										&nbsp;&nbsp;
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100 mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>
								<tr className="">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										&nbsp;&nbsp;
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>

								<tr>
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										8.Taraf Perkahwinan <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Merital Status{' '}
									</td>
									<td style={{ width: '25%' }}>
										<table>
											<tr>
												{' '}
												<td>
													Belum Berkahwin <br />
													Single &nbsp;&nbsp;
												</td>
												<td
													valign="middle"
													className="pl-10"
												>
													<div className="border border-black p-2">
														<CheckIcon
															className="cursor-pointer inside icon"
															style={{
																visibility:
																	localData?.[0]?.passenger?.marital_status ==
																	'single'
																		? 'visible'
																		: 'hidden'
															}}
														/>
													</div>
												</td>
											</tr>
										</table>
									</td>
									<td style={{ width: '25%' }}>
										<table>
											<tr>
												<td>
													Berkhwin
													<br />
													Married &nbsp;&nbsp;
												</td>
												<td
													valign="middle"
													className="pl-10"
												>
													<div className="border border-black p-2">
														<CheckIcon
															className="cursor-pointer inside icon"
															style={{
																visibility:
																	localData?.[0]?.passenger?.marital_status ==
																	'married'
																		? 'visible'
																		: 'hidden'
															}}
														/>{' '}
													</div>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								{/* B part
								 */}

								<tr>
									<td
										colSpan="4"
										className="bg-gray-400 font-bold	"
									>
										{' '}
										B . MAKLUMAT PASPORT PERJALANAN / DOKUMEN PERJALANAN <br />
										&nbsp;&nbsp;&nbsp; PARTICULARS OF PASSPORT / TRAVEL DOCUMENT
									</td>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										9. Jenis Dokumen Perjalanan <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Travel Of Document{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											INTL PASSPORT
										</div>
									</td>

									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										<div className="ml-80">
											10. Nombor <br />
											&nbsp;&nbsp;&nbsp;&nbsp; Number{' '}
										</div>
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											&nbsp;{localData?.[0]?.passenger?.passport_no}
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										11. Tempat / Negara Dikelurakan
										<br />
										&nbsp;&nbsp;&nbsp;&nbsp;Place/ Country Of Issue{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											DHAKA BANGLADESH
										</div>
									</td>

									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										<div className="ml-80">
											{' '}
											11. **Sahselingga <br />
											&nbsp;&nbsp;&nbsp;&nbsp; Valid Until{' '}
										</div>
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											{moment(new Date(localData?.[0]?.passenger?.passport_expiry_date)).format(
												'DD-MM-YYYY'
											)}
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										13.Date of Issue :
										{moment(new Date(localData?.[0]?.passenger?.passport_issue_date)).format(
											'DD-MM-YYYY'
										)}
										<br /> &nbsp;&nbsp;&nbsp;&nbsp;Place of Issue :{' '}
										{localData?.[0]?.passenger?.passport_issue_place?.toUpperCase()}
									</td>
								</tr>

								<tr className="mt-60">
									<td
										style={{ width: '20%' }}
										colSpan="2"
									>
										Borang ini hendaklah ditaip
									</td>

									<td
										colSpan="2"
										className="w-100  mt-80"
									>
										<div className="flex float-right"> Foramt Tarik 99/99/9999</div>
									</td>
								</tr>

								<tr>
									<td
										colSpan="4"
										className="bg-gray-400 font-bold	"
									>
										{' '}
										C .BUTIR-BUTIR PEGANJUR DI MALAYSIA
										<br />
										&nbsp;&nbsp;&nbsp; PARTICULARS OF SPONSOR IN MALAYSIA{' '}
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										13.Nama Penuh(Hurf Beser) <br />
										&nbsp;&nbsp; Full Name (Capital Letter){' '}
									</td>
									<td
										colSpan="3"
										style={{ width: '100%' }}
										className="w-100  mt-0 text-center"
									>
										<div className="border border-black p-2 text-center font-bold	">
											&nbsp; {localData?.[0]?.visa_entry?.sponsor_name_english?.toUpperCase()}
										</div>
									</td>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										14.No Kad Pengenalan <br />
										&nbsp;&nbsp;&nbsp;&nbsp; NRIC{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											INTL PASSPORT
										</div>
									</td>

									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										<div className="ml-80">
											15. No Telefon <br />
											&nbsp;&nbsp;&nbsp;&nbsp; Telephone No{' '}
										</div>
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											{' '}
											&nbsp; {localData?.[0]?.visa_entry?.sponsor_mobile}
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										16.Alamat <br />
										&nbsp;&nbsp; Address{' '}
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100 text-center font-bold	">
											&nbsp; {localData?.[0]?.visa_entry?.sponsor_address?.toUpperCase()}
										</div>
									</td>
								</tr>
								<tr className="">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										&nbsp;&nbsp;
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100 mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>
								<tr className="">
									<td
										style={{ width: '25%' }}
										className=" font-bold"
									>
										&nbsp;&nbsp;
									</td>
									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '25%' }}
										className=" font-bold pl-80"
									>
										Negeri <br /> State
									</td>

									<td
										colSpan="3"
										style={{ width: '75%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>

								<tr>
									<td
										colSpan="4"
										className="bg-gray-400 font-bold	"
									>
										{' '}
										D .BUTIR-BUTIR PERMOHONAN
										<br />
										&nbsp;&nbsp;&nbsp; DETAILS OF APPLIDATION{' '}
									</td>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										17.Tempoh Tingaal Yang <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Duration Of Proposed Stay{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									/>

									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										<div className="ml-80">
											Bulan <br />
											Month{' '}
										</div>
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										<div className="border border-black p-2 w-100"> &nbsp;</div>
									</td>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										18.*Tujuan Perjalanan <br />
										&nbsp;&nbsp;&nbsp;&nbsp; Purposed Of Journey{' '}
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										Bercuti <br /> Holiday
									</td>

									<td
										valign="middle"
										width="100%"
										className="pl-10 d-flex"
										style={{ display: 'flex' }}
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>{' '}
										<div>
											Transit <br /> Transit
										</div>
									</td>

									<td
										valign="middle"
										width="20%"
										className="pl-10"
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										&nbsp;
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										Urusan Perniagaan <br /> Business
									</td>

									<td
										valign="middle"
										width="100%"
										className="pl-10 d-flex"
										style={{ display: 'flex' }}
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>{' '}
										<div>
											Urusan Rasmi <br /> Office trip
										</div>
									</td>

									<td
										valign="middle"
										width="20%"
										className="pl-10"
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										&nbsp;
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										Melawat Saudara Mara/ Kawn <br /> Visiting Friends/ Relative
									</td>

									<td
										valign="middle"
										width="100%"
										className="pl-10 d-flex"
										style={{ display: 'flex' }}
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>{' '}
										<div>
											Persidangan <br />
											Conference
										</div>
									</td>

									<td
										valign="middle"
										width="20%"
										className="pl-10"
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
									</td>
								</tr>
								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										&nbsp;
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										Bekerja <br /> Employement
									</td>

									<td
										valign="middle"
										width="100%"
										className="pl-10 d-flex"
										style={{ display: 'flex' }}
									>
										<div className="border border-black  w-24 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>{' '}
										<div>
											Lein-lain (Nyatakan) <br />
											Other nSpecify
										</div>
									</td>

									<td
										valign="middle"
										width="20%"
										className="pl-10"
									>
										<div className="border border-black  w-100 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
									</td>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										className=" font-bold"
									>
										&nbsp;
									</td>
									<td
										style={{ width: '20%' }}
										className="w-100  mt-0"
									>
										Belajar
										<br /> VStudy
									</td>

									<td
										valign="middle"
										width="100%"
										className="pl-10 d-flex"
										style={{ display: 'flex' }}
									>
										<div className="border border-black  w-28 d-flex mx-10">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>{' '}
										<div>
											Persidangan <br />
											Conference
										</div>
									</td>

									<td
										valign="middle"
										width="20%"
										className="pl-10"
									/>
								</tr>

								<tr className="mt-6">
									<td
										style={{ width: '20%' }}
										colSpan="2"
									>
										Tarikh <br /> Date{' '}
									</td>

									<td
										colSpan="2"
										className="w-100  mt-80"
									>
										<div className="flex float-right">
											{' '}
											Tandatangan / Penganjur <br /> Signature of Application / Sponsor
										</div>
									</td>
								</tr>
								<tr className="mt-60">
									<td
										style={{ width: '20%' }}
										colSpan="2"
										className="px-32 mt-60"
									>
										Borang ini Hendaklah ditaip . Tandakan (*) dalam petak yang berkenaan <br />{' '}
										This form should be typed . Mark (*) in the appropiate box{' '}
									</td>

									<td
										colSpan="2"
										className="w-100  mt-80"
									>
										<div className="flex float-right px-32">
											{' '}
											Foramt Tarik 99/99/9999 <br /> Date Format DD/MM/YYYY
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MalaysiaVisaForm;
