import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData from 'app/@customHooks/useReportData';
import useUserInfo from 'app/@customHooks/useUserInfo';
import getPaginationData from 'app/@helpers/getPaginationData';
import html2PDF from 'jspdf-html2canvas';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import * as yup from 'yup';
import { GET_SITESETTINGS } from '../../../../../constant/constants';
import '../../Print.css';
import Pagination from '../../reportComponents/Pagination';
import SinglePage from '../../reportComponents/SiglePage';
import { getAllEmbassys, getEmbassys } from '../store/embassyReportSlice';
import EmbassyFilterMenu from './EmbassyFilterMenu';

const useStyles = makeStyles(theme => ({
	headContainer: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 'fit-content'
	},
	pageContainer: {
		width: '100%',
		backgroundColor: 'white',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: '20px',
		paddingTop: '15px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	menubar: {
		backgroundColor: theme.palette.primary.light,
		display: 'flex',
		alignItems: 'center',
		padding: '5px',
		position: 'sticky',
		top: '0px',
		minWidth: 'fit-content',
		'& .inside': {
			color: theme.palette.primary.main
		},
		'& .icon': {
			margin: '0px 5px',
			height: '40px',
			padding: '5px',
			width: '40px',
			borderRadius: '50%',
			'&:active': {
				border: '1px solid !important'
			},
			'&:hover': {
				border: '1px solid !important'
			}
		},
		'& .downloadIcon': {
			position: 'relative',
			height: 'fit-content',
			width: 'fit-content',
			margin: '0px 5px',
			borderRadius: '50%',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
			'&:hover .downloadOptionContainer': {
				display: 'flex !important'
			},
			'& .downloadOptionContainer': {
				display: 'none',
				position: 'absolute',
				width: '150px',
				top: '35px',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: '10px',
				'&:hover': {
					display: 'flex !important'
				},
				'&:hover + svg': {
					border: '1px solid !important'
				},
				'& .indicator': {
					height: '10px',
					width: '10px',
					transform: 'rotate(41deg)',
					backgroundColor: theme.palette.primary.light,
					marginBottom: '-5px'
				},
				'& .downloadOptions': {
					backgroundColor: theme.palette.primary.light,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					borderRadius: '10px',
					'& .downloadContainer': {
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						width: '80px',
						padding: '5px 3px',
						background: theme.palette.primary.main,
						color: theme.palette.type == 'dark' ? 'black' : 'white',
						borderRadius: '10px'
					}
				}
			}
		},
		'& .columnSelectContainer': {
			position: 'relative',
			height: 'fit-content',
			width: 'fit-content',
			margin: '0px 5px',
			borderRadius: '50%',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'flex-end',
			'& > .allColumnContainer': {
				maxHeight: '200px',
				overflow: 'auto',
				position: 'absolute',
				top: '50px',
				background: theme.palette.primary.light,
				padding: '10px',
				color: theme.palette.primary.dark,
				borderRadius: '5px',
				'& > .columnContainer': {
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'nowrap',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: '2px 0px',
					'& > .checkBox': {
						color: theme.palette.primary.dark,
						padding: '0px 5px 0px 0px'
					},
					'& > h5': {
						fontSize: '14.5px',
						whiteSpace: 'nowrap'
					}
				}
			}
		}
	},
	pagination: {
		'& button': {
			color: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark
		}
	},
	pageHead: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: '10px',
		'& .logoContainer': {
			marginRight: '30px',
			height: '75px',
			'& img': {
				height: '100%',
				with: 'auto'
			}
		},
		'& .title': {
			marginLeft: '30px',
			width: 'fit-content'
		}
	},
	table: {
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '',
		'& .tableRow': {
			height: '36px',
			overflow: 'hidden'
		},
		'& .tableCell': {
			padding: '0px',
			height: '36px',
			'& div': {
				height: '36px',
				padding: '0px 2px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden'
			}
		},
		'& .tableCellHead': {
			padding: '0px',
			'& > div': {
				cursor: 'pointer',
				whiteSpace: 'nowrap',
				'&:active': {
					color: 'grey'
				},
				'&:hover .sortIcon': {
					opacity: '1 !important'
				},
				'& .sortIcon': {
					transition: '0.3s',
					opacity: '0',
					color: 'rgb(17, 24, 39)'
				}
			}
		}
	},
	pageBottmContainer: {
		width: '100%',
		padding: '10px',
		background: '#e9e9e9',
		height: '40px',
		textAlign: 'center'
	},
	pageBottm: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		'& > div': {
			display: 'flex',
			flexWrap: 'wrap',
			'& > h5': {
				paddingRight: '5px'
			}
		}
	}
}));

const schema = yup.object().shape({});

