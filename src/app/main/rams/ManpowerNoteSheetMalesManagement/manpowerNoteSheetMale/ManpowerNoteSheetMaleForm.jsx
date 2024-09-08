/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';

import moment from 'moment';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

import { NOTE_SHEET_FOOTER, NOTE_SHEET_HEADER } from 'src/app/constant/FormContentTitle/formContentTitle';
import { Interweave } from 'interweave';
import { GET_FORM_CONTENT_DETAILS_BY_TITLE, GET_SITESETTINGS } from 'src/app/constant/constants';
import { getPassengers } from 'app/store/dataSlice';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import SinglePageOnlyTable from 'src/app/@components/ReportComponents/SinglePageOnlyTable';
import { useGetManpowerNoteSheetMaleQuery } from '../ManpowerNoteSheetMalesApi';

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

const initialTableColumnsState = [
	{
		id: 1,
		label: 'ক্রমিক নং',
		sortAction: false,
		isSerialNo: true,
		show: true
	},
	{ id: 2, label: 'কর্মীর নাম', name: 'passenger_name', show: true },
	{ id: 3, label: 'পাসপোর্ট নম্বার', name: 'passport_no', show: true },
	{ id: 4, label: 'জন্ম তারিখ.', name: 'date_of_birth', show: true },
	{ id: 5, label: 'ভিসা নম্বর ', name: 'visa_no', show: true },
	{ id: 6, label: 'স্বএ্যায়নের তারিখ ', name: 'stamping_date', show: true },
	{ id: 7, label: 'পদের নাম', name: 'profession', show: true },
	{ id: 8, label: 'নিয়োগকারীর নাম', name: 'sponsor_name', show: true }
];

const initialTableColumnsState2 = [
	{
		id: 1,
		label: 'ক্রমিক নং',
		sortAction: false,
		isSerialNo: true,
		show: true
	},
	{ id: 2, label: 'কর্মীর নাম', name: 'passenger_name', show: true },
	{ id: 3, label: 'পাসপোর্ট নম্বার', name: 'passport_no', show: true },
	{ id: 4, label: 'সনদ নম্বর.', name: 'certificate_no', show: true },
	{ id: 5, label: 'ব্যাচ নম্বর ', name: 'batch_number', show: true },
	{ id: 6, label: 'সিরিয়াল নম্বর ', name: 'serial_no', show: true },
	{ id: 7, label: 'টি.টি.সির নাম', name: 'training_center', show: true }
];
const initialTableColumnsState3 = [
	{
		id: 1,
		label: 'ক্রমিক নং',
		sortAction: false,
		isSerialNo: true,
		show: true
	},
	{ id: 2, label: 'কর্মীর নাম', name: 'passenger_name', show: true },
	{ id: 3, label: 'পাসপোর্ট নম্বার', name: 'passport_no', show: true },
	{ id: 4, label: 'ব্যাংকের নাম', name: 'bank_name', show: true },
	{ id: 5, label: 'অ্যাকাউন্ট নং', name: 'account_no', show: true },
	{
		id: 6,
		label: 'মেডিকেল সেন্টারের নাম ',
		name: 'medical_center',
		show: true
	}
];

