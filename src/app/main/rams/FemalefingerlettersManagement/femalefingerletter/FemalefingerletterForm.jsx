/* eslint-disable react/button-has-type */
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
import moment from 'moment';
import { useGetFemalefingerletterQuery } from '../FemalefingerlettersApi';

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

function FemalefingerletterForm(props) {
	const methods = useFormContext();
	const { watch } = methods;
	const [generalData, setGeneralData] = useState({});
	const routeParams = useParams();
	const [femalefingerletterId, setFemalefingerletterId] = useState('');
	const [showPrint, setShowPrint] = useState(false);
	const [formData, setFormData] = useState({
		passenger: '',
		center_name: '',
		district: ''
	});

	const classes = useStyles();
	const dispatch = useDispatch();

	const { data: femalefingerletter } = useGetFemalefingerletterQuery(femalefingerletterId, {
		skip: !femalefingerletterId
	});
	const Comment = '';

	const AllPassengers = useSelector((state) => state.data.passengers);
	const passengers = AllPassengers.filter((data) => data?.gender === 'female' || data?.gender === 'Female');

	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}));
	}, []);

	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

	useEffect(() => {
		if (_.isEmpty(femalefingerletter)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.femalefingerletterId !== 'femalefingerletter-form') {
			setFemalefingerletterId(routeParams.femalefingerletterId);
		}
	}, [femalefingerletter, routeParams.femalefingerletterId]);

	const componentRef = useRef();

	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const today = moment().format('DD/MM/YYYY');

	const centerName = formData.center_name;
	const { district } = formData;

	const handleShowClick = () => {
		const value = watch('passenger');

		if (value) {
			setFemalefingerletterId(value);
			setFormData({
				passenger: value,
				center_name: watch('center_name'),
				district: watch('district')
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
									বিষয় : {femalefingerletter?.target_country?.name || ''} গমনেচ্ছুক কোর্সে ভর্তি
									প্রসঙ্গে ।
									<br />
									<br />
									জনাব,
									<br />
									যথাবিহীত সম্মানপূর্বক নিবেদন এইযে , {generalData?.agency_name_bangla} (আর,এল নং-{' '}
									{generalData?.rl_no}) হতে {femalefingerletter?.target_country?.name || ''} গমনেচ্ছুক
									নিম্নে বর্ণিত যাত্রীর ৩ দিন মেয়াদী প্রশিক্ষনের জন্য আপনার নিকট প্রেরণ করিলাম ।
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
											<td style={{ border: '1px solid black' }}>
												{femalefingerletter?.passenger_name || ''}{' '}
											</td>
											<td style={{ border: '1px solid black' }}>
												{femalefingerletter?.father_name || ''}{' '}
											</td>
											<td style={{ border: '1px solid black' }}>
												{femalefingerletter?.passport_no || ''}
											</td>
											<td style={{ border: '1px solid black' }}>
												{femalefingerletter?.target_country?.name || ''}
											</td>
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

export default FemalefingerletterForm;
