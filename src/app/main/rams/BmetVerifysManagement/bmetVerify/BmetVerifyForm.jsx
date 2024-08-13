/* eslint-disable jsx-a11y/control-has-associated-label */
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
import moment from 'moment';
import { useGetBmetVerifyQuery } from '../BmetVerifysApi';

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

function BmetVerifyForm(props) {
	const methods = useFormContext();
	const { watch } = methods;
	const [generalData, setGeneralData] = useState({});
	const routeParams = useParams();
	const [bmetVerifyId, setBmetVerifyId] = useState('');
	const [showPrint, setShowPrint] = useState(false);
	const Comment = '';
	const [formData, setFormData] = useState({
		passenger: ''
	});

	const classes = useStyles();
	const dispatch = useDispatch();

	const { data: bmetVerify } = useGetBmetVerifyQuery(bmetVerifyId, {
		skip: !bmetVerifyId
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

	useEffect(() => {
		if (_.isEmpty(bmetVerify)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.bmetVerifyId !== 'bmetVerify-form') {
			setBmetVerifyId(routeParams.bmetVerifyId);
		}
	}, [bmetVerify, routeParams.bmetVerifyId]);

	const componentRef = useRef();

	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const today = moment().format('DD/MM/YYYY');

	const handleShowClick = () => {
		const value = watch('passenger');

		if (value) {
			setBmetVerifyId(value);
			setFormData({
				passenger: value
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
								<div style={{ minHeight: '100px' }}> </div>
								<h3 style={{ textAlign: 'center' }}>তারিখ : {today}</h3>
								<p>
									বরাবর ,
									<br />
									মহাপরিচারক <br />
									জনশক্তি কর্মসংস্থান ও প্রশিক্ষন ব্যুরো <br />
									ঢাকা টেকনিক্যাল ট্রাইনিং সেন্টার <br />
									দৃষ্টি আকর্ষণঃ যাচাই বাচাই সদস্য ০১ জন
									<br />
									<b>বিষয়ঃ ০১ (এক) জন {bmetVerify?.gender} কর্মীর যাচাই বাচাই এর জন্য আবেদন। </b>
									<br />
									<br />
									জনাব,
									<br />
									বিনীত নিবেদন এই যে আমি নিম্ন স্বাক্ষরকারী,স্বত্বাধিকারী{' '}
									{generalData?.agency_name_bangla} আর এল-{generalData?.rl_no},সৌদি আরবের বিভিন্ন
									নিয়োকর্তার অধীনে নিয়োগ প্রাপ্তির মোট ০১ (এক) জন {bmetVerify?.gender} কর্মীর যাচাই
									বাচাই এর জন্য অনুমতি প্রার্থনা করছি।
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
											<th style={{ border: '1px solid black' }}>কর্মীর নাম </th>
											<th style={{ border: '1px solid black' }}>পাসর্পোট নং</th>
											<th style={{ border: '1px solid black' }}>গন্তব্য দেশ</th>
											<th style={{ border: '1px solid black' }}>মন্তব্য</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={{ border: '1px solid black' }}>01</td>
											<td style={{ border: '1px solid black' }}>{bmetVerify?.passenger_name} </td>
											<td style={{ border: '1px solid black' }}>{bmetVerify?.passport_no}</td>
											<td style={{ border: '1px solid black' }}>
												{bmetVerify?.target_country?.name}
											</td>
											<td style={{ border: '1px solid black' }}>{Comment}</td>
										</tr>
									</tbody>
								</table>
								<br />
								<p>
									অতএব,জনাবের নিকট আকুল আবেদন এই য়ে , আমাকে সংযুক্ত ০১ (এক) জন {bmetVerify?.gender}{' '}
									কর্মীর যাচাই বাচাই এর জন্য ছাড়পএ প্রানের যথাযথ ব্যবস্থা গ্রহন করলে বাধিত হবো।
								</p>
								<br />
								<br />
								<br />
								<div className="text-right mr-"> বিনীত নিবেদক</div> <br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<div className="text-right mr-">মালিক/ব্যবস্থাপনা পরিচালক/অংশীদার সীল </div> <br />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default BmetVerifyForm;
