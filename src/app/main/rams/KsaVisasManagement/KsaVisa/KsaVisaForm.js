import { makeStyles, TextField } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getKsaVisa } from '../store/ksaVisaSlice';

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
function KsaVisaForm() {
	const methods = useFormContext();
	const { control, watch } = methods;

	const classes = useStyles();

	const dispatch = useDispatch();

	const data = useSelector(({ ksaVisasManagement }) => ksaVisasManagement.ksaVisa);

	const [showPrint, setShowPrint] = useState(false);
	useEffect(() => {
		_.isEmpty(data) ? setShowPrint(false) : setShowPrint(true);
	}, [data]);

	//print dom ref
	const componentRef = useRef();

	//printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

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
								onKeyDown={ev => {
									if (ev.key === 'Enter') {
										ev.target.value && dispatch(getKsaVisa(ev.target.value));
									}
								}}
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
						onClick={() => watch('name') && dispatch(getKsaVisa(watch('name')))}
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
			<div ref={componentRef} className={`${classes.container}`}>
				<div className="row">
					<div className="md:w-full">
						<div>
							<table style={{ height: '600px', width: '100%' }}>
								<tr>
									<td style={{ textAlign: 'center' }}>
										<table width="100%">
											<tr style={{ textAlign: 'center' }}>
												<td colspan="3" style={{ textAlign: 'center' }}>
													<table align="center">
														<tr>
															<td align="center">
																Visa Number:
																{data?.[0]?.visa_entry?.visa_number}
															</td>
														</tr>
														<tr>
															<td align="right">
																{data?.[0]?.visa_entry?.visa_number && (
																	<Barcode
																		value={data?.[0]?.visa_entry?.visa_number}
																		{...barcodeConfig}
																	/>
																)}
															</td>
														</tr>
														<tr>
															<td align="center">
																Visa Date:
																{data?.[0]?.visa_entry?.visa_issue_date &&
																	moment(
																		new Date(data?.[0]?.visa_entry?.visa_issue_date)
																	).format('DD-MM-YYYY')}
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
																		src="assets/images/logos/ksaVisaLogo.jpg"
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
																		{/* <tr>
																			<td> */}
																		{/* <asp:Label ID="lblInternetNo"  runat="server" Font-Bold="true" fontSize="16pt}} ></asp:Label><br />
                                                                                    <asp:Label ID="lbloldmofa" Visible="false"  runat="server" Font-Bold="true" fontSize="Medium" ></asp:Label> */}
																		{/* </td>
																		</tr> */}
																		<tr>
																			<td
																				style={{
																					fontSize: '9.5pt',
																					fontWeight: 'bold'
																				}}
																			>
																				E{data?.[0]?.mofa?.mofa_no}&nbsp;
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
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Full
																name:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
																<b>
																	{data?.[0]?.passenger?.passenger_name &&
																		`${data?.[0]?.passenger?.passenger_name} ${
																			data?.[0]?.passenger?.gender
																				? data?.[0]?.passenger?.gender?.match(
																						/female/i
																				  )
																					? 'D/O'
																					: 'S/O'
																				: ''
																		} ${data?.[0]?.passenger?.father_name || ''}`}
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
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Mother's name:&emsp;&emsp;
																{data?.[0]?.passenger?.mother_name}
															</td>
															<td style={{ textAlign: 'right' }}>:&nbsp;إسم الأم</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Date of birth:&emsp;
																{data?.[0]?.passenger?.date_of_birth &&
																	moment(
																		new Date(data?.[0]?.passenger?.date_of_birth)
																	).format('DD-MM-YYYY')}
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;تاريخ الولادة&emsp;&emsp;Place of birth:
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;
																<b>{data?.[0]?.passenger?.place_of_birth}</b>
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;محل الولادة
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
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
												<td colspan="3">
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
																	{data?.[0]?.passenger?.gender
																		? data?.[0]?.passenger?.gender?.match(/female/i)
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
																{data?.[0]?.passenger?.marital_status}
															</td>
															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																:&nbsp;الحالة الإجتماعية
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
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
																<b>{data?.[0]?.passenger?.religion}</b>
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
													{/*<asp:Label ID="lblJobtitleArabic" Font-Bold="true" fontSize="11pt}} runat="server"  ></asp:Label>*/}{' '}
													<span style={{ color: 'white', fontSize: '1px' }}>a</span>
													{data?.[0]?.unknown} :&nbsp;المهنـة
												</td>
											</tr>
											<td colspan="3">
												<table width="100%">
													<tr style={{ borderBottom: '1px solid black' }}>
														<td style={{ textAlign: 'left' }}>Place of issue:</td>
														<td style={{ textAlign: 'left' }}>Qualification:</td>

														<td
															style={{ textAlign: 'Center', fontFamily: 'Arial' }}
															colspan="2"
														>
															Profession:&emsp;
															<b>{data?.[0]?.passenger?.profession?.name}</b>
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
												<td style={{ textAlign: 'left' }}>{`${
													data?.[0]?.passenger?.police_station?.name || ''
												}, ${data?.[0]?.passenger?.target_country?.name || ''}`}</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;عنوان المنزل ورقم التلفون</td>
											</tr>

											<tr
												style={{
													borderBottom: '1px solid black',
													borderTop: '1px solid black'
												}}
											>
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Business address and telephone No.:&emsp;
																<b>{`${data?.[0]?.agency?.name || ''} RL No- ${
																	data?.[0]?.passenger?.agency?.rl_no || ''
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
												<td style={{ textAlign: 'Center', fontWeight: 'bold' }} colspan="3">
													<b>{data?.[0]?.agency?.address}</b>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
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
																{/*<asp:Label ID="Label5" runat="server" Text="عمل&nbsp;<br/>Work" BorderStyle="Solid" BorderWidth="1px" Width="100%"></asp:Label>*/}
																<br />
															</td>
															<td
																style={{
																	textAlign: 'left',
																	//textAlign: 'Center',
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
																	//textAlign: 'Center',
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
												<td colspan="3">
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
																	{data?.[0]?.passenger?.passport_issue_date &&
																		moment(
																			new Date(
																				data?.[0]?.passenger?.passport_issue_date
																			)
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
																	{data?.[0]?.passenger?.passport_expiry_date &&
																		moment(
																			new Date(
																				data?.[0]?.passenger?.passport_expiry_date
																			)
																		).format('DD-MM-YYYY')}
																</b>
															</td>
															<td style={{ textAlign: 'Center', fontSize: '8pt' }}>
																Passport No.:&emsp;رقم الجواز
																<br />
																<b style={{ fontSize: '10pt' }}>
																	{data?.[0]?.passenger?.passport_no}
																</b>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3"></td>
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
												<td colspan="3">
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
												<td colspan="3">
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
												<td style={{ textAlign: 'right' }} colspan="2">
													:&nbsp;إسم المحرم
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td style={{ textAlign: 'left' }}>Relationship:</td>
												<td style={{ textAlign: 'left' }} colspan="2">
													&nbsp;Name Of Mahram:
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																Destination:&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																:&nbsp;جهة الوصول بالمملكة&emsp;&emsp;Carrier's
																name:&nbsp;&emsp;&emsp;
															</td>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}></td>
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
												<td colspan="3">
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
															></td>
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
												<td colspan="3">
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
												<td colspan="3">
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
												<td colspan="3">
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
												<td colspan="3">
													<table width="100%">
														<tr>
															<td colspan="3" style={{ textAlign: 'left' }}>
																Date:
															</td>
															<td colspan="3" style={{ textAlign: 'right' }}>
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
												<td colspan="3">
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
													{data?.[0]?.visa_entry?.visa_issue_date &&
														moment(new Date(data?.[0]?.visa_entry?.visa_issue_date)).format(
															'DD-MM-YYYY'
														)}
												</td>
												<td style={{ textAlign: 'left' }}>
													:&nbsp;تاريخه&emsp;&emsp;Authorization:&emsp;&emsp;&emsp;
													<b>{data?.[0]?.visa_entry?.visa_number}</b>
												</td>
												<td style={{ textAlign: 'right' }}>
													:&nbsp;رقم الامر المعتمد عليه في إعطاء التأشيرة
												</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
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
																	{data?.[0]?.visa_entry?.sponsor_name_arabic}
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
													{data?.[0]?.visa_entry?.sponsor_id_no}
												</td>
												<td style={{ textAlign: 'right' }}>:&nbsp;أشر له برقم</td>
											</tr>
											<tr style={{ borderBottom: '1px solid black' }}>
												<td colspan="3">
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
												<td colspan="3">
													<table width="100%">
														<tr>
															<td style={{ textAlign: 'left', fontSize: '9.5pt' }}>
																&emsp;&emsp;القنصل العام
															</td>
															<td style={{ textAlign: 'Center', fontSize: '9.5pt' }}>
																&emsp;
																{/* <asp:Label ID="lblcarrier" Visible="true" Font-Bold="true" fontSize="12pt}}  runat="server"></asp:Label> */}
															</td>

															<td style={{ textAlign: 'right', fontSize: '9.5pt' }}>
																&nbsp;مـدقق البيانات
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colspan="3">
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
																{data?.[0]?.passenger?.passport_no && (
																	<Barcode
																		value={data?.[0]?.passenger?.passport_no}
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
															<td colspan="3" align="center">
																&emsp; &emsp;
																{/* <asp:Label ID="lblVisapassportno"   runat="server"></asp:Label> */}
															</td>
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

							<div style={{ display: 'block' }} className="print:mt-96">
								{/* <asp:GridView ID="GridView2" Visible="false" runat="server" DataKeyNames="copil_name,visa_no,visa_iss_date,passenger_name,passenger_pp_no,passenger_pp_exp_date,job_title,religion,destination,comment"></asp:GridView> */}
							</div>
							<div
								style={{
									backgroundImage: 'url(../Form/padairtrade1.jpg) !important',
									width: '100%',
									height: '1080px',
									backgroundRepeat: 'no-repeat'
								}}
							>
								<table width="100%">
									<tr>
										<td valign="top" align="center">
											<table width="93%">
												<tr>
													<td className="auto-style1" align="justify">
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
																<td valign="top" className="auto-style2">
																	1.
																</td>
																<td valign="top" align="left" className="auto-style3">
																	NAME OF THE EMPLOYER IN SAUDI ARABIA
																</td>
																<td
																	valign="top"
																	align="left"
																	className="auto-style3"
																	style={{ width: '55%' }}
																>
																	:&nbsp;&nbsp;
																	{data?.[0]?.visa_entry?.sponsor_name_arabic}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td align="left" className="auto-style3">
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
																	{data?.[0]?.visa_entry?.visa_number}
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE: &nbsp;
																	{data?.[0]?.visa_entry?.visa_issue_date &&
																		moment(
																			new Date(
																				data?.[0]?.visa_entry?.visa_issue_date
																			)
																		).format('DD-MM-YYYY')}
																	&nbsp;H
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td align="left" className="auto-style3">
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
																<td align="left" className="auto-style3">
																	FULL NAME OF THE EMPLOYEE
																</td>
																<td align="left" className="auto-style3">
																	:&nbsp;&nbsp;
																	{data?.[0]?.passenger?.passenger_name}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td align="left" className="auto-style3">
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
																	{data?.[0]?.passenger?.passport_no}
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DATE: &nbsp;
																	{data?.[0]?.passenger?.passport_expiry_date &&
																		moment(
																			new Date(
																				data?.[0]?.passenger?.passport_expiry_date
																			)
																		).format('DD-MM-YYYY')}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td align="left" className="auto-style3">
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
																	{data?.[0]?.passenger?.profession?.name}
																</td>
															</tr>
															<tr>
																<td className="auto-style2">&nbsp;</td>
																<td align="left" className="auto-style3">
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
																	{data?.[0]?.passenger?.religion}
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

							<table width="100%" className="print:mt-200">
								<tr>
									<td valign="top" align="center">
										<table width="95%">
											<tr>
												<td
													style={{
														fontWeight: 'bold',
														fontSize: 'large',
														textAlign: 'center'
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
												></td>
											</tr>
											<tr>
												<td align="left">
													<table width="95%">
														<tr>
															<td>NAME OF COMPANY: M/S</td>
															<td>
																:&nbsp;
																{data?.[0]?.visa_entry?.sponsor_name_arabic}
															</td>
														</tr>

														<tr>
															<td>HERE BY APPOINTED MR/MRS</td>
															<td>
																:&nbsp;
																{data?.[0]?.passenger?.passenger_name}
															</td>
														</tr>
														<tr>
															<td>HOLDER OF BANGLADESH PASSPORT NO</td>
															<td>
																:&nbsp;
																{data?.[0]?.passenger?.passport_no}
															</td>
														</tr>

														<tr>
															<td>
																AS A/AN &nbsp;&emsp;&emsp;
																{data?.[0]?.embassy?.profession_english}
																&nbsp;&nbsp;
															</td>
															<td></td>
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
															<td colspan="3">
																<u>UNDER THE FOLLOWING TERMS. AND CONDITIONS </u>
															</td>
														</tr>
														<tr>
															<td style={{ width: '5%' }}>1.</td>
															<td>
																MONTHLY SALARY
																{/*<asp:Label ID="lblVisaComment" runat="server"></asp:Label>*/}
																&nbsp;to the 2nd party as his monthly salary to serve
																him as a{data?.[0]?.embassy?.profession_english}
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

							{/* </asp:Panel> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default KsaVisaForm;
