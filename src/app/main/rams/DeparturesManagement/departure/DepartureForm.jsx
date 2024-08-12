/* eslint-disable react/no-unknown-property */
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
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import moment from 'moment';
import { useGetDepartureQuery } from '../DeparturesApi';

const useStyles = makeStyles(() => ({
	textField: {
		'& > div': {
			height: '35px'
		}
	},
	container: {
		padding: '0px 25px',
		minWidth: '1000px',
		'& *': {
			boxSizing: 'border-box'
		},
		'& .row': {
			marginRight: '-15px',
			marginLeft: '-15px'
		},
		'& .western': {
			marginBottom: '5px'
		},
		'& .borderedTable': {
			'& table, th, td': {
				border: '1px solid white'
			},
			'& table': {
				color: 'black',
				background: 'transparent',
				borderSpacing: 0,
				borderCollapse: 'collapse',
				'& td, th': {
					padding: '0px'
				}
			}
		}
	}
}));

function DepartureForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;
	const [localData, setLocalData] = useState([]);

	const routeParams = useParams();
	const classes = useStyles(props);
	const [departureId, setDepartureId] = useState('');
	const [showPrint, setShowPrint] = useState(false);

	const { data, isSuccess } = useGetDepartureQuery(departureId, {
		skip: !departureId
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

	console.log('Fetched Data:', localData, isSuccess);
	useEffect(() => {
		if (_.isEmpty(data)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.departureId !== 'departure-form') {
			setValue('name', routeParams.departureId);
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
				setDepartureId(value);
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
			setDepartureId(value);
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
				<div
					className="row px-20 py-20"
					style={{ height: '1080px', width: '45%' }}
				>
					<div className="md:w-full">
						<div>
							<table
								width="100%"
								cellpadding="4"
								cellspacing="1"
							>
								<tr>
									<td
										valign="middle"
										style={{ width: '15%', padding: 0 }}
									>
										<img
											src="assets/images/logos/departure.png"
											width="70"
											align="center"
											height="70"
											style={{ marginLeft: '45%', marginTop: '10px', filter: 'grayscale(100%)' }}
										/>
									</td>
								</tr>
								<tr valign="middle">
									<td
										valign="middle"
										style={{ width: '70%' }}
									>
										<center>
											<b> গণপ্রজাতন্ত্রী বাংলাদেশ সরকার </b>
											<br />
											<b>
												<span style={{ fontSize: 'large' }}>
													Government People’s Republic of Bangladesh
												</span>
											</b>
											<br />
											<b>(বহিগমন কার্ড /Departure Card)</b>
										</center>
									</td>

									<td
										valign="middle"
										style={{ width: '15%' }}
									>
										&nbsp;
									</td>
								</tr>
							</table>

							<table
								width="100%"
								cellspacing="10"
								cellpadding="3"
							>
								<tr>
									<td colspan="2">
										{/* Table for Name  */}
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													1.
												</td>
												<td>নাম</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													{localData?.[0]?.passenger?.passenger_name}
												</td>
											</tr>
											<tr>
												<td>Name</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<td>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													2.
												</td>
												<td>সেক্স </td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
											</tr>
											<tr>
												<td>Sex</td>
											</tr>
										</td>

										<td>
											<div style={{ display: 'flex' }}>
												<div style={{ display: 'flex' }}>
													<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
														{' '}
														<input
															type="checkbox"
															id="male"
															name="male"
															value="male"
															//   checked={isChecked}
														/>
													</div>
													<div>
														Male <br /> পুরুষ{' '}
													</div>
												</div>
												<div style={{ display: 'flex', paddingLeft: '15px' }}>
													<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
														{' '}
														<input
															type="checkbox"
															id="female"
															name="female"
															value="female"
															//   checked={isChecked}
														/>
													</div>
													<div>
														Female <br /> মহিলা{' '}
													</div>
												</div>
											</div>
										</td>
									</td>

									<td>
										<tr>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px', paddingRight: '10px' }}
											>
												3.
											</td>
											<td>জন্ম তারিখ </td>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px' }}
											>
												:
											</td>
											<td
												rowspan="2"
												valign="middle"
											>
												{/* Table For Date  */}
												<table>
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(0, 1)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(1, 2)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(3, 4)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(4, 5)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(6, 7)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(7, 8)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(8, 9)
																: 'Y'}
														</td>
														<td
															style={{
																borderLeft: '1px solid black',
																borderRight: '1px solid black',
																padding: '5px'
															}}
														>
															{localData?.[0]?.passenger?.date_of_birth
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.date_of_birth
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(9, 10)
																: 'Y'}
														</td>
													</tr>
												</table>

												{/* {moment(new Date(localData?.[0]?.passenger?.date_of_birth)).format(
															'DD-MM-YYYY'
														)} */}
											</td>
										</tr>
										<tr>
											<td>Date of Birth</td>
										</tr>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										{' '}
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													4.
												</td>
												<td>জাতীয়তা</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													Bangladeshi{' '}
												</td>
											</tr>
											<tr>
												<td>Nationality</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													5.
												</td>
												<td>পাসপোর্ট নং</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													{localData?.[0]?.passenger?.passport_no}
												</td>
											</tr>
											<tr>
												<td>Passport No.</td>
											</tr>
										</table>
									</td>
									<td style={{ alignItems: 'right' }}>
										<tr>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px', paddingRight: '10px' }}
											>
												6.
											</td>
											<td>মেয়াদ উওীর্ণের তারিখ </td>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px' }}
											>
												:
											</td>
											<td
												rowspan="2"
												valign="middle"
											>
												{/* Table For Date  */}
												<table>
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(0, 1)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(1, 2)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(3, 4)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(4, 5)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(6, 7)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(7, 8)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(8, 9)
																: 'Y'}
														</td>
														<td
															style={{
																borderLeft: '1px solid black',
																borderRight: '1px solid black',
																padding: '5px'
															}}
														>
															{localData?.[0]?.passenger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(9, 10)
																: 'Y'}
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td>Date of Expiry</td>
										</tr>
									</td>
								</tr>

								<tr>
									<td>
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													7.
												</td>
												<td>ফাইট নম্বর নং</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													{localData?.[0]?.flight?.flight_no}
												</td>
											</tr>
											<tr>
												<td>Flight Number</td>
											</tr>
										</table>
									</td>

									<td style={{ alignItems: 'right' }}>
										<tr>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px', paddingRight: '10px' }}
											>
												8.
											</td>
											<td>প্রস্থানের তারিখ </td>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px' }}
											>
												:
											</td>
											<td
												rowspan="2"
												valign="middle"
											>
												{/* Table For Date  */}
												<table>
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(0, 1)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(1, 2)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(3, 4)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(4, 5)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(6, 7)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(7, 8)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(8, 9)
																: 'Y'}
														</td>
														<td
															style={{
																borderLeft: '1px solid black',
																borderRight: '1px solid black',
																padding: '5px'
															}}
														>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(9, 10)
																: 'Y'}
														</td>
													</tr>
												</table>

												{/* {moment(new Date(localData?.[0]?.passenger?.date_of_birth)).format(
															'DD-MM-YYYY'
														)} */}
											</td>
										</tr>
										<tr>
											<td>Date of Departure</td>
										</tr>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										{' '}
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													9.
												</td>
												<td>বাংলাদেশে অবস্থানকালীন ঠিকানা </td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												/>
											</tr>
											<tr>
												<td> ( বিদেশী নাগরিকের জন্য )</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										{' '}
										{/* Table for Address for Bangladesh */}
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												/>
												<td>Address in Bangladesh</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												/>
											</tr>
											<tr>
												<td> For Foreigners</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										{' '}
										{/* Table for Address for Bangladesh */}
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												/>
												<td>Address in Bangladesh</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												/>
											</tr>
											<tr>
												<td> For Foreigners</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													a.
												</td>
												<td>ভিসা নম্বর </td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													{localData?.[0]?.passenger?.visa_entry?.passport_number}
												</td>
											</tr>
											<tr>
												<td>Visa Number</td>
											</tr>
										</table>
									</td>

									<td style={{ alignItems: 'right' }}>
										<tr>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px', paddingRight: '10px' }}
											>
												b.
											</td>
											<td>মেয়াদ উওীর্ণের তারিখ </td>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px' }}
											>
												:
											</td>
											<td
												rowspan="2"
												valign="middle"
											>
												{/* Table For Date  */}
												<table>
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(0, 1)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(1, 2)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(3, 4)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(4, 5)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(6, 7)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(7, 8)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(8, 9)
																: 'Y'}
														</td>
														<td
															style={{
																borderLeft: '1px solid black',
																borderRight: '1px solid black',
																padding: '5px'
															}}
														>
															{localData?.[0]?.flight?.flight_date
																? moment(new Date(localData?.[0]?.flight?.flight_date))
																		.format('DD-MM-YYYY')
																		.slice(9, 10)
																: 'Y'}
														</td>
													</tr>
												</table>

												{/* {moment(new Date(localData?.[0]?.passenger?.date_of_birth)).format(
															'DD-MM-YYYY'
														)} */}
											</td>
										</tr>
										<tr>
											<td>Date of Expiry</td>
										</tr>
									</td>
								</tr>

								<tr>
									<td>
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													c.
												</td>
												<td>ভিসার প্রকার</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												>
													Worker
												</td>
											</tr>
											<tr>
												<td>Type of visa</td>
											</tr>
										</table>
									</td>

									<td>
										<table>
											<tr>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px', paddingRight: '10px' }}
												>
													c.
												</td>
												<td>ভ্রমনের উদ্দেশ্য</td>
												<td
													rowspan="2"
													valign="middle"
													style={{ paddingLeft: '10px' }}
												>
													:
												</td>
												<td
													rowspan="2"
													valign="middle"
												/>
											</tr>
											<tr>
												<td>Type of visa</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
								<br />
								<br />
								<br />
								<tr>
									<td>
										<table
											style={{ justifyContent: 'center' }}
											width="40%"
										>
											<tr>
												<td style={{ borderTop: '1px dashed black', align: 'center' }}>
													যাএীর স্বাক্ষর
												</td>
											</tr>
											<tr>
												<td>Passenger's Signature</td>
											</tr>
										</table>
									</td>

									<td>
										<table
											style={{ justifyContent: 'center' }}
											width="10%"
										>
											<tr>
												<td style={{ borderTop: '1px dashed black', align: 'center' }}>সীল</td>
											</tr>
											<tr>
												<td>Seal</td>
											</tr>
										</table>
									</td>
								</tr>
								<br />
								<br />
								<br />
								<tr>
									<td>
										<tr>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px', paddingRight: '10px' }}
											/>
											<td>তারিখ </td>
											<td
												rowspan="2"
												valign="middle"
												style={{ paddingLeft: '10px' }}
											>
												:
											</td>
											<td
												rowspan="2"
												valign="middle"
											>
												{/* Table For Date  */}
												<table>
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passen?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(0, 1)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passer?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(1, 2)
																: 'D'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passer?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(3, 4)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passer?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(4, 5)
																: 'M'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.panger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(6, 7)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passer?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(7, 8)
																: 'Y'}
														</td>
														<td style={{ borderLeft: '1px solid black', padding: '5px' }}>
															{localData?.[0]?.passer?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(8, 9)
																: 'Y'}
														</td>
														<td
															style={{
																borderLeft: '1px solid black',
																borderRight: '1px solid black',
																padding: '5px'
															}}
														>
															{localData?.[0]?.pasger?.passport_expiry_date
																? moment(
																		new Date(
																			localData?.[0]?.passenger?.passport_expiry_date
																		)
																	)
																		.format('DD-MM-YYYY')
																		.slice(9, 10)
																: 'Y'}
														</td>
													</tr>
												</table>

												{/* {moment(new Date(localData?.[0]?.passenger?.date_of_birth)).format(
															'DD-MM-YYYY'
														)} */}
											</td>
										</tr>
										<tr>
											<td>Date</td>
										</tr>
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

export default DepartureForm;
