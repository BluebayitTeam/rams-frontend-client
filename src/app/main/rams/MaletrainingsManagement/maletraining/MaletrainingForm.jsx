/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import { GET_SITESETTINGS } from 'src/app/constant/constants';
import { getPassengers } from 'app/store/dataSlice';
import _ from 'lodash';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';
import { useGetMaletrainingQuery } from '../MaletrainingsApi';

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
				background: 'white',
				borderSpacing: 0,
				borderCollapse: 'collapse',
				'& td, th': {
					padding: '0px'
				}
			}
		}
	}
}));

function MaletrainingForm(props) {
	const methods = useFormContext();
	const { control, watch, setValue, setError, getValues, reset } = methods;
	const [generalData, setGeneralData] = useState({});
	const routeParams = useParams();
	const [maletrainingId, setMaletrainingId] = useState('');
	const classes = useStyles();

	const dispatch = useDispatch();

	const { data: maletraining } = useGetMaletrainingQuery(maletrainingId, {
		skip: !maletrainingId
	});

	const passengers = useSelector((state) => state.data.passengers);

	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}));
	}, []);

	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

	const [showPrint, setShowPrint] = useState(false);

	useEffect(() => {
		if (_.isEmpty(maletraining)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.maletrainingId !== 'maletraining-form') {
			setValue('passenger', routeParams.maletrainingId);
		}
	}, [maletraining, routeParams.maletrainingId, setValue]);

	const componentRef = useRef();

	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const passengerName = maletraining?.passenger_name || '';
	const fathersName = maletraining?.father_name || '';
	const passportNo = maletraining?.passport_no || '';
	const Designations = maletraining?.target_country?.name || '';
	const Comment = '';

	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	today = `${dd}/${mm}/${yyyy}`;

	const centerName = watch('center_name');
	const district = watch('district');

	const handleShowClick = () => {
		const value = watch('passenger');

		if (value) {
			setMaletrainingId(value);
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
				<CustomDropdownField
					name="passenger"
					label="Passenger"
					options={passengers}
					optionLabelFormat={(option) => `${option.passport_no} - ${option.passenger_name}`}
					required
				/>

				<CustomTextField
					name="center_name"
					label="Center Name"
					required
				/>
				<CustomTextField
					name="district"
					label="District"
					required
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

			{/* Printable Format */}

			<div
				ref={componentRef}
				className={classes.container}
			>
				{showPrint && (
					<div
						className="row"
						style={{
							marginTop: '100px',
							marginLeft: '90px',
							marginRight: '90px',
							fontSize: '16px',
							textAlign: 'justify'
						}}
					>
						<div className="md:w-full">
							<div>
								<div style={{ minHeight: '100px' }} />
								<h3 style={{ textAlign: 'center' }}>তারিখ : {today}</h3>
								<p>
									অধ্যক্ষ,
									<br />
									{centerName}
									<br />
									{district}
									<br />
									<br />
									বিষয় : {Designations} গমনেচ্ছুক কোর্সে ভর্তি প্রসঙ্গে ।
									<br />
									<br />
									জনাব,
									<br />
									যথাবিহীত সম্মানপূর্বক নিবেদন এইযে , {generalData?.agency_name_bangla} (আর,এল নং-{' '}
									{generalData?.rl_no}) হতে {Designations} গমনেচ্ছুক নিম্নে বর্ণিত যাত্রীর ৩ দিন
									মেয়াদী প্রশিক্ষনের জন্য আপনার নিকট প্রেরণ করিলাম ।
									<br />
									<br />
								</p>
								<table
									width="80%"
									style={{
										border: '1px solid black',
										borderCollapse: 'collapse',
										textAlign: 'center',
										marginLeft: 'auto',
										marginRight: 'auto'
									}}
								>
									<thead>
										<tr>
											<th style={{ border: '1px solid black' }}>নং</th>
											<th style={{ border: '1px solid black' }}>যাত্রীর নাম </th>
											<th style={{ border: '1px solid black' }}>পিতা /স্বামী নাম </th>
											<th style={{ border: '1px solid black' }}>পাসর্পোট নং</th>
											<th style={{ border: '1px solid black' }}>গন্তব্য দেশ</th>
											<th style={{ border: '1px solid black' }}>মন্তব্য</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={{ border: '1px solid black' }}>01</td>
											<td style={{ border: '1px solid black' }}>{passengerName} </td>
											<td style={{ border: '1px solid black' }}>{fathersName} </td>
											<td style={{ border: '1px solid black' }}>{passportNo}</td>
											<td style={{ border: '1px solid black' }}>{Designations}</td>
											<td style={{ border: '1px solid black' }}>{Comment}</td>
										</tr>
									</tbody>
								</table>
								<br />
								<p>
									অতএব জনাবের সমীপে আবেদন , আমার প্রেরিত উপরোক্ত কর্মীর যাচাই বাচাই পূর্বক কোর্সে
									ভর্তি সুযোগ দিতে আপনার সু -মর্জি হয় ।
								</p>
								<br />
								<br />
								<br />
								<p style={{ textAlign: 'center' }}>{generalData?.site_owner_name_bangla}</p>
								<p style={{ textAlign: 'center' }}>{generalData?.site_owner_designation_bangla}</p>
								<p style={{ textAlign: 'center' }}>{generalData?.site_owner_company_bangla}</p>
								<p style={{ textAlign: 'center' }}>{generalData?.site_owner_company_rl_no_bangla}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default MaletrainingForm;
