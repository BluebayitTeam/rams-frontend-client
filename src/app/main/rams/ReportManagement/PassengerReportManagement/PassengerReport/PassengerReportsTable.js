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
import { FormProvider, useForm } from 'react-hook-form';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import * as yup from 'yup';
import { GET_SITESETTINGS } from '../../../../../constant/constants';
import '../../Print.css';
import Pagination from '../../reportComponents/Pagination';
import SinglePage from '../../reportComponents/SiglePage';
import { getAgents, getAllAgents } from '../store/passengerReportSlice';
import PassengerFilterMenu from './PassengerFilterMenu';

const useStyles = makeStyles(theme => ({
	headContainer: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 'fit-content'
	},
	pageContainer: {
		width: '90%',
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
		justifyContent: 'center',
		alignItems: 'center',
		padding: '5px',
		position: 'sticky',
		top: '0px',
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
						fontSize: '14.5px'
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
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: '10px',
		'& .logoContainer': {
			height: '75px',
			'& img': {
				height: '100%',
				with: 'auto'
			}
		},
		'& .title': {
			width: 'fit-content'
		}
	},
	table: {
		width: '90%',
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
			'& > div': {
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
		width: '90%',
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
	{ label: 'Sl_No', sortAction: false, serialNo: true, show: true },
	{ label: 'Name', name: 'username', show: true },
	{ label: 'Group', name: 'group', subName: 'name', show: true },
	{ label: 'District', name: 'city', subName: 'name', show: true },
	{ label: 'Mobile', name: 'primary_phone', show: true },
	{ label: 'Email', name: 'email', show: true }
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
			const draggerIndex = newState.findIndex(i => i.label === action.dragger);
			const dropperIndex = newState.findIndex(i => i.label === action.dropper);

			const cachedDropperData = newState[dropperIndex];

			newState[dropperIndex] = newState[draggerIndex];
			newState[draggerIndex] = cachedDropperData;

			return newState;
		}
		default:
			return state;
	}
}

const PassengerReportsTable = props => {
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

	const [modifiedAgentData, setModifiedAgentData, setSortBy] = useReportData([], 5);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	console.log('modifiedAgentData', modifiedAgentData);

	//tools state
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inDownload, setInDownload] = useState(false);
	const [dowloadPdf, setDowloadPdf] = useState(false);
	const [dowloadExcel, setDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

	//pagination state
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(5);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	let downloadPage = document.getElementById('downloadPage');

	useEffect(() => {
		getGeneralData();
	}, []);

	//general setting data
	const getGeneralData = () => {
		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then(response => response.json())
			.then(data => setGeneralData(data.general_settings[0] || {}))
			.catch(() => null);
	};

	//print
	const componentRef = useRef();

	//print handler
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	//print action when show all mode or fecth data to go show all mode
	useEffect(() => {
		if (inPrint) {
			if (inSiglePageMode && totalPages > 1) {
				handleGetAllAgents();
			} else {
				handlePrint();
				setInPrint(false);
			}
		}
	}, [inPrint]);

	//print action after show all mode's data fething
	useEffect(() => {
		if (inPrint) {
			handlePrint();
			setInPrint(false);
			handleGetAgents();
		}
	}, [modifiedAgentData]);

	//pdf download handler
	const pdfDownloadHandler = () => {
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
		setDowloadPdf(false);
	};

	//download action when show all mode or fecth data to go show all mode
	useEffect(() => {
		if (inDownload) {
			if (inSiglePageMode && totalPages > 1) {
				handleGetAllAgents();
			} else {
				if (dowloadPdf) {
					pdfDownloadHandler();
					setInDownload(false);
				} else if (dowloadExcel) {
					document.getElementById('test-table-xls-button').click();
					setInDownload(false);
					setDowloadExcel(false);
				}
			}
		}
	}, [inDownload]);

	//download action after show all mode's data fething
	useEffect(() => {
		if (inDownload) {
			if (dowloadPdf) {
				pdfDownloadHandler();
				setInDownload(false);
			} else if (dowloadExcel) {
				document.getElementById('test-table-xls-button').click();
				setInDownload(false);
				setDowloadExcel(false);
			}
			handleGetAgents();
		}
	}, [modifiedAgentData]);

	//column select close handler
	useLayoutEffect(() => {
		window.addEventListener('click', e => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	//pagination handler
	const firstPageHandler = event => {
		handleGetAgents(event.page);
	};
	const previousPageHandler = event => {
		handleGetAgents(event.page);
	};
	const nextPageHandler = event => {
		handleGetAgents(event.page);
	};
	const lastPageHandler = event => {
		handleGetAgents(event.page);
	};

	//get agents
	const handleGetAgents = (pagePram, callBack) => {
		dispatch(getAgents({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(res => {
			callBack && callBack(res.payload);
			setModifiedAgentData(res.payload?.agents || []);
			setPage(res.payload?.page || 1);
			setSize(res.payload?.size || 5);
			setTotalPages(res.payload?.total_pages || 0);
			setTotalElements(res.payload?.total_elements || 0);
			setInSiglePageMode(true);
			setInShowAllMode(false);
		});
	};

	//get all agent without pagination
	const handleGetAllAgents = callBack => {
		dispatch(getAllAgents(getValues())).then(res => {
			callBack && callBack(res.payload);
			setModifiedAgentData(res.payload?.agents || []);
			setInSiglePageMode(false);
			setInShowAllMode(true);

			//get pagination data
			const { totalPages, totalElements } = getPaginationData(res.payload?.agents, size, page);
			//set pagination data
			setPage(page || 1);
			setSize(size || 25);
			setTotalPages(totalPages);
			setTotalElements(totalElements);
		});
	};

	console.log('rendered agent Report');
	return (
		<>
			<div className={classes.headContainer}>
				<h2
					style={{
						marginBottom: '10px',
						width: 'fit-content'
					}}
				>
					Filter
				</h2>

				{/* filter */}
				<FormProvider {...methods}>
					<PassengerFilterMenu
						inShowAllMode={inShowAllMode}
						handleGetAgents={handleGetAgents}
						handleGetAllAgents={handleGetAllAgents}
					/>
				</FormProvider>
			</div>
			<div className={classes.menubar}>
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

				{/* download */}
				<div className="downloadIcon">
					<GetApp
						className="cursor-pointer inside icon"
						style={{ margin: '0px', border: inDownload && '1px solid' }}
					/>

					{/* download options*/}
					<div className="downloadOptionContainer">
						<div className="indicator"></div>
						<div className="downloadOptions shadow-4">
							{/* download as Pdf */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{
									width: '150px',
									margin: '10px'
								}}
								onClick={() => {
									setInDownload(true);
									setDowloadPdf(true);
								}}
							>
								<FontAwesomeIcon icon={faFilePdf} />
								<b>Download PDF</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>

							{/* download as Excel */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{
									width: '160px',
									margin: '0px 10px 10px 10px'
								}}
								onClick={() => {
									setInDownload(true);
									setDowloadExcel(true);
								}}
							>
								<FontAwesomeIcon icon={faFileExcel} />
								<b>Download Excel</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>
						</div>
					</div>
				</div>

				{/* print */}
				<PrintIcon
					className="cursor-pointer inside icon"
					style={{ padding: '6px' }}
					onClick={() => setInPrint(true)}
				/>

				{/* show single page */}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{
						padding: '8px',
						border: inSiglePageMode && '1px solid'
					}}
					onClick={() => handleGetAgents()}
					icon={faBookOpen}
				/>

				{/* show all page */}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{
						padding: '8px',
						border: inShowAllMode && '1px solid'
					}}
					onClick={() => handleGetAllAgents()}
					icon={faScroll}
				/>

				{/* column select options */}
				<div className="columnSelectContainer">
					<ViewWeek
						id="insideClmSelect"
						className="cursor-pointer inside icon"
						style={{ margin: '0px', border: showClmSelectOption && '1px solid' }}
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

			<table id="table-to-xls" className="w-full">
				<div ref={componentRef} id="downloadPage">
					{/* each single page (table) */}
					{modifiedAgentData.map(agent => (
						<SinglePage
							classes={classes}
							generalData={generalData}
							reporTitle="Agent Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={agent}
							serialNumber={agent.page * agent.size - agent.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
						/>
					))}
				</div>
			</table>
		</>
	);
};
export default withRouter(PassengerReportsTable);
