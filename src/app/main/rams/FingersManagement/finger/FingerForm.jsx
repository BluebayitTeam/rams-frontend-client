/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import moment from 'moment';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetFingerQuery } from '../FingersApi';

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

function FingerForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;
	const [localData, setLocalData] = useState([]);

	const routeParams = useParams();
	const classes = useStyles(props);
	const [fingerId, setFingerId] = useState('');
	const [showPrint, setShowPrint] = useState(false);

	const { data, isSuccess } = useGetFingerQuery(fingerId, {
		skip: !fingerId
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

		if (routeParams.fingerId !== 'finger-form') {
			setValue('name', routeParams.fingerId);
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
				setFingerId(value);
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
			setFingerId(value);
		} else {
			setError('name', {
				type: 'manual',
				message: 'Please enter a valid ID or Passport Number'
			});
		}
	};

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
					className="row"
					style={{ marginLeft: '60px', marginRight: '60px' }}
				>
					<div className="md:w-full">
						<div>
							<table
								width="100%"
								cellpadding="1"
								cellspacing="1"
							>
								<tr>
									<td
										valign="middle"
										style={{ width: '20%', padding: 0 }}
									>
										<img
											src="assets/images/logos/departure.png"
											width="70"
											align="center"
											height="70"
											style={{ marginLeft: '45%', marginTop: '30px' }}
										/>
									</td>
								</tr>
								<tr valign="middle">
									<td
										valign="middle"
										style={{ width: '70%' }}
									>
										<center>
											<p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
											<p>জনশক্তি কর্মসংস্থান ও প্রশিক্ষন ব্যুরো</p>
											<b>
												<b>অনলাইন ডাটা ব্যাংকের রেজিস্ট্রেশনের আবেদন ফর্ম</b>
												<br />
												<span style={{ fontSize: 'large' }}>
													{' '}
													Online Data Bank Registration Application Form{' '}
												</span>
											</b>{' '}
											<br />
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
								<tr
									valign="middle"
									style={{ marginTop: '10px', marginBottom: '10px' }}
								>
									<td
										style={{ border: '1px solid black', padding: '2px' }}
										width="100%"
									>
										<small style={{ fontSize: '70%' }}>
											<center>
												আবেদনকারীর পাসপোর্টের প্রথম দুই (২) পৃষ্ঠার ফটোকপি আবেদন ফর্মের সাথে
												অবশ্যই জমা দিতে হবে। তারকা চিহ্নিত(+)তথ্যগুলো অবশ্যই পূরণীয় ।ফর্মটি পূরণ
												করার পূর্বে অনুগ্রহপূর্বক শেষ পৃষ্ঠায় বর্নিত নির্দেশনাসমূহ পড়ুন । <br />{' '}
												(A copy of the first two(2)page of applicant must be submitted with the
												application form.Information marked as start must be filled ,please read
												the instruction as the last page before filling the form)
											</center>
										</small>
									</td>
								</tr>
							</table>{' '}
							<br />
							<table width="100%">
								<tr>
									<td style={{ border: '1px solid black', padding: '2px' }}>
										<center> Applicant’s Personal Information ( আবেদনকারী ব্যক্তিগত তথ্য )</center>
									</td>
								</tr>
							</table>
							<table
								width="100%"
								cellspacing="1"
								cellpadding="4"
								style={{ marginRight: '50px' }}
							>
								<tr>
									<td>*Transaction ID (ট্রানজাকশান আইডি)</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									/>
								</tr>
								<tr>
									<td>*Applicant’s Name (আবেদনকারীর নাম )</td>
									<td colspan="3">
										<table width="100%">
											<tr>
												<td>{localData?.[0]?.passenger?.agent?.first_name}</td>
												<td>&nbsp;</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td align="center">( পাসপোর্ট অনুযায়ী )</td>
									<td colspan="3">
										<table width="100%">
											<tr>
												<td style={{ borderTop: '1px dashed' }}>
													প্রথম অংশ First Name(Given Name)
												</td>
												<td
													style={{
														borderTop: '1px dashed',
														paddingLeft: '10px',
														marginLeft: '30px'
													}}
												>
													দ্বিতীয় অংশ Last Name(Surename)
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td>*Father's Name (বাবার নাম)</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{localData?.[0]?.passenger?.father_name}
									</td>
								</tr>

								<tr>
									<td>*Mother's Name (মায়ের নাম)</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{localData?.[0]?.passenger?.mother_name}
									</td>
								</tr>
								<tr>
									<td>*Maritial Status ( বৈবাহিক অবস্থা )</td>
									<td colspan="3">
										<div style={{ display: 'flex' }}>
											<div style={{ display: 'flex' }}>
												<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
													{' '}
													<input
														type="checkbox"
														id="unmarried"
														name="maritial_status"
														value="unmarried"
													/>
												</div>
												<div>
													Unmarried <br /> (অবিবাহিত){' '}
												</div>
											</div>
											<div style={{ display: 'flex', paddingLeft: '15px' }}>
												<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
													{' '}
													<input
														type="checkbox"
														id="married"
														name="maritial_status"
														value="married"
														//   checked={isChecked}
													/>
												</div>
												<div>
													Married <br /> (বিবাহিত){' '}
												</div>
											</div>
											<div style={{ display: 'flex', paddingLeft: '15px' }}>
												<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
													{' '}
													<input
														type="checkbox"
														id="widow"
														name="maritial_status"
														value="widow"
														//   checked={isChecked}
													/>
												</div>
												<div>
													Widower/Widow <br /> (বিপত্নীক/বিধবা ){' '}
												</div>
											</div>
											<div style={{ display: 'flex', paddingLeft: '15px' }}>
												<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
													{' '}
													<input
														type="checkbox"
														id="divorced"
														name="maritial_status"
														value="divorced"
														//   checked={isChecked}
													/>
												</div>
												<div>
													Divorced <br /> (তালাকপ্রাপ্ত ){' '}
												</div>
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<td>&nbsp;Spouse's Name ( স্বামী/স্ত্রী নাম )</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{localData?.[0]?.passenger?.spouse_name}
									</td>
								</tr>

								<tr>
									<td>*Date of Birth ( জন্ম তারিখ )</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.date_of_birth
											? moment(new Date(localData?.[0]?.passenger?.date_of_birth)).format(
													'DD-MM-YYYY'
												)
											: 'DD-MM-YYYY '}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Birth District ( যে জেলায় জন্ম)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.place_of_birth
											? localData?.[0]?.passenger?.place_of_birth
											: ' '}
									</td>
								</tr>
								<tr>
									<td>*Nationality ( জন্ম তারিখ )</td>
									<td style={{ borderBottom: '1px dashed' }}>BANGLADESHI</td>
									<td style={{ paddingLeft: '150px' }}>*Birth Country ( যে দেশে জন্ম )</td>
									<td style={{ borderBottom: '1px dashed' }}>BANGLADESH</td>
								</tr>

								<tr>
									<td>*Gender ( লিঙ্গ)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.gender ? localData?.[0]?.passenger?.gender : ' '}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Religion ( ধর্ম)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.religion
											? localData?.[0]?.passenger?.religion
											: ' '}
									</td>
								</tr>
								<tr>
									<td>&nbsp;National ID (নাগরিকত্বের সনদ )</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{localData?.[0]?.passenger?.nid}
									</td>
								</tr>

								<tr>
									<td>&nbsp;Birth Reg. ID (জন্ম সনদ)</td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{localData?.[0]?.passenger?.birth_reg_number}
									</td>
								</tr>

								<tr>
									<td>*Passport's place of Issue ( পাসপোর্ট ইস্যুর স্থান)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.passport_issue_place}
									</td>
									<td>&nbsp;Blood Group (রক্তের গ্রুপ)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.blood_group}
									</td>
								</tr>

								<tr>
									<td>*Passport's Issue Date ( পাসপোর্ট ইস্যুর তারিখ)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.passport_issue_date
											? moment(new Date(localData?.[0]?.passenger?.passport_issue_date)).format(
													'DD-MM-YYYY'
												)
											: 'DD-MM-YYYY '}
									</td>
									<td>*Passport Expiry Date ( পাসপোর্টের মেয়াদোওির্ণের তারিখ )</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{' '}
										{localData?.[0]?.passenger?.passport_expiry_date
											? moment(new Date(localData?.[0]?.passenger?.passport_expiry_date)).format(
													'DD-MM-YYYY'
												)
											: 'DD-MM-YYYY '}
									</td>
								</tr>

								<tr>
									<td colspan="4">
										<table width="100%">
											<tr>
												<td style={{ border: '1px solid black', padding: '2px' }}>
													<center>
														{' '}
														Applicant’s Contact Information ( আবেদনকারী যোগাযোগের তথ্য )
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="4">Permanent Address(স্থায়ী ঠিকানা)</td>
								</tr>

								<tr>
									<td>*Division ( বিভাগ)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*District (জেলা)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>*Upazila/Thana (উপজেলা/থানা) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.police_station?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Union/Word( ইউনিয়ন/ওয়ার্ড ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.police_station?.name}
									</td>
								</tr>

								<tr>
									<td>*Mauza/Moholla (মৌজা/মহল্লা ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Village( গ্রাম ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>&nbsp;Poast Office (ডাকঘর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.post_office}
									</td>
									<td style={{ paddingLeft: '150px' }}>&nbsp; Post Code( পোস্ট কোড ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>&nbsp;Road Number (সড়ক নগর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>&nbsp;House Number( বাড়ী নম্বর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>*Mobile Number (মোবাইল নম্বর) </td>
									<td
										style={{ borderBottom: '1px dashed' }}
										colspan="3"
									>
										{localData?.[0]?.passenger?.contact_no}
									</td>
								</tr>

								<tr>
									<td colspan="4">
										<div style={{ display: 'flex', paddingLeft: '15px' }}>
											<div style={{ paddingTop: '15px', paddingRight: '15px' }}>
												{' '}
												<input
													type="checkbox"
													id="same"
													name="same"
													value="same"
													//   checked={isChecked}
												/>
											</div>
											<div>
												Put tick (🗸) if Permanent Address is same as the Mailing Address
												<br />( স্থায়ী ঠিকানা ও যোগাযোগের ঠিকানা একই হলে (🗸) চিহ্ন দিন )
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<td colspan="4">Mailing Address(যোগাযোগের ঠিকানা)</td>
								</tr>

								<tr>
									<td>*Division ( বিভাগ)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*District (জেলা)</td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>*Upazila/Thana (উপজেলা/থানা) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.police_station?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Union/Word( ইউনিয়ন/ওয়ার্ড ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.police_station?.name}
									</td>
								</tr>

								<tr>
									<td>*Mauza/Moholla (মৌজা/মহল্লা ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>*Village( গ্রাম ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>&nbsp;Poast Office (ডাকঘর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.post_office}
									</td>
									<td style={{ paddingLeft: '150px' }}>&nbsp; Post Code( পোস্ট কোড ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>&nbsp;Road Number (সড়ক নগর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
									<td style={{ paddingLeft: '150px' }}>&nbsp;House Number( বাড়ী নম্বর ) </td>
									<td style={{ borderBottom: '1px dashed' }}>
										{localData?.[0]?.passenger?.district?.name}
									</td>
								</tr>

								<tr>
									<td>*Mobile Number (মোবাইল নম্বর) </td>
									<td
										style={{ borderBottom: '1px dashed' }}
										colspan="3"
									>
										{localData?.[0]?.passenger?.contact_no}
									</td>
								</tr>

								<tr>
									<td colspan="4">
										<table width="100%">
											<tr>
												<td style={{ border: '1px solid black', padding: '2px' }}>
													<center>
														*Job Preference ( চাকরীর অগ্রাধিকার ) <br /> ( আপনি যে চাকরীগুলো
														করতে আগ্রহী সেগুলোর নাম উল্লেক করুন । যে কোনো একজন আবেদনকারী
														সর্বোচ্চ ৩টি পেশা উল্লেখ করতে পারবেন ।)
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td
										colspan="4"
										width="100%"
									>
										<table>
											<tr>
												<center>
													<td>
														1...........................................................................................................
													</td>
													<td>
														2...........................................................................................................
													</td>
													<td>
														3...........................................................................................................
													</td>
												</center>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="4">
										<table
											width="100%"
											cellspacing="0"
										>
											<tr>
												<td style={{ border: '1px solid black', padding: '2px' }}>
													<center>
														Academic Qualification and Language Skills ( শিক্ষাগত যোগ্যতা ও
														ভাষাগত দক্ষতা )
													</center>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>Educational Qualification( শিক্ষাগত যোগ্যতা উল্লখ করুন ) </td>
									<td
										colspan="3"
										style={{ borderBottom: '1px dashed' }}
									>
										{' '}
									</td>
								</tr>

								<tr>
									<td colspan="4">
										<table>
											<tr>
												<td>
													Name of the Institute last attended( যে প্রতিষ্ঠান থেকে পাশ করছেন
													তার নাম উল্লেখ করুন )
												</td>
												<td style={{ borderBottom: '1px dashed' }} />
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<td>Board/University ( বোর্ড/বিশ্ববিদ্যালয়) </td>
									<td style={{ borderBottom: '1px dashed' }} />
									<td style={{ paddingLeft: '120px' }}>Year of Passing ( পাসের সন )</td>
									<td style={{ borderBottom: '1px dashed' }}> </td>
								</tr>

								<tr>
									<td> Subject/Group( বিষয়/বিভাগ )</td>
									<td style={{ borderBottom: '1px dashed' }} />
									<td style={{ paddingLeft: '120px' }}>Grade/Division ( গ্রেড/ডিভিশন )</td>
									<td style={{ borderBottom: '1px dashed' }}> </td>
								</tr>

								<tr>
									<td colspan="4">
										<table
											width="100%"
											cellspacing="0"
											style={{ border: '1px solid', marginTop: '15px' }}
										>
											<tr>
												<td>&nbsp;</td>
												<td
													style={{
														borderLeft: '1px solid',
														borderRight: '1px solid'
													}}
												>
													<center>
														Name of the Language <br /> (ভাষার নাম){' '}
													</center>{' '}
												</td>
												<td colspan="4">
													<center>
														Language Skill(ভাষাগত দক্ষতা) <br /> Put (🗸) in Appropiate Box(🗸
														চিহ্ন দিন)
													</center>
												</td>
											</tr>

											<tr style={{ border: '1px solid' }}>
												<td>1.</td>
												<td style={{ borderLeft: '1px solid', borderRight: '1px solid' }}>
													&nbsp;
												</td>
												<td colspan="4">
													<table width="100%">
														<tr style={{ borderBottom: '1px solid' }}>
															<td>Oral Skill (মৌখিক দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
														<tr>
															<td>Writing Skill (লেখার দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
													</table>
												</td>
											</tr>

											<tr>
												<td>2.</td>
												<td style={{ borderLeft: '1px solid', borderRight: '1px solid' }}>
													&nbsp;
												</td>
												<td colspan="4">
													<table width="100%">
														<tr style={{ borderBottom: '1px solid' }}>
															<td>Oral Skill (মৌখিক দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
														<tr>
															<td>Writing Skill (লেখার দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
													</table>
												</td>
											</tr>

											<tr style={{ border: '1px solid' }}>
												<td>3.</td>
												<td style={{ borderLeft: '1px solid', borderRight: '1px solid' }}>
													&nbsp;
												</td>
												<td colspan="4">
													<table width="100%">
														<tr style={{ borderBottom: '1px solid' }}>
															<td>Oral Skill (মৌখিক দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
														<tr>
															<td>Writing Skill (লেখার দক্ষতা ) </td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Basic( প্রাথমিক )
															</td>
															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Good( ভালো )
															</td>

															<td
																style={{
																	paddingTop: '15px',
																	paddingRight: '15px',
																	marginLeft: '10px'
																}}
															>
																<input
																	type="checkbox"
																	id="same"
																	name="same"
																	value="same"
																	style={{ marginRight: '8px' }}
																	//   checked={isChecked} s
																/>
																Excellent( অতি ভালো )
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
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

export default FingerForm;