function ManpowerNoteSheetMaleForm(props) {
	const methods = useFormContext();
	const { watch } = methods;
	const [generalData, setGeneralData] = useState({});
	const routeParams = useParams();
	const [manpowerNoteSheetMaleId, setManpowerNoteSheetMaleId] = useState('');
	const [showPrint, setShowPrint] = useState(false);
	const Comment = '';
	const [formData, setFormData] = useState({
		passenger: '',
		center_name: '',
		district: ''
	});

	const classes = useStyles();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const manPowerDate = watch('man_power_date');

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const { data, refetch } = useGetManpowerNoteSheetMaleQuery({
		manPowerDate: selectedDate
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

	// useEffect(() => {
	//   if (_.isEmpty(manpowerNoteSheetMale)) {
	//     setShowPrint(false);
	//   } else {
	//     setShowPrint(true);
	//   }

	//   if (routeParams.manpowerNoteSheetMaleId !== "manpowerNoteSheetMale-form") {
	//     setManpowerNoteSheetMaleId(routeParams.manpowerNoteSheetMaleId);
	//   }
	// }, [manpowerNoteSheetMale, routeParams.manpowerNoteSheetMaleId]);

	const componentRef = useRef();

	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);
	const [tableColumns2, dispatchTableColumns2] = useReducer(tableColumnsReducer, initialTableColumnsState2);
	const [tableColumns3, dispatchTableColumns3] = useReducer(tableColumnsReducer, initialTableColumnsState3);

	const [modifiedManpowerNtSheetData, setModifiedManpowerNtSheetData, setSortBy, setSortBySubKey, dragAndDropRow] =
		useReportData();

	const Country = data?.length > 0 ? data[0]?.man_power_list?.country?.name : '';

	console.log('modifiedManpowerNtSheetData', modifiedManpowerNtSheetData);

	useEffect(() => {
		const modifiedData = [];
		data?.map((manpowerSub) => {
			modifiedData.push({
				passenger_name: manpowerSub?.passenger?.passenger_name,
				passport_no: manpowerSub?.passenger?.passport_no,
				date_of_birth: moment(new Date(manpowerSub?.passenger?.date_of_birth)).format('DD-MM-YYYY'),
				visa_no: manpowerSub?.visa_entry?.visa_number,
				stamping_date: moment(new Date(manpowerSub?.embassy?.stamping_date)).format('DD-MM-YYYY'),
				profession: manpowerSub?.embassy?.profession_english,
				certificate_no: manpowerSub?.training?.certificate_no,
				batch_number: manpowerSub?.training?.batch_number,
				serial_no: manpowerSub?.training?.serial_no,
				training_center: manpowerSub?.training?.training_center,
				sponsor_name: manpowerSub?.visa_entry?.sponsor_name_english,
				bank_name: manpowerSub?.man_power?.bank_name,
				account_no: manpowerSub?.man_power?.bank_account_no,
				medical_center: manpowerSub?.medical?.medical_center?.name
			});
		});
		setModifiedManpowerNtSheetData(modifiedData);
	}, [data]);

	const [tabileShow, setTabileShow] = useState(false);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_HEADER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentHeaderData', data?.formcontent_detail[0]?.details || '')
			);

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_FOOTER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentFooterData', data?.formcontent_detail[0]?.details || '')
			);
	}, []);

	function handleSearchManPowerDateClick() {
		setSelectedDate(manPowerDate);
		setTabileShow(true);
	}

	return (
		<>
			<div>
				<CustomDatePicker
					name="man_power_date"
					label="Manpower Date"
					required
					placeholder="DD-MM-YYYY"
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
						onClick={() => handleSearchManPowerDateClick()}
					>
						Search
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

			<br />
			<br />
			{tabileShow && (
				<div className={classes.container}>
					<ReportPaginationAndDownload
						page={page}
						size={size}
						setPage={setPage}
						setSize={setSize}
						inShowAllMode={inShowAllMode}
						setInShowAllMode={setInShowAllMode}
						componentRef={componentRef}
						handleExelDownload={handleExelDownload}
						handlePrint={handlePrint}
						// handleGetAllData={data}
						tableColumns={tableColumns}
						dispatchTableColumns={dispatchTableColumns}
						dragAndDropRow={dragAndDropRow}
					/>

					<div
						ref={componentRef}
						id="downloadPage"
						className="p-14"
					>
						<table
							id="table-to-xls"
							className="w-full"
							style={{ minHeight: '270px' }}
						>
							<div>
								<div className="p-14">
									{modifiedManpowerNtSheetData.length > 0 && (
										<Interweave
											allowAttributes
											allowElements
											disableLineBreaks
											content={sessionStorage.getItem('formContentHeaderData')}
										/>
									)}
								</div>
								{/* each single page (table) */}
								{modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
									<SinglePageOnlyTable
										key={index}
										classes={classes}
										reportTitle=""
										tableColumns={tableColumns}
										dispatchTableColumns={dispatchTableColumns}
										data={manpowerNtSheet}
										serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
										setPage={setPage}
										setSortBySubKey={setSortBySubKey}
										dragAndDropRow={dragAndDropRow}
										// setSortBy={setSortBy}
									/>
								))}
							</div>
						</table>
						<p
							style={{
								display: modifiedManpowerNtSheetData.length > 0 ? 'block' : 'none'
							}}
						>
							১৪৩/প্রশিক্ষণ সনদের বিবরনঃ
						</p>

						<div>
							{/* each single page (table) */}
							{modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
								<SinglePageOnlyTable
									key={index}
									classes={classes}
									reportTitle=""
									tableColumns={tableColumns2}
									dispatchTableColumns={dispatchTableColumns2}
									data={manpowerNtSheet}
									serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
									setPage={setPage}
									setSortBySubKey={setSortBySubKey}
									dragAndDropRow={dragAndDropRow}
									// setSortBy={setSortBy}
								/>
							))}
						</div>

						<p
							style={{
								display: modifiedManpowerNtSheetData.length > 0 ? 'block' : 'none'
							}}
						>
							১৪৪/ ব্যাংক অ্যাকাউন্ট ও মেডিকেল সেন্টারের বিবরনঃ
						</p>

						<div>
							{/* each single page (table) */}
							{modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
								<SinglePageOnlyTable
									key={index}
									classes={classes}
									reportTitle=""
									tableColumns={tableColumns3}
									dispatchTableColumns={dispatchTableColumns3}
									data={manpowerNtSheet}
									serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
									setPage={setPage}
									setSortBySubKey={setSortBySubKey}
									dragAndDropRow={dragAndDropRow}
									// setSortBy={setSortBy}
								/>
							))}
						</div>

						<div className="p-14">
							{modifiedManpowerNtSheetData.length > 0 && (
								<Interweave
									allowAttributes
									allowElements
									disableLineBreaks
									className="p-14"
									content={sessionStorage.getItem('formContentFooterData')}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ManpowerNoteSheetMaleForm;
