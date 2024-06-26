import axios from 'axios';
import moment from 'moment';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import { BASE_URL, GET_FEMALECV_BY_ID_FOR_PRINT, GET_SITESETTINGS } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { useReactToPrint } from 'react-to-print';

const useStyles = makeStyles(() => ({
	printableContainer: {
		padding: '30px',
		'& .companyLogo': {
			display: 'flex',
			justifyContent: 'center',
			height: '50px',
			overflow: 'hidden',
			'& > img': {
				height: '100%',
				width: 'fit-content'
			}
		},
		'& .companyName': {
			marginTop: '10px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'flex-end',
			fontWeight: 'bold'
		},
		'& .address': {
			padding: '1px 0px',
			display: 'flex',
			justifyContent: 'center'
		},
		'& .moEmailWeb': {
			padding: '1px 0px',
			display: 'flex',
			justifyContent: 'center',
			'& > div': {
				margin: '0px 5px',
				'& > span': {
					paddingLeft: '5px'
				}
			}
		},
		'& .title': {
			textAlign: 'center',
			marginTop: '10px',
			fontWeight: 500
		},
		'& .voucerAndDate': {
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			padding: '5px 20px',
			fontWeight: 500
		},
		'& table, th, td': {
			border: '1px solid darkgray'
		},
		'& table': {
			with: '100%',
			'& thead': {
				background: 'lightgrey'
			},
			'& tr': {
				height: '25px'
			},
			'& th.left, td.left': {
				width: '100%',
				textAlign: 'left',
				paddingLeft: '5px',
				fontSize: '14px',
				fontWeight: 500
			},
			'& th.right, td.right': {
				padding: '0px 5px',
				textAlign: 'right',
				width: 'fit-content',
				whiteSpace: 'nowrap'
			}
		},
		'& .allSignatureContainer': {
			height: '120px',
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'flex-end',
			'& .signatureContainer': {
				height: '30px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				'& div': {
					borderTop: '1px dashed',
					width: '100px'
				},
				'& h5': {
					width: 'fit-content',
					whiteSpace: 'nowrap'
				}
			}
		}
	}
}));