const initialTableColumnsState = [
	{ label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
	{ label: 'Passenger Name', name: 'passenger', subName: 'passenger_name', show: true },
	{ label: 'PP.No', name: 'passenger', subName: 'passport_no', show: true },
	{ label: 'Country', name: 'country', subName: 'name', show: true },
	{ label: 'Profession', name: 'profession', subName: 'name', show: true },
	{ label: 'Submit Date', name: 'submit_date', show: true, type: 'date' },
	{ label: 'Profession Eng', name: 'profession_english', show: true },
	{ label: 'Profession Arb', name: 'profession_arabic', show: true },
	{ label: 'Salary', name: 'salary', show: true },
	{ label: 'Stamping Status', name: 'stamping_status', show: true },
	{ label: 'V.Ent Date', name: 'created_at', show: true, type: 'date' },
	{ label: 'Stp Date', name: 'stamping_date', show: true, type: 'date' },
	{ label: 'V.Exp Date', name: 'visa_expiry_date', show: true, type: 'date' },
	{ label: 'Delivery Date', name: 'delivery_date', show: true, type: 'date' },
	{ label: 'recruiting_agency', name: 'recruiting_agency', subName: 'name', show: true }
];

function tableColumnsReducer(state, action) {
	switch (action.type) {
		case 'show': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.label === action.label);
			newState[targetIndex] = { ...newState[targetIndex], show: true };
			return newState;
		}
		case 'hide': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.label === action.label);
			newState[targetIndex] = { ...newState[targetIndex], show: false };
			return newState;
		}
		case 'dragAndDrop': {
			const newState = [...state];

			const dropperIndex = newState.findIndex(i => i.label === action.dropper);
			const draggerIndex = newState.findIndex(i => i.label === action.dragger);

			if (dropperIndex < draggerIndex) {
				newState.splice(dropperIndex, 0, newState[draggerIndex]);
				newState.splice(draggerIndex + 1, 1);
				return newState;
			} else if (dropperIndex > draggerIndex) {
				newState.splice(dropperIndex + 1, 0, newState[draggerIndex]);
				newState.splice(draggerIndex, 1);
				return newState;
			} else {
				return state;
			}
		}
		default:
			return state;
	}
}

