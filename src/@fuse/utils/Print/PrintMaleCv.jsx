/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import moment from 'moment';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { BASE_URL, GET_MALECV_BY_ID_FOR_PRINT, GET_SITESETTINGS } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { useReactToPrint } from 'react-to-print';

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

const PrintFemaleCv = forwardRef(({ title, type }, ref) => {
	const classes = useStyles();
	const [generalData, setGeneralData] = useState({});
	const [data, setData] = useState({});

	const [isReadyToPrint, setIsReadyToPrint] = useState(false);

	// Get general setting data
	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);

	// Print DOM ref
	const componentRef = useRef();

	// Printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const getFemaleCvData = async (id) => {
		try {
			const response = await axios.get(`${GET_MALECV_BY_ID_FOR_PRINT}${id}`, {
				headers: {
					Authorization: `${localStorage.getItem('jwt_access_token')}`
				}
			});
			return response?.data || {};
		} catch (er) {
			throw er;
		}
	};

	useImperativeHandle(ref, () => ({
		async doPrint(n) {
			try {
				const res = await getFemaleCvData(n.id);
				setData(res || {});
				setIsReadyToPrint(true);
			} catch (error) {
				console.error('Error fetching data:', error);
				setData({});
			}
		}
	}));

	useEffect(() => {
		if (isReadyToPrint) {
			printAction();
			setIsReadyToPrint(false);
		}
	}, [isReadyToPrint, printAction]);
	return (
		<div
			ref={componentRef}
			className={`${classes.printableContainer} hidden print:block`}
		>
			<div
				className="w-full"
				style={{ minHeight: '270px' }}
			>
				<div
					ref={componentRef}
					id="downloadPage"
					className="p-20"
				>
					<table className="mt-40 text-center">
						<tr>
							<td width="25%">
								<img
									src={`${BASE_URL}${generalData?.logo}`}
									width="200px"
									className="text-center"
									alt="testLogo"
								/>
							</td>{' '}
							<td width="50%">
								<center>
									<table>
										<tr>
											<td>
												<p className="title  pl-0 md:-pl-20 text-center">{` ${
													generalData?.title || ''
												}`}</p>{' '}
											</td>
										</tr>
										<tr>
											<td>
												<p className="title  pl-0 md:-pl-20 text-center">{` ${
													generalData?.address || ''
												}`}</p>{' '}
											</td>
										</tr>
										<tr>
											<td>
												<p className="title  pl-0 md:-pl-20 text-center">
													{`Mobile:  ${generalData?.phone || ''}`}{' '}
													{`Email : ${generalData?.email || ''}`}
												</p>{' '}
											</td>
											<tr />
										</tr>
									</table>
								</center>
							</td>
							<td
								width="25%"
								className="object-none object-right"
							>
								<img
									src={`${BASE_URL}${data?.passenger?.passenger_pic}`}
									className="border rounded border-black  text-center"
									style={{ height: '200px', width: '200px' }}
								/>
							</td>
						</tr>
					</table>

					<h1 className="text-center  p-10 w-25 my-20">
						{' '}
						<span className="border border-black rounded p-10">BIO-DATA</span>{' '}
					</h1>

					<table
						cellPadding="5"
						cellSpacing="2"
						width="100%"
						className="mt-5 border-separate border-spacing-4"
					>
						<tr>
							<td width="25%"> SERIAL NO.</td>
							<td
								width="25%"
								className="border border-black"
							>
								{' '}
								{data?.passenger?.passenger_id}{' '}
							</td>
							<td
								width="25%"
								className="text-right"
							>
								{' '}
								POST
							</td>
							<td
								width="25%"
								className="border border-black"
							>
								{data?.post}{' '}
							</td>
						</tr>
					</table>
					<table
						cellPadding="5"
						cellSpacing="2"
						width="100%"
						className="mt-5 border-separate border-spacing-4"
					>
						<tr>
							<td width="25%">NAME</td>
							<td
								width="75%"
								className="border border-black"
							>
								{' '}
								{data?.passenger?.passenger_name}
							</td>
						</tr>
						<tr>
							<td width="25%">FATHER'S NAME</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.passenger?.father_name}
							</td>
						</tr>
						<tr>
							<td width="25%">MOTHER'S NAME</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.passenger?.mother_name}
							</td>
						</tr>
						<tr>
							<td width="25%">PERMANENT ADDRESS</td>
							<td
								width="75%"
								className="border border-black"
							>
								PERMANENT ADDRESS
							</td>
						</tr>
						<tr>
							<td width="25%">PRESENT ADDRESS</td>
							<td
								width="75%"
								className="border border-black"
							>
								PRESENT ADDRESS
							</td>
						</tr>
					</table>

					<table
						cellPadding="5"
						cellSpacing="5"
						width="100%"
						className="mt-5 border-separate border-spacing-4"
					>
						<tr>
							<td width="25%"> PASSPORT NO.</td>
							<td
								width="25%"
								className="border border-black"
							>
								{data?.passenger?.passport_no}
							</td>
							<td
								width="25%"
								className="text-right"
							>
								Date of Issue
							</td>
							<td
								width="25%"
								className="border border-black"
							>
								{moment(new Date(data?.passenger?.passport_issue_date)).format('DD-MM-YYYY')}
							</td>
						</tr>
						<tr>
							<td width="25%"> &nbsp;</td>
							<td width="25%"> &nbsp; </td>
							<td
								width="25%"
								className="text-right"
							>
								VALID UP TO DATE
							</td>
							<td
								width="25%"
								className="border border-black"
							>
								{moment(new Date(data?.passenger?.passport_expiry_date)).format('DD-MM-YYYY')}
							</td>
						</tr>
					</table>

					<table
						cellPadding="5"
						cellSpacing="2"
						width="100%"
						className="mt-5 border-separate border-spacing-4"
					>
						<tr>
							<td width="25%">DATE OF BIRTH</td>
							<td
								width="75%"
								className="border border-black"
							>
								{moment(new Date(data?.passenger?.date_of_birth)).format('DD-MM-YYYY')}
							</td>
						</tr>
						<tr>
							<td width="25%">NATIONALITY</td>
							<td
								width="75%"
								className="border border-black"
							>
								BANGLADESHI
							</td>
						</tr>
						<tr>
							<td width="25%">QUALIFICATION</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.qualification}
							</td>
						</tr>
						<tr>
							<td width="25%">HEIGHT</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.height}
							</td>
						</tr>
						<tr>
							<td width="25%">WEIGHT</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.weight}
							</td>
						</tr>
						<tr>
							<td width="25%">RELIGION</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.passenger?.religion}
							</td>
						</tr>
						<tr>
							<td width="25%">MARITIAL STATUS</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.passenger?.marital_status}
							</td>
						</tr>
						<tr>
							<td width="25%">LANGUAGE KNOW</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.language_skill}
							</td>
						</tr>
						<tr>
							<td width="25%">EXPERIENCE</td>
							<td
								width="75%"
								className="border border-black"
							>
								{data?.experience}
							</td>
						</tr>
					</table>

					<table
						width="100%"
						className="mt-40 border-separate border-spacing-4"
					>
						<tr>
							<td
								width="50%"
								className=""
							>
								AUTHORIZED SIGNATURE
							</td>
							<td
								width="50%"
								className="text-right"
							>
								Date : {moment().format('YYYY-MM-DD')}{' '}
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
});

export default memo(PrintFemaleCv);