const PrintFemaleCv = forwardRef(({ title, type }, ref) => {
	const classes = useStyles();
	const toWords = new ToWords();
	const [generalData, setGeneralData] = useState({});
	const [data, setData] = useState({});

	console.log('datasaasasa', data);

	const [femaleCVPrint, setFemaleCVPrint] = useState({});

	console.log('datasasa', data);

	const [dataItems, setDataItems] = useState([]);
	const [totalDbAmount, setTotalDbAmount] = useState('0.00');
	const [totalCDAmount, setTotalCDAmount] = useState('0.00');
	const [amountInWord, setAmountInWord] = useState('ZERO TK ONLY');

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
			const response = await axios.get(`${GET_FEMALECV_BY_ID_FOR_PRINT}${id}`, {
				headers: {
					Authorization: `${localStorage.getItem('jwt_access_token')}`
				}
			});
			console.log('response?.data', response?.data);
			setData(response?.data);
			return response?.data || {};
		} catch (er) {
			throw er;
		}
	};

	useImperativeHandle(ref, () => ({
		doPrint(n) {
			debugger;
			getFemaleCvData(n.id)
				.then((res) => {
					unstable_batchedUpdates(() => {
						setData(res || {});
					});
					printAction();
					unstable_batchedUpdates(() => {
						setData({});
					});
				})
				.catch(() => {
					unstable_batchedUpdates(() => {
						setData({});
					});
				});
		}
	}));

	return (
		<div
			className="w-full"
			style={{ minHeight: '270px' }}
		>
			<div
				ref={componentRef}
				id="downloadPage"
				className="p-10"
			>
				<table>
					<tr>
						<td width="25%">
							<img
								src={`${BASE_URL}${generalData?.logo}`}
								width="200px"
								className="text-center"
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
						<td width="25%">
							<img
								src={`${BASE_URL}${femaleCVPrint?.passenger?.passenger_pic}`}
								className="border rounded border-black w-75 text-center"
								height="200px"
							/>
						</td>
					</tr>
				</table>

				<table
					cellPadding="5"
					cellSpacing="2"
				>
					<tr>
						<td
							width="50%"
							className="text-center"
						>
							<h3>
								BIO DATA <br /> Professionals in supplying all kind of manpower
								<br /> (Bangladesh Manpower Specialish)
							</h3>
						</td>
						<td
							width="50%"
							className="text-center"
						>
							<table className="border-collapse borderborder-black w-100">
								<tr>
									<td className="border border-black "> Post Applied For</td>
									<td className="border border-black text-center">{femaleCVPrint?.post}</td>
									<td className="border border-black text-right">الوظيفة</td>
								</tr>
								<tr>
									<td className="border border-black "> Monthly Salary </td>
									<td className="border border-black text-center">1000</td>
									<td className="border border-black text-right"> الراتب الشهري</td>
								</tr>
								<tr>
									<td className="border border-black ">Contract Period </td>
									<td className="border border-black text-center"> 2 years </td>
									<td className="border border-black text-right"> مدة العقد</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>

				<table
					cellPadding="5"
					cellSpacing="2"
					width="100%"
				>
					<td className="border border-black ">Name:</td>
					<td className="border border-black text-center	">{femaleCVPrint?.passenger?.passenger_name}</td>
					<td className="border border-black text-right">الاسم الكامل</td>
				</table>
				<h3>DETAILS OF APPLICATION</h3>
				<table>
					<tr>
						<td width="50%">
							<table
								cellPadding="5"
								cellSpacing="2"
								width="100%"
							>
								<tr>
									<td className="border border-black ">Nationality</td>
									<td className="border border-black text-center">Bangladeshi</td>
									<td className="border border-black text-right">الجنسية</td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Religion</td>
									<td className="border border-black text-center ">
										{femaleCVPrint?.passenger?.religion}
									</td>
									<td className="border border-black text-right"> الديانه</td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Date of Birth</td>
									<td className="border border-black text-center">
										{moment(new Date(femaleCVPrint?.passenger?.date_of_birth)).format('DD-MM-YYYY')}
									</td>
									<td className="border border-black text-right"> لميالد ت</td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Age</td>
									<td className="border border-black text-center">
										{/* {differenceInYears(
												new Date(),
												new Date(femaleCVPrint?.passenger?.date_of_birth)
											)} */}
									</td>
									<td className="border border-black text-right"> العمر</td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Place of Birth</td>
									<td className="border border-black text-center ">
										{femaleCVPrint?.passenger?.place_of_birth}
									</td>
									<td className="border border-black text-right"> محل الولادة /مكان الميلاد</td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Place of Residence </td>
									<td className="border border-black text-center ">
										{femaleCVPrint?.place_of_residence}
									</td>
									<td className="border border-black text-right"> مكان السكن </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Marital status </td>
									<td className="border border-black text-center ">
										{femaleCVPrint?.passenger?.marital_status}
									</td>
									<td className="border border-black text-right"> الحالة الاجتماعية </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> No. Of Children </td>
									<td className="border border-black text-center">
										{femaleCVPrint?.number_of_children}
									</td>
									<td className="border border-black text-right"> ل عدد </td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Weight</td>
									<td className="border border-black text-center">{femaleCVPrint?.weight}</td>
									<td className="border border-black text-right"> الطول </td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Education</td>
									<td className="border border-black text-center ">{femaleCVPrint?.education}</td>
									<td className="border border-black text-right"> التعليم </td>{' '}
								</tr>
								<tr>
									<td className="border border-black ">Complexion</td>
									<td className="border border-black text-center">{femaleCVPrint?.complexion}</td>
									<td className="border border-black text-right"> &nbsp; </td>{' '}
								</tr>
								<tr>
									<td className="border border-black text-center w-100 ">
										{' '}
										<center>PASSPORT DETAILS</center>
									</td>
								</tr>
								<tr>
									<td className="border border-black ">Number</td>
									<td className="border border-black text-center">
										{femaleCVPrint?.passenger?.passport_no}
									</td>
									<td className="border border-black text-right "> رقم جواز السفر </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Date Of Issue </td>
									<td className="border border-black text-center">
										{moment(new Date(femaleCVPrint?.passenger?.passport_issue_date)).format(
											'DD-MM-YYYY'
										)}
									</td>
									<td className="border border-black text-right"> تاريخ الاصدار </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Date of Exp. </td>
									<td className="border border-black text-center">
										{moment(new Date(femaleCVPrint?.passenger?.passport_expiry_date)).format(
											'DD-MM-YYYY'
										)}
									</td>
									<td className="border border-black text-right"> تاريخ انتهاء صلاحية الجواز </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Place of Issue. </td>
									<td className="border border-black text-center">
										{femaleCVPrint?.passenger?.passport_issue_place}
									</td>
									<td className="border border-black text-right"> محل الاصدار </td>{' '}
								</tr>
								<tr>
									<td className="border border-black "> Contact Number. </td>
									<td className="border border-black text-center">
										{femaleCVPrint?.passenger?.contact_no}
									</td>
									<td className="border border-black text-right"> رقم الجواز </td>{' '}
								</tr>
							</table>
						</td>

						{/* CV Image  */}
						<td width="100%">
							<img
								src={`${BASE_URL}${femaleCVPrint?.image}`}
								className="text-center"
								style={{
									height: '480px',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%'
								}}
								align="center"
							/>
						</td>
					</tr>
				</table>

				<table
					cellPadding="2"
					cellSpacing="2"
					width="100%"
				>
					<tr>
						<td width="30%">
							<table
								cellPadding="5"
								cellSpacing="2"
								width="100%"
							>
								<caption>LANGUAGES EXP</caption>
								<tr>
									<td className="border border-black text-center"> Language</td>
									<td className="border border-black text-center">Experience</td>
								</tr>
								<tr>
									<td className="border border-black text-center"> Arabic</td>
									<td className="border border-black text-center">{femaleCVPrint?.arabic_skill}</td>
								</tr>
								<tr>
									<td className="border border-black text-center"> English</td>
									<td className="border border-black text-center">{femaleCVPrint?.english_skill}</td>
								</tr>
							</table>
						</td>
						<td width="5%">&nbsp;</td>
						<td width="60%">
							<p className="border border-black p-10">
								I HERE BY DECLARATE THAT THE ABOVE PARTICULARS FURNISHED BY ME ARE TRUE AND ACCURATE TO
								THE OF MY KNOWLEDGE
							</p>
						</td>
						<td width="5%">&nbsp;</td>
					</tr>
				</table>
				<table
					cellPadding="2"
					cellSpacing="2"
					width="100%"
				>
					<tr>
						<td width="30%">
							<table
								cellPadding="5"
								cellSpacing="2"
								width="30%"
							>
								<caption>WORK EXPERIENCE</caption>
								<tr>
									<td className="border border-black text-center"> Country</td>
									<td className="border border-black text-center"> Bangladesh</td>
								</tr>
								<tr>
									<td className="border border-black text-center"> Period</td>
									<td className="border border-black text-center">03 Years</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<table
					cellPadding="2"
					cellSpacing="2"
					width="100%"
				>
					<tr>
						<td width="100%">
							<table
								cellPadding="5"
								cellSpacing="2"
								width="100%"
							>
								<tr>
									<td
										className="border border-black "
										width="30%"
									>
										{' '}
										What I Can Do For
									</td>
									<td
										className="border border-black "
										width="70%"
									>
										{' '}
										&nbsp;
									</td>
								</tr>
								<tr>
									<td
										className="border border-black "
										width="30%"
									>
										{' '}
										REMARKS
									</td>
									<td
										className="border border-black "
										width="70%"
									>
										&nbsp;
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
});

export default memo(PrintFemaleCv);
