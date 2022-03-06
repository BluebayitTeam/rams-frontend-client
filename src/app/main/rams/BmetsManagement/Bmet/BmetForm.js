import { makeStyles, TextField } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getBmet } from '../store/bmetSlice';

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

function BmetForm() {
	const methods = useFormContext();
	const { control, watch } = methods;

	const classes = useStyles();

	const dispatch = useDispatch();

	const bmet = useSelector(({ bmetsManagement }) => bmetsManagement.bmet);

	const [showPrint, setShowPrint] = useState(false);
	useEffect(() => {
		_.isEmpty(bmet) ? setShowPrint(false) : setShowPrint(true);
	}, [bmet]);

	//print dom ref
	const componentRef = useRef();

	//printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	console.log('bmet', bmet);

	return (
		<>
			<div className="flex justify-evenly items-center flex-wrap mt-5">
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
								variant="outlined"
								fullWidth
								className={classes.textField}
								onKeyDown={ev => {
									if (ev.key === 'Enter') {
										ev.target.value && dispatch(getBmet(ev.target.value));
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
						onClick={() => watch('name') && dispatch(getBmet(watch('name')))}
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
			<div ref={componentRef} className={classes.container}>
				<div className="row">
					<div className="md:w-full">
						<div>
							<table width="100%" cellpadding="7" cellspacing="1">
								<tr valign="middle">
									<td valign="middle" style={{ width: '15%', padding: 0 }}>
										<img
											src="assets/images/logos/bmetLogo.png"
											align="LEFT"
											width="70"
											height="70"
										/>
									</td>
									<td valign="middle" style={{ width: '70%' }}>
										<center>
											<b>
												{' '}
												<span style={{ fontSize: 'large' }}>
													{' '}
													Government People’s Republic of Bangladesh
												</span>
											</b>{' '}
											<br />
											<b>Bureau of Manpower, Employment and Training (BMET)</b>
										</center>
									</td>

									<td valign="middle" style={{ width: '15%' }}>
										{' '}
										&nbsp;
									</td>
								</tr>

								<tr valign="middle">
									<td
										colspan="3"
										width="698"
										height="2"
										style={{
											borderTop: '1.50pt double #000000',
											borderBottom: 'none',
											borderLeft: 'none',
											borderRight: 'none',
											padding: '0in'
										}}
									>
										<p className="western" align="CENTER">
											<span face="Calibri-Bold, sans-serif">
												<span size="2">
													<b>Individual Clearance Application Form</b>
												</span>
											</span>
										</p>
									</td>
								</tr>
							</table>
							<table width="100%" cellpadding="7" cellspacing="1">
								<tr valign="middle">
									<td colspan="3" width="130" height="1" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													<b>Serial Number:</b>
												</span>
											</span>
										</p>
									</td>
									<td
										width="8"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="10"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="10"
										style={{
											borderTop: 'none',
											borderBottom: 'none',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="8"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="8"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="10"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="10"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="9"
										style={{
											borderTop: 'none',
											borderBottom: 'none',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="9"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="14"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="15"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="14"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="13"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="13"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										width="13"
										style={{
											borderTop: '1px solid #000000',
											borderBottom: '1px solid #000000',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<br />
										</p>
									</td>
									<td
										colspan="2"
										width="73"
										style={{
											borderTop: 'none',
											borderBottom: 'none',
											borderLeft: '1px solid #000000',
											borderRight: 'none',
											paddingTop: '0in',
											paddingBottom: '0in',
											paddingLeft: '0.08in',
											paddingRight: '0in'
										}}
									>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												Date :
											</span>
										</p>
									</td>
									<td colspan="2" width="81" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
							</table>
							<table width="100%" cellpadding="7" cellspacing="1">
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span color="#000000">
												<span face="Calibri-Bold, sans-serif">
													<span size="2" style={{ fontSize: '9pt' }}>
														<b>A. Visa Information </b>
													</span>
												</span>
											</span>
										</p>
									</td>
								</tr>
								<tr>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '11pt' }}>
													1. Block visa No.:&nbsp; &nbsp; {bmet?.[0]?.visa_entry?.visa_number}
												</span>
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '11pt' }}>
													2. Visa issue Date : &nbsp; &nbsp;{' '}
													{bmet?.[0]?.visa_entry?.visa_issue_date &&
														moment(new Date(bmet?.[0]?.visa_entry?.visa_issue_date)).format(
															'DD-MM-YYYY'
														)}
												</span>
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													3. Visa issuing country :&nbsp; &nbsp;{' '}
													{bmet?.[0]?.visa_entry?.country?.name}
												</span>
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													4. Total visa count: &nbsp; &nbsp;01
												</span>
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													5. RL no.:
												</span>
											</span>
											&nbsp; &nbsp;
											<span style={{ fontSize: '12pt' }}>
												<b>{bmet?.[0]?.visa_entry?.visa_number}</b>
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													6. RA name:
												</span>
											</span>
											&nbsp; &nbsp;
											<span style={{ fontSize: '12pt' }}>
												<b> {bmet?.[0]?.agency?.name} </b>
											</span>
										</p>
									</td>
								</tr>
							</table>
							<table width="100%" cellpadding="7" cellspacing="1">
								<tr valign="middle">
									<td colspan="2" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													<b>B. Employer /Company/ foreign recruiting agent Information</b>
												</span>
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td colspan="2" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span color="#000000">
												<span face="Calibri, sans-serif">
													<span size="2" style={{ fontSize: '9pt' }}>
														7. Employer is a company or recruiting agent (foreign):{' '}
													</span>
												</span>
											</span>
											<span color="#000000">
												<span face="Calibri-Bold, sans-serif">
													<span size="2" style={{ fontSize: '9pt' }}>
														Yes/NO &nbsp; &nbsp; {bmet?.[0]?.agency?.sponsor_name_english}
													</span>
												</span>
											</span>
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td colspan="2" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span color="#000000">
												<span face="Calibri, sans-serif">
													<span size="2" style={{ fontSize: '9pt' }}>
														8. Employer/ company/recruiting agent (foreign) Name :{' '}
													</span>
												</span>
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td colspan="2" style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													9a) Street address: &nbsp; &nbsp;{' '}
													{/* <asp:Label ID="dest2" runat="server"></asp:Label> */}
												</span>
											</span>
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												b) City/town
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												c) Phone:
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												d) Zip code :
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												e) Fax Number:
											</span>
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												f) E-mail :
											</span>
										</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												g) Website:
											</span>
										</p>
									</td>
								</tr>
							</table>

							<div style={{ textAlign: 'left' }}>
								<span face="Calibri-Bold, sans-serif">
									<span size="2" style={{ fontSize: '9pt' }}>
										<b>C. Job information</b>
									</span>
								</span>
							</div>

							<table
								className="borderedTable"
								border="1"
								cellspacing="0"
								style={{ borderColor: 'beige' }}
								cellpadding="0"
							>
								<tr>
									<td width="130" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													<b>Item</b>
												</span>
											</span>
										</p>
									</td>
									<td width="186" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b>Job/post category # 1</b>
												</span>
											</span>
										</p>
									</td>
									<td width="175" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b>Job/post category # 2</b>
												</span>
											</span>
										</p>
									</td>
									<td width="162" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b>Job/post category # 3</b>
												</span>
											</span>
										</p>
									</td>
								</tr>

								<tr>
									<td width="130" height="1" valign="middle">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Name of Job/post
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												&nbsp; &nbsp;{bmet?.[0]?.embassy?.profession_english}{' '}
											</span>
										</p>
									</td>
									<td width="175" valign="middle">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162" valign="middle">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '7pt' }}>
													Monthly wages/salary
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												&nbsp;&nbsp; {bmet?.[0]?.embassy?.salary}{' '}
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span color="#000000">
												<span face="Calibri, sans-serif">
													<span size="1" style={{ fontSize: '8pt' }}>
														Food (Put √){' '}
													</span>
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													&nbsp;YES/NO
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Housing (Put √){' '}
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													&nbsp;YES/NO
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Medical (Put √){' '}
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													&nbsp;YES/NO
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Air fare (Put √){' '}
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													&nbsp;YES/NO
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Over time (Put √){' '}
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													&nbsp;YES/NO
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Contact duration (yr)
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												&nbsp;2yrs
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Others
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Remarks
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
							</table>

							<div style={{ textAlign: 'left', marginBottom: '5px' }}>
								<span face="Calibri-Bold, sans-serif">
									<span size="2" style={{ fontSize: '9pt' }}>
										<b>D. Employee Information</b>
									</span>
								</span>
							</div>

							<table
								className="borderedTable"
								border="1"
								style={{ borderColor: 'beige' }}
								cellspacing="0"
								cellpadding="0"
							>
								<tr valign="middle">
									<td width="130" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="2" style={{ fontSize: '9pt' }}>
													<b>Item</b>
												</span>
											</span>
										</p>
									</td>
									<td width="186" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b>Item Employee # 1</b>
												</span>
											</span>
										</p>
									</td>
									<td width="175" align="center">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b>Item Employee # 2</b>
												</span>
											</span>
										</p>
									</td>
									<td width="162">
										<p className="western">
											<span face="Calibri-Bold, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<b></b>
												</span>
											</span>
										</p>
									</td>
								</tr>

								<tr>
									<td width="130" height="1" valign="middle">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Registration ID
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												{' '}
												&nbsp; &nbsp;{bmet?.[0]?.man_power?.new_visa_no}
											</span>
										</p>
									</td>
									<td width="175" valign="middle">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162" valign="middle">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '7pt' }}>
													Visa number
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '9pt' }}>
												<p style={{ fontSize: '11pt' }}>
													&nbsp;{bmet?.[0]?.visa_entry?.visa_number}
												</p>{' '}
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span color="#000000">
												<span face="Calibri, sans-serif">
													<span size="1" style={{ fontSize: '8pt' }}>
														Visa issue date{' '}
													</span>
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<p style={{ fontSize: '11pt' }}>
														&nbsp;
														{bmet?.[0]?.embassy?.stamping_date &&
															moment(new Date(bmet?.[0]?.embassy?.stamping_date)).format(
																'DD-MM-YYYY'
															)}
													</p>{' '}
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Visa expiry date
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													<p style={{ fontSize: '11pt' }}>
														&nbsp;
														{bmet?.[0]?.embassy?.visa_expiry_date &&
															moment(
																new Date(bmet?.[0]?.embassy?.visa_expiry_date)
															).format('DD-MM-YYYY')}
													</p>
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Visa issue country
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '11pt' }}>
													&nbsp;BANGLADESH
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Visa issue place
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '11pt' }}>
													&nbsp;DHAKA
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Type of visa
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '10pt' }}>
													&nbsp;EMPLOYMENT
												</span>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Passport type
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="2" style={{ fontSize: '10pt' }}>
												&nbsp;INTERNATIONAL
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Job (post) name
												</span>
											</span>
										</p>
									</td>
									<td valign="middle" width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '8pt' }}>
												&nbsp; as like as visa/visa copy{' '}
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Purpose of visit
												</span>
											</span>
										</p>
									</td>
									<td valign="middle" width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '8pt' }}>
												&nbsp; Job/Employ
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Passport number
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<p style={{ fontSize: '11pt' }}>
												&nbsp;{bmet?.[0]?.passenger?.passport_no}
											</p>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Passport issue date
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '8pt' }}>
												<p style={{ fontSize: '11pt' }}>
													&nbsp;
													{bmet?.[0]?.passenger?.passport_issue_date &&
														moment(
															new Date(bmet?.[0]?.passenger?.passport_issue_date)
														).format('DD-MM-YYYY')}
												</p>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Passport expiry date
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '8pt' }}>
												<p style={{ fontSize: '11pt' }}>
													&nbsp;
													{bmet?.[0]?.passenger?.passport_expiry_date &&
														moment(
															new Date(bmet?.[0]?.passenger?.passport_expiry_date)
														).format('DD-MM-YYYY')}
												</p>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Birth date in passport
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '8pt' }}>
												<p style={{ fontSize: '11pt' }}>
													&nbsp;
													{bmet?.[0]?.passenger?.date_of_birth &&
														moment(new Date(bmet?.[0]?.passenger?.date_of_birth)).format(
															'DD-MM-YYYY'
														)}
												</p>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Passport issue place
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">
											<span size="1" style={{ fontSize: '9pt' }}>
												<p style={{ fontSize: '11pt' }}>
													&nbsp;{bmet?.[0]?.passenger?.passport_issue_place}
												</p>
											</span>
										</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>

								<tr valign="middle">
									<td width="130" height="1">
										<p className="western">
											<span face="Calibri, sans-serif">
												<span size="1" style={{ fontSize: '8pt' }}>
													Profession in passport
												</span>
											</span>
										</p>
									</td>
									<td width="186">
										<p className="western">&nbsp; Private Service</p>
									</td>
									<td width="175">
										<p className="western">
											<br />
										</p>
									</td>
									<td width="162">
										<p className="western">
											<br />
										</p>
									</td>
								</tr>
							</table>
							<table border="0" cellspacing="0" width="100%" cellpadding="0">
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">&nbsp;</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">&nbsp;</p>
									</td>
								</tr>
								<tr valign="middle">
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">&nbsp;</p>
									</td>
									<td style={{ border: 'none', padding: '0in' }}>
										<p className="western">&nbsp;</p>
									</td>
								</tr>
								<tr valign="middle">
									<td align="left">
										<p className="western">-------------------------------------</p>
									</td>
									<td align="right">
										<p className="western">--------------------------------</p>
									</td>
								</tr>

								<tr valign="middle">
									<td align="left" style={{ fontSize: '9pt' }}>
										&nbsp; &nbsp; &nbsp; &nbsp;Signature of the recipient Officer
									</td>

									<td align="right" style={{ fontSize: '9pt' }}>
										Applicant’s Signature &nbsp; &nbsp; &nbsp; &nbsp;
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

export default BmetForm;
