/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import { GET_SITESETTINGS } from 'src/app/constant/constants';
import { getPassengers } from 'app/store/dataSlice';
import _ from 'lodash';
import { useGetPassengerAgreementQuery } from '../PassengerAgreementsApi';

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

function PassengerAgreementForm(props) {
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;
	const [generalData, setGeneralData] = useState({});
	const routeParams = useParams();
	const [passengerAgreementId, setPassengerAgreementId] = useState('');
	const classes = useStyles();

	const dispatch = useDispatch();

	const { data: passengerAgreement } = useGetPassengerAgreementQuery(passengerAgreementId, {
		skip: !passengerAgreementId
	});

	const passengers = useSelector((state) => state.data.passengers);

	// get general setting data
	useEffect(() => {
		const fetchGeneralData = async () => {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			try {
				const response = await fetch(GET_SITESETTINGS, authTOKEN);
				const data = await response.json();
				setGeneralData(data.general_settings[0] || {});
			} catch {
				setGeneralData({});
			}
		};

		fetchGeneralData();
	}, []);

	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

	const [showPrint, setShowPrint] = useState(false);

	useEffect(() => {
		if (_.isEmpty(passengerAgreement)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.passengerAgreementId !== 'passengerAgreement-form') {
			setValue('passenger', routeParams.passengerAgreementId);
		}
	}, [passengerAgreement, routeParams.passengerAgreementId, setValue]);

	// print dom ref
	const componentRef = useRef();

	// printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const passengerName = passengerAgreement?.passenger_name;
	const fathersName = passengerAgreement?.father_name;
	const passportNo = passengerAgreement?.passport_no;
	const village = passengerAgreement?.village;
	const contactNo = passengerAgreement?.contactNo;
	const postOffice = passengerAgreement?.postOffice;
	const policeStation = passengerAgreement?.policeStation?.name;
	const district = passengerAgreement?.district?.name;
	const Designations = passengerAgreement?.target_country?.name;

	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
	const yyyy = today.getFullYear();

	today = `${dd}/${mm}/${yyyy}`;

	const handleShowClick = () => {
		const value = watch('passenger');

		if (value) {
			setPassengerAgreementId(value);
		} else {
			setError('passenger', {
				type: 'manual',
				message: 'Please enter a valid ID or Passport Number'
			});
		}
	};
	return (
		<>
			<div>
				<Controller
					name="total_amount"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full"
								style={{ marginLeft: '15px', marginRight: '15px', width: '90%' }}
								label="Total Amount"
								id="name"
								required
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onClick={handleShowClick}
							/>
						);
					}}
				/>
				<Controller
					name="paid_amount"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full"
								style={{ marginLeft: '15px', marginRight: '15px', width: '90%' }}
								label="Paid Amount"
								id="name"
								required
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onBlur={(ev) => sessionStorage.setItem('paid_amount', field.value)}
							/>
						);
					}}
				/>
				<Controller
					name="passenger"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full"
							style={{ marginLeft: '15px', marginRight: '15px', width: '90%' }}
							freeSolo
							autoHighlight
							options={passengers}
							value={value ? passengers.find((data) => data.id === value) : null}
							getOptionLabel={(option) => ` ${option.passport_no} - ${option.passenger_name}`}
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

				<div>
					<button
						style={{
							background: 'white',
							border: '1px solid grey',
							borderRadius: '4px',
							padding: '0px 5px',
							height: '35px',
							marginLeft: '30px'
						}}
						// onClick={() => watch('passenger') && dispatch(getPassengerAgreement(watch('passenger')))}
						onClick={handleShowClick}
					>
						Show
					</button>
					{showPrint ? (
						<button
							style={{
								background: 'white',
								border: '1px solid grey',
								borderRadius: '4px',
								padding: '0px 5px',
								height: '35px',
								marginLeft: '30px'
							}}
							onClick={() => printAction()}
						>
							<Print />
						</button>
					) : (
						''
					)}
				</div>
			</div>
			{/* Printable Format  */}

			<div
				ref={componentRef}
				className={classes.container}
			>
				{showPrint && (
					<div
						className="row"
						style={{ marginTop: '50px', marginLeft: '90px', marginRight: '90px' }}
					>
						<div
							className="md:w-full"
							style={{ marginTop: '100px' }}
						>
							<h3 style={{ textAlign: 'center', lineHeight: '40px', fontSize: '20px' }}>
								{' '}
								“ অঙ্গীকার নামা ”{' '}
							</h3>
							<br />
							<br />

							<h3 style={{ lineHeight: '40px', fontSize: '20px', textAlign: 'justify' }}>
								আমি {passengerName} পিতা/স্বামী {fathersName} পাসপোর্ট নং {passportNo} গ্রামঃ {village}{' '}
								পোঃ {postOffice} থানাঃ {policeStation} জেলাঃ {district} । আমার মোবাইলঃ {contactNo} আমি
								অঙ্গীকার করিতেছি যে, আমি সম্পূর্ণ নিজের উদ্যোগে আত্মীয়/পরিচিত ব্যক্তি এর মাধ্যমে{' '}
								{Designations} হইতে রাজমিস্ত্রী কাজের ভিসাটি সংগ্রহ করিয়াছি । ছুক্তি মোতাবেক ভিসা টিকেট
								এবং এতদসংক্রান্ত অনুষাজ্ঞিক খরচাদি স্বরূপ আমি মোট{' '}
								{sessionStorage.getItem('total_amount')} টাকা প্রদান করি । বর্হীগমন ছাড়পত্র গ্রহনের জন্য
								আমি আমার মূল পাসপোর্ট ও ভিসা {generalData?.agency_name_bangla}
								লাইসেন্স নং- আর.এল {generalData?.rl_no}, এর অফিসে জমা করি । বহিগমন ছাড়পত্র সংগ্রহের জন্য
								আমি শুধু {sessionStorage.getItem('paid_amount')}
								টাকা {generalData?.agency_name_bangla} এর অফিসে জমা দিয়েছি । মেসার্স পলি ওয়ার্ল্ড
								সার্ভিস অফিস আমার কাছে {sessionStorage.getItem('paid_amount')} টাকার বেশি কোন টাকা দাবিও
								করে নাই এবং কোন অতিরিক্ত টাকা দেইও নাই । আমি অঙ্গীকার করিতেছি যে, মেসার্স পলি ওয়ার্ল্ড
								সার্ভিস আমার ভিসা সংগ্রহের ব্যাপারে কিছুই জানে না এবং উক্ত ভিসার ব্যাপারে মেসার্স পলি
								ওয়ার্ল্ড সার্ভিস এর কোন দায় দায়-দায়িত্ব নাই বলে অঙ্গীকার করিতেছি । কাতারস্ত কোম্পানির
								কাজের কর্মস্থলে যাবতীয় বিষয়অদিসহ বেতন-ভাতা, অবস্থান, থাকা-খাওয়া ও সামাজিক নিরাপত্তা
								সম্পর্কে আমি পুরপুরি অবগত আছি । আমার ভিসা এবং পাসপোর্টের কোন সমস্যার কারনে যদি আমি
								এয়ারপোর্ট থেকে ফেরত আসি তাহলে এস.বি অফিস থেকে সম্পূর্ণ নিজের খরচে মূল পাসপোর্ট তুলে আনব
								এবং {generalData?.agency_name_bangla} এর নামে যে, অভিযোগ ডায়েরি হবে তা প্রত্যাহার করার
								ব্যবস্থা করে দিবে । বিদেশে অবস্থান কালীন সময় আমার কোন প্রকার খারাফ অবস্থার সৃষ্টি হইলে
								এবং দেশে ফেরত আসতে হইলে তার জন্য আমি নিজেই দায়ী হইব,
							</h3>
						</div>
						<div
							className="md:w-full "
							style={{ marginTop: '-300px' }}
						>
							<div style={{ minHeight: '832px' }}> </div>
							<h3 style={{ lineHeight: '40px', fontSize: '20px', textAlign: 'justify' }}>
								কোন অবস্থাতেই {generalData?.agency_name_bangla} দায়ী হইবে না এবং{' '}
								{generalData?.agency_name_bangla}
								এর বিরুদ্ধে আমি বা আমার পরিবারের কেউ কোন প্রকার অভিযোগ বা মামলা করিবে না যদি করি তাহলে
								তাহা আইনের পরিপন্থী বলিয়া গণ্য করা হইবে এবং তাহা সর্বাবস্তায় বাতিল ও নামঞ্জুর হইবে ।
							</h3>
							<br />
							<br />
							<h3 style={{ lineHeight: '40px', fontSize: '20px', textAlign: 'justify' }}>
								উপরোক্ত অঙ্গীকার নামা আমি পড়িয়া বুঝিয়া আমার মা, বাবা/স্বামী/ বৈধ অভিভাবক এর পূর্ণ
								সম্মতিতে সম্পূর্ণ সুস্থ মস্তিষ্কে নিম্নোক্ত সাক্ষিগণের সম্মখে সহি সম্পাদন করিলাম । ইতি
								তাং {today} ইং
							</h3>{' '}
							<br />
							<h3>
								<table
									className="md:w-full"
									style={{ lineHeight: '40px', fontSize: '20px', width: '80%', minHeight: '300px' }}
								>
									<thead>
										<tr>
											<td>অভিভাবক/ সাক্ষীগণের স্বাক্ষর</td>
											<td>অঙ্গীকারকারীর স্বাক্ষর</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>১।</td>
											<td>নামঃ</td>
										</tr>
										<tr>
											<td>২।</td>
											<td>সাক্ষরঃ</td>
										</tr>

										<tr>
											<td>৩। </td>
											<td>টিপ্সহিঃ</td>
										</tr>
										<tr>
											<td>&nbsp; </td>
											<td>তারিখঃ</td>
										</tr>
									</tbody>
								</table>
							</h3>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default PassengerAgreementForm;
