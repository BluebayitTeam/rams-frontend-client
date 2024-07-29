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
import { Print } from '@material-ui/icons';
import _ from 'lodash';
import moment from 'moment';
import { useGetKuwaitVisaQuery } from '../KuwaitVisasApi';

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
			// marginRight: '-15px',
			// marginLeft: '-15px'
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
					padding: '5px'
				}
			}
		}
	}
}));

function KuwaitVisaForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;

	const routeParams = useParams();
	const classes = useStyles(props);
	const [kuwaitVisaId, setKuwaitVisaId] = useState('');
	const [showPrint, setShowPrint] = useState(false);

	const { data } = useGetKuwaitVisaQuery(kuwaitVisaId, {
		skip: !kuwaitVisaId
	});

	useEffect(() => {
		if (_.isEmpty(data)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.kuwaitVisaId !== 'kuwaitVisa-form') {
			setValue('name', routeParams.kuwaitVisaId);
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
				setKuwaitVisaId(value);
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
			setKuwaitVisaId(value);
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
				<div style={{ minWidth: '250px' }}>
					<h4>(Please use Chrome browser only to Print)</h4>
				</div>
			</div>
			<div
				ref={componentRef}
				className={classes.container}
			>
				<div className="row p-10">
					<div className="md:w-full p-20">
						<div>
							<table
								width="100%"
								cellpadding="7"
								cellspacing="2"
								className="mt-60 p-10"
							>
								<tr valign="middle">
									<td
										valign="middle"
										align="center"
										style={{ width: '20%', padding: 0, marginLeft: '50px' }}
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
											Please attach <br /> 2 photographs <br /> taken within <br /> the last 6
											months <br /> (3.5 * 4.5 cm)
										</div>{' '}
									</td>
									<td
										valign="middle"
										style={{ width: '50%' }}
									>
										<center>
											<img
												src="assets/images/logos/kuwaitVisa.png"
												align="CENTER"
												width="120"
												height="120"
											/>{' '}
											<span style={{ fontSize: 'large' }}>
												{' '}
												<b>VISA APPLICATION FORM نموذج طلب تأشيره</b>
											</span>
										</center>
									</td>

									<td
										valign="middle"
										style={{ width: '100%' }}
									>
										<table cellspacing="15">
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
															<td className="whitespace-nowrap">
																قنصلية / سفارة دولة الكويت{' '}
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
															<td className="whitespace-nowrap">بمدينة</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										&nbsp;
									</td>
								</tr>
							</table>

							<table
								width="100%"
								cellpadding="7"
								cellspacing="2"
								className="mt-32 p-10"
							>
								<tr>
									<td>
										<table width="100%">
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap">Application No:</td>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td className="whitespace-nowrap text-right">Transit Visa &nbsp;</td>
												<td
													className="whitespace-nowrap d-flex"
													style={{ display: 'flex' }}
												>
													تأشيرة مرور{' '}
													<div className="border border-black  w-16 d-flex text-left ml-10">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</div>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td className="whitespace-nowrap text-right">Entry Visa &nbsp;</td>
												<td
													className="whitespace-nowrap d-flex"
													style={{ display: 'flex' }}
												>
													تأشيرة دخول{' '}
													<div className="border border-black  w-16 d-flex text-left ml-10">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</div>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
															<td className="whitespace-nowrap">: رقم الطلب </td>
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
												<td>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap">Date:</td>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td className="whitespace-nowrap text-right">Transit Permit &nbsp;</td>
												<td
													className="whitespace-nowrap d-flex"
													style={{ display: 'flex' }}
												>
													و إذن مرور
													<div className="border border-black  w-16 d-flex text-left ml-10">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</div>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td className="whitespace-nowrap text-right">Visa Permit &nbsp;</td>
												<td
													className="whitespace-nowrap d-flex"
													style={{ display: 'flex' }}
												>
													لا إذن زيارة
													<div className="border border-black  w-16 d-flex text-left ml-10">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</div>
												</td>
											</tr>
										</table>
									</td>

									<td>
										<table width="100%">
											<tr>
												<td>
													<table width="100%">
														<tr>
															<td
																style={{
																	borderBottom: '1px dashed black',
																	width: '100%'
																}}
															/>
															<td className="whitespace-nowrap">: التاريخ </td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>

							<table
								width="100%"
								className="mt-32 p-10 border border-black"
							>
								<tr className="border-collapse border border-black">
									<td>
										<table width="100%">
											<tr>
												<td>
													<center>
														<b>Applicant's Data</b>
													</center>
												</td>
												<td>
													<b>
														<center> بيانات طالب التأشيرة الإسم الأول</center>
													</b>
												</td>{' '}
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>Sex الجنس</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>Last Name اللقب / إسم العائلة</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>Middle Name إسم الأب</center>
												</td>
												<td width="25%">
													<center>First Name الإسم الأول</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>
														<b> {data?.[0]?.passenger?.gender?.toUpperCase()}</b>
													</center>
												</td>

												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>
														<b>
															{' '}
															{data?.[0]?.passenger?.passenger_name
																.substring(
																	data?.[0]?.passenger?.passenger_name.indexOf(' ') +
																		1
																)
																?.toUpperCase()}
														</b>
													</center>
												</td>
												<td
													className="border-r-1 border-black text-center"
													width="25%"
												>
													<center>
														<b> &nbsp;</b>
													</center>
												</td>
												<td width="25%">
													<center>
														<b>
															{' '}
															{data?.[0]?.passenger?.passenger_name
																.split(' ')[0]
																?.toUpperCase()}
														</b>
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Place of Birth مكان الميلاد</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Date of Birth تاريخ الميلاد</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Pre.Nationality الجنسية السابقة</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Nationality االجنسية</center>
												</td>
												<td width="20%">
													<center>Profession المهنة</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black text-center"
													width="20%"
												>
													<center>
														<b>{data?.[0]?.passenger?.place_of_birth?.toUpperCase()} </b>
													</center>
												</td>

												<td
													className="border-r-1 border-black text-center"
													width="20%"
												>
													<center>
														<b>
															{' '}
															{moment(
																new Date(data?.[0]?.passenger?.date_of_birth)
															).format('DD-MM-YYYY')}
														</b>
													</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b> BANGLADESHI</b>
													</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b> BANGLADESHI</b>
													</center>
												</td>
												<td width="20%">
													<center>
														<b>{data?.[0]?.embassy?.profession_english?.toUpperCase()}</b>
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>Permanent Address: </center>
												</td>
												<td
													className="border-r-1 border-black  font-bold"
													width="66.66%"
												>
													<center>
														{data?.[0]?.passenger?.village?.toUpperCase()},{' '}
														{data?.[0]?.passenger?.post_office?.toUpperCase()},{' '}
														{data?.[0]?.passenger?.police_station?.name?.toUpperCase()},
														{data?.[0]?.passenger?.district?.name?.toUpperCase()},
														{data?.[0]?.passenger?.country?.name?.toUpperCase()} &nbsp;{' '}
													</center>
												</td>
												<td width="16.66%">
													<center>عنوان دائم </center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>Home Fax No.</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center> رقم فاكس المنزل</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>Home Phone No</center>
												</td>
												<td
													className="border-r-1 border-black  font-bold"
													width="16.66%"
												>
													<center>{data?.[0]?.passenger?.contact_no}</center>
												</td>
												<td width="16.66%">
													<center> رقم هاتف المنزل</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center> Address in Kuwait: </center>
												</td>
												<td
													className="border-r-1 border-black"
													width="66.66%"
												>
													<center>&nbsp; </center>
												</td>
												<td width="16.66%">
													<center>العنوان في الكويت</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center> Fax No. in Kuwait</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center> رقم الفاكس في الكويت </center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center> Phone No in Kuwait</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>&nbsp;</center>
												</td>
												<td width="16.66%">
													<center> رقم الهاتف في الكويت</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td>
										<table width="100%">
											<tr>
												<td>
													<center>
														<b>Applicant's Passport Information</b>
													</center>
												</td>
												<td>
													<b>
														<center>معلومات جواز سفر مقدم الطلب</center>
													</b>
												</td>{' '}
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Valid Until صالح حتى</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Date of Issue تاريخ المسألة</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Place of Issue مكان الإصدار</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>Passport Type نوع جواز السفر</center>
												</td>
												<td width="20%">
													<center>Passport No رقم جواز السفر</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b>
															{' '}
															{moment(
																new Date(data?.[0]?.passenger?.passport_expiry_date)
															).format('DD-MM-YYYY')}{' '}
														</b>
													</center>
												</td>

												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b>
															{' '}
															{moment(
																new Date(data?.[0]?.passenger?.passport_issue_date)
															).format('DD-MM-YYYY')}
														</b>
													</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b>
															{' '}
															{data?.[0]?.passenger?.passport_issue_place?.toUpperCase()}
														</b>
													</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>
														<b> {data?.[0]?.passenger?.passport_type?.toUpperCase()}</b>
													</center>
												</td>
												<td width="20%">
													<center>
														<b> {data?.[0]?.passenger?.passport_no}</b>
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td>
										<table width="100%">
											<tr>
												<td>
													<center>
														<b>Family members travelling on same passport (if any)</b>
													</center>
												</td>
												<td>
													<b>
														<center>
															{' '}
															أعضاء العائلة الذين يسافرون على نفس جواز السفر (إن وجد)
														</center>
													</b>
												</td>{' '}
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td width="12.5%">
													<center>Sex </center>
												</td>

												<td
													className="border-r-1 border-black"
													width="12.5%"
												>
													<center>الجنس </center>
												</td>
												<td width="12.5%">
													<center>Place Of Birth </center>
												</td>
												<td
													className="border-r-1 border-black"
													width="12.5%"
												>
													<center>مكان الميلاد</center>
												</td>

												<td width="12.5%">
													<center>Date Of Birth </center>
												</td>

												<td
													className="border-r-1 border-black"
													width="12.5%"
												>
													<center>تاريخ الولادة</center>
												</td>

												<td width="12.5%">
													<center>Name </center>
												</td>
												<td width="12.5%">
													<center>اسم </center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="25%"
												>
													<center>&nbsp;</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td>
										<table width="100%">
											<tr>
												<td>
													<center>
														<b>Purpose of Visit</b>
													</center>
												</td>
												<td>
													<b>
														<center>غرض الزيارة </center>
													</b>
												</td>{' '}
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="33.33%"
												>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap text-right">
																Personal Visit &nbsp;
															</td>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																زيارة شخصية
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td
													className="border-r-1 border-black"
													width="33.33%"
												>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap text-right">
																Business Visit
															</td>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																Business Visit
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>

												<td
													className="border-r-1 border-black"
													width="33.33%"
												>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap text-right">
																Official Visit
															</td>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																زيارة رسمية
																<div className=" w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="33.33%"
												>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap text-right">
																Multiple Entries
															</td>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																مداخل متعددة
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td
													className="border-r-1 border-black"
													width="33.33%"
												>
													<table width="100%">
														<tr>
															<td className="whitespace-nowrap text-right">
																Single Entry
															</td>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																دخول واحد
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>Date.</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>&nbsp;</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>رقم فاكسل</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>Applicant Signature :</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>&nbsp;</center>
												</td>

												<td
													className="border-r-1 border-black"
													width="16.66%"
												>
													<center>توقيع مقدم الطلب</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td
										className="p-0 border-r-1 border-black"
										width="16.66%"
									>
										<center>
											التاريخ : أقر أنا الموقع أعلاه بأن البيانات المدرجة بهذا الطلب صحيحة وأتعهد
											بتنفيذ ما جاء بقانون إقامة الأجانب رقم 17 لسنة 1959 والقوانين المعدلة له ،
											وما جاء باللائحة التنفيذية لهذا القانون
											<br />
											<small>
												{' '}
												I, the oversigned acknowledge that the infomation given here is true &
												undertake to obey the Foreigners Residence Law # 17 of 1959 with later
												amendments & executive instructions for this law
											</small>
										</center>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td
										className="p-0 border-r-1 border-black"
										width="16.66%"
									>
										<center>
											Maximum stay in Kuwait one month each entry (Visitors Visa)-الحد الأعلى
											للبقاء في الكويت شهر واحد لكل سفرة (في حالة الزيارة)
										</center>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td>
										<table width="100%">
											<tr>
												<td>
													<center>
														<b>For Official Use Only</b>
													</center>
												</td>
												<td>
													<b>
														<center>للإستعمال الرسمي فقط</center>
													</b>
												</td>{' '}
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td width="20%">
													<table width="100%">
														<tr>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																أفراد{' '}
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td width="20%">
													<table width="100%">
														<tr>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																شركات
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<table width="100%">
														<tr>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																و حكومة
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td width="40%">
													<center>
														{' '}
														نوع الكفيل في حالة الإقامة المؤقتة للعمل في الكويت :
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="85%"
												>
													<center>&nbsp; </center>
												</td>
												<td width="15%">
													<center>: إسم الكفيل</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="85%"
												>
													<center>&nbsp; </center>
												</td>
												<td width="15%">
													<center>: العنوان</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="35%"
												>
													<center>&nbsp; </center>
												</td>
												<td
													width="15%"
													className="border-r-1 border-black"
												>
													<center>: رقم الفاكس</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="35%"
												>
													<center>&nbsp; </center>
												</td>
												<td width="15%">
													<center>: رقم الهاتف</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="70%"
												>
													<center>&nbsp; </center>
												</td>

												<td width="30%">
													<center>رقم شهادة عدم الممانعة أو تصريح العمل (إن وجد) :</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>&nbsp; </center>
												</td>
												<td
													width="20%"
													className="border-r-1 border-black"
												>
													<center>: تاريخ الإصدار</center>
												</td>
												<td
													className="border-r-1 border-black"
													width="20%"
												>
													<center>&nbsp; </center>
												</td>
												<td
													width="20%"
													className="border-r-1 border-black"
												>
													<center>: رقم سمة الدخول أو التأشيرة</center>
												</td>
												<td width="10%">
													<table width="100%">
														<tr>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																:ومنحت التأشيرة
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td width="10%">
													<table width="100%">
														<tr>
															<td
																className="whitespace-nowrap d-flex"
																style={{ display: 'flex' }}
															>
																:و مؤجلة
																<div className="border border-black  w-16 d-flex text-left ml-10">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													className="border-r-1 border-black"
													width="45%"
												>
													<table width="100%">
														<tr>
															<td>
																<table width="100%">
																	<tr>
																		<td
																			className="whitespace-nowrap d-flex"
																			style={{ display: 'flex' }}
																		>
																			: عدة سفرات
																			<div className="border border-black  w-16 d-flex text-left ml-10">
																				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																			</div>
																		</td>
																	</tr>
																</table>
															</td>
															<td>
																<table width="100%">
																	<tr>
																		<td
																			className="whitespace-nowrap d-flex"
																			style={{ display: 'flex' }}
																		>
																			: سفرة واحدة
																			<div className="border border-black  w-16 d-flex text-left ml-10">
																				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																			</div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>{' '}
												</td>
												<td
													width="40%"
													className="border-r-1 border-black"
												>
													<center>&nbsp; </center>
												</td>
												<td width="15%">
													<center>: صلاحيتها </center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr className="border-collapse border border-black">
									<td className="p-0">
										<table width="100%">
											<tr>
												<td
													width="85%"
													className="border-r-1 border-black"
												>
													<center>&nbsp; </center>
												</td>
												<td width="15%">
													<center>: ملاحظات </center>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>

							<p style={{ textAlign: 'right', marginTop: '20px' }}>
								{' '}
								______________________ :توقيع المسؤول
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default KuwaitVisaForm;