const EmbassyReportsTable = () => {
	const classes = useStyles();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { getValues } = methods;

	const dispatch = useDispatch();

	const { authTOKEN } = useUserInfo();

	const [generalData, setGeneralData] = useState({});

	const [modifiedEmbassyData, setModifiedEmbassyData, setSortBy, setSortBySubKey] = useReportData([]);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	//tools state
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inDowloadPdf, setInDowloadPdf] = useState(false);
	const [inDowloadExcel, setInDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

	//pagination state
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	//get general setting data
	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then(response => response.json())
			.then(data => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);

	//print dom ref
	const componentRef = useRef();

	//printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	//print handler
	const handlePrint = () => {
		setInPrint(true);
		if (!inPrint) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllEmbassys(null, () => {
					printAction();
					setInPrint(false);
					handleGetEmbassys();
				});
			} else {
				printAction();
				setInPrint(false);
			}
		}
	};

	//pdf downloader action
	const pdfDownloadAction = () => {
		html2PDF(downloadPage, {
			margin: [0, 0, 0, 0],
			filename: 'pdfhtml2.pdf',
			html2canvas: {
				dpi: 300,
				letterRendering: true
			},
			setTestIsImage: false,
			useCORS: true,
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		});
		setInDowloadPdf(false);
	};

	//pdf download handler
	const handlePdfDownload = () => {
		setInDowloadPdf(true);
		if (!inDowloadPdf) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllEmbassys(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetEmbassys();
				});
			} else {
				pdfDownloadAction();
				setInDowloadPdf(false);
			}
		}
	};

	//exel download page dom
	let downloadPage = document.getElementById('downloadPage');

	//exel download handler
	const handleExelDownload = () => {
		setInDowloadExcel(true);
		if (!inDowloadExcel) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllEmbassys(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetEmbassys();
				});
			} else {
				document.getElementById('test-table-xls-button').click();
				setInDowloadExcel(false);
			}
		}
	};

	//column select close handler
	useLayoutEffect(() => {
		window.addEventListener('click', e => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	//pagination handler
	const firstPageHandler = event => {
		handleGetEmbassys(event.page);
	};
	const previousPageHandler = event => {
		handleGetEmbassys(event.page);
	};
	const nextPageHandler = event => {
		handleGetEmbassys(event.page);
	};
	const lastPageHandler = event => {
		handleGetEmbassys(event.page);
	};

	//get embassys
	const handleGetEmbassys = (pagePram, callBack) => {
		dispatch(getEmbassys({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				setModifiedEmbassyData(res.payload?.embassies || []);
				setPage(res.payload?.page || 1);
				setSize(res.payload?.size || 25);
				setTotalPages(res.payload?.total_pages || 0);
				setTotalElements(res.payload?.total_elements || 0);
				setInSiglePageMode(true);
				setInShowAllMode(false);
			});
		});
	};

	//get all embassy without pagination
	const handleGetAllEmbassys = (callBack, callBackAfterStateUpdated) => {
		dispatch(getAllEmbassys(getValues())).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				setModifiedEmbassyData(res.payload?.embassies || []);
				setInSiglePageMode(false);
				setInShowAllMode(true);
				//get pagination data
				const { totalPages, totalElements } = getPaginationData(res.payload?.embassies, size, page);
				setPage(page || 1);
				setSize(size || 25);
				setTotalPages(totalPages);
				setTotalElements(totalElements);
			});
			callBackAfterStateUpdated && callBackAfterStateUpdated(res.payload);
		});
	};

	return (
		<>
			<div className={classes.headContainer}>
				{/* filter */}
				<FormProvider {...methods}>
					<EmbassyFilterMenu
						inShowAllMode={inShowAllMode}
						handleGetEmbassys={handleGetEmbassys}
						handleGetAllEmbassys={handleGetAllEmbassys}
					/>
				</FormProvider>
			</div>
			<div className={`${classes.menubar} justify-start md:justify-center`}>
				{/* pagination */}
				<Pagination
					page={page}
					size={size}
					totalPages={totalPages || 0}
					totalElements={totalElements || 0}
					onClickFirstPage={firstPageHandler}
					onClickPreviousPage={previousPageHandler}
					onClickNextPage={nextPageHandler}
					onClickLastPage={lastPageHandler}
				/>

				<div className="downloadIcon">
					{/* download options*/}
					<div className="downloadOptionContainer">
						<div className="indicator"></div>
						<div className="downloadOptions shadow-4">
							{/* download as Pdf */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{ width: '150px', margin: '10px' }}
								onClick={() => handlePdfDownload()}
							>
								<FontAwesomeIcon icon={faFilePdf} />
								<b>Download PDF</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>

							{/* download as Excel */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{ width: '160px', margin: '0px 10px 10px 10px' }}
								onClick={() => handleExelDownload()}
							>
								<FontAwesomeIcon icon={faFileExcel} />
								<b>Download Excel</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>
						</div>
					</div>
					{/* download icon*/}
					<GetApp
						className="cursor-pointer inside icon"
						style={{ margin: '0px', border: (inDowloadPdf || inDowloadExcel) && '1px solid' }}
					/>
				</div>

				{/* print icon*/}
				<PrintIcon
					className="cursor-pointer inside icon"
					style={{ padding: '6px', border: inPrint && '1px solid' }}
					onClick={() => handlePrint()}
				/>

				{/* show single page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inSiglePageMode && '1px solid' }}
					onClick={() => handleGetEmbassys()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					onClick={() => handleGetAllEmbassys()}
					icon={faScroll}
				/>

				{/* column select option icon*/}
				<div className="columnSelectContainer">
					<ViewWeek
						id="insideClmSelect"
						className="cursor-pointer inside icon"
						style={{ margin: '0px', padding: '6px', border: showClmSelectOption && '1px solid' }}
						onClick={() => setTimeout(() => setShowClmSelectOption(true), 0)}
					/>

					{/* columns */}
					<div
						id="insideClmSelect"
						className={`allColumnContainer shadow-5 ${showClmSelectOption ? 'block' : 'hidden'}`}
					>
						{tableColumns.map(column => (
							<div id="insideClmSelect" className="columnContainer">
								<Checkbox
									id="insideClmSelect"
									className="checkBox"
									checked={column.show}
									onClick={() => {
										dispatchTableColumns({
											type: column.show ? 'hide' : 'show',
											label: column.label
										});
									}}
								/>
								<h5 id="insideClmSelect">{column.label}</h5>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* excel converter */}
			<div className="hidden">
				<ReactHtmlTableToExcel
					id="test-table-xls-button"
					className="download-table-xls-button"
					table="table-to-xls"
					filename="tablexls"
					sheet="tablexls"
					buttonText="Download as XLS"
				/>
			</div>

			<table id="table-to-xls" className="w-full" style={{ minHeight: '270px' }}>
				<div ref={componentRef} id="downloadPage">
					{/* each single page (table) */}
					{modifiedEmbassyData.map(embassy => (
						<SinglePage
							classes={classes}
							generalData={generalData}
							reporTitle="Embassy Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={embassy}
							serialNumber={embassy.page * embassy.size - embassy.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
						/>
					))}
				</div>
			</table>
		</>
	);
};
export default EmbassyReportsTable;
