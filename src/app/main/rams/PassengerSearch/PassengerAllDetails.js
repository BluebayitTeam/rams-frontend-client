import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import getUserData from 'app/@helpers/getUserData';
import {
	BASE_URL,
	CALLINGEMBATTESTATION_BY_PASSENGER_ID,
	EMBASSY_BY_PASSENGER_ID,
	FLIGHT_BY_PASSENGER_ID,
	GET_PASSENGER_BY_ID,
	GET_SITESETTINGS,
	MANPOWER_BY_PASSENGER_ID,
	MEDICAL_BY_PASSENGER_ID,
	MOFA_BY_PASSENGER_ID,
	MUSANEDOKALA_BY_PASSENGER_ID,
	OFFICEWORK_BY_PASSENGER_ID,
	SEARCH_PASSENGER_BY,
	TRAINING_BY_PASSENGER_ID,
	VISAENTRY_BY_PASSENGER_ID
} from 'app/constant/constants';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CallingEmbAttestationDetail from './CallingEmbAttestationDetail';
import EmbassyDetail from './EmbassyDetail';
import FlightDetail from './FlightDetail';
import Images from './Images';
import ManPowerDetail from './ManPowerDetail';
import MedicalDetail from './MedicalDetail';
import MofaDetail from './MofaDetail';
import MusanedOkalaDetail from './MusanedOkalaDetail';
import OfficeWorkDetail from './OfficeWorkDetail';
import PassengerDetail from './PassengerDetail';
import TrainingDetail from './TrainingDetail';
import VisaEntryDetail from './VisaEntryDetail';

const useStyles = makeStyles(theme => ({
	container: {
		background: theme.palette.background.default,
		color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
		height: 'fit-content',
		paddingTop: '40px',
		paddingBottom: '40px',
		overflow: 'hidden'
	},
	logoContainer: {
		display: 'flex',
		justifyContent: 'center',
		height: '70px',
		marginBottom: '10px'
	},
	addressContainer: {
		display: 'flex',
		justifyContent: 'center',
		fontSize: '15px',
		fontStyle: 'italic'
	},
	passengerImgContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		'& .passengerImgHolder': {
			height: 'fit-content',
			width: 'fit-content',
			overflow: 'hidden',
			border: `1px solid ${
				theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
			}`,
			'& > img': {
				//usesed passport size hight by width
				height: '150px',
				width: '125px'
			}
		}
	},
	noData: {
		marginTop: '60px',
		display: 'flex',
		justifyContent: 'center',
		height: 'fit-content',
		border: `1px solid red`,
		alignItems: 'center',
		'& h1': {
			color: 'red',
			textAlign: 'center'
		}
	},
	currentStsContainer: {
		marginTop: '60px',
		display: 'flex',
		justifyContent: 'space-evenly',
		height: 'fit-content',
		border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
		alignItems: 'center',
		'& .leftRow, .rightRow': {
			display: 'flex',
			justifyContent: 'center',
			'& .label': {
				color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
				fontWeight: 400,
				padding: '8px 5px',
				borderBottom: `1px solid ${theme.palette.primary.light}`,
				fontSize: '17px'
			},
			'& .value': {
				// color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
				fontWeight: 500,
				padding: '8px 5px',
				borderBottom: `1px solid ${theme.palette.primary.light}`,
				overflowWrap: 'break-word',
				fontSize: '18px',
				color: 'green'
			}
		},
		'& .rightRow': {
			'& .value': {
				color: 'red !important'
			}
		},
		'& .border': {
			borderLeft: `1px solid ${
				theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
			}`
		}
	},
	blockContainer: {
		height: 'fit-content',
		position: 'relative',
		border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& .blockContentName': {
			height: '30px',
			background: theme.palette.background.default,
			color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
			textAlign: 'center',
			position: 'absolute',
			top: '-15px',
			fontSize: '20px',
			fontStyle: 'italic',
			padding: '0px 5px',
			zIndex: 1
		},
		'& .blockContentHolder': {
			marginTop: '30px',
			marginBottom: '30px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			'& .container': {
				display: 'flex',
				justifyContent: 'space-between',
				'& .h-fit': {
					height: 'fit-content'
				},
				'& .leftRow, .rightRow': {
					display: 'flex',
					justifyContent: 'space-between',
					'& .label': {
						color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
						fontWeight: 400,
						minWidth: '50%',
						padding: '4px 0px',
						borderBottom: `1px solid ${theme.palette.primary.light}`
					},
					'& .value': {
						color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
						fontWeight: 500,
						minWidth: '50%',
						padding: '4px 0px',
						borderBottom: `1px solid ${theme.palette.primary.light}`,
						overflowWrap: 'break-word'
					}
				},
				'& .border': {
					borderLeft: `1px solid ${
						theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
					}`
				}
			}
		},
		'& .blockContentAction': {
			bottom: '-13px',
			right: '20px',
			position: 'absolute',
			cursor: 'pointer',
			background: theme.palette.background.paper,
			color: 'green',
			border: `1px solid ${
				theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
			}`,
			borderRadius: '50%',
			padding: '3px 5px',
			zIndex: 1
		}
	},
	allImgContainer: {
		border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
		height: 'fit-content',
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		padding: '15px',
		'& .imgContainer': {
			padding: '15px',
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			'& .imgTitle': {
				minHeight: '15px',
				position: 'relative',
				borderTop: `1px solid ${
					theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
				}`,
				display: 'flex',
				justifyContent: 'center',
				'& h5': {
					top: '-10px',
					background: theme.palette.background.default,
					color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
					padding: '0px 5px',
					zIndex: 1,
					position: 'absolute'
				}
			},
			'& .imgHolder': {
				border: `1px solid ${
					theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
				}`,
				overflow: 'hidden',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}
		}
	}
}));

function PassengerAllDetails() {
	const classes = useStyles();

	const { searchKeyword } = useParams();

	const [pId, setpId] = useState(0);
	const [siteSetting, setSiteSetting] = useState({});

	const [medical, setMedical] = useState({});
	const [embassy, setEmbassy] = useState({});
	const [mofa, setMofa] = useState({});
	const [officeWork, setOfficeWork] = useState({});
	const [manPower, setManPower] = useState({});
	const [musanedOkala, setMusanedOkala] = useState({});
	const [flight, setFlight] = useState({});
	const [training, setTraining] = useState({});
	const [visaEntry, setVisaEntry] = useState({});
	const [passenger, setPassenger] = useState({});
	const [callingEmbAttestation, setCallingEmbAttestation] = useState({});

	const [images, setImages] = useState([]);

	const [loading, setLoading] = useState(true);
	const [noData, setNoData] = useState(false);

	//get site's logo & address
	useEffect(() => {
		const { authToken } = getUserData();
		axios
			.get(GET_SITESETTINGS, authToken)
			.then(res => {
				console.log('GET_SITESETTINGS_Res', res?.data?.general_settings[0] || {});
				setSiteSetting(res?.data?.general_settings[0] || {});
			})
			.catch(() => null);

		return () => sessionStorage.removeItem('passenger_search_key');
	}, []);

	//get paasenger id when searh keyord changed
	useEffect(() => {
		if (searchKeyword) {
			setLoading(true);
			console.log('searchKeyword', searchKeyword);
			axios
				.get(`${SEARCH_PASSENGER_BY}?keyword=${searchKeyword}`)
				.then(res => {
					console.log('SEARCH_PASSENGER_BY_RES', res);
					setpId(res?.data?.passengers[0]?.id || 0);
					setLoading(false);
					if (res?.data?.passengers[0]?.id) {
						setNoData(false);
					} else {
						setNoData(true);
					}
				})
				.catch(() => {
					setpId(0);
					setNoData(true);
					setLoading(false);
				});

			sessionStorage.setItem('passenger_search_key', searchKeyword);
			window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'passenger_search_key' } }));
		}
	}, [searchKeyword]);

	//get all data
	useEffect(() => {
		if (pId) {
			setLoading(true);
			setImages([]);

			//passenger data
			axios
				.get(`${GET_PASSENGER_BY_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setPassenger({ ...res.data });
						setImages(imgs =>
							imgs.concat({ order: 1, title: 'Passenger PP Pic', url: res.data.passport_pic })
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setPassenger({});
				});

			//medical data
			axios
				.get(`${MEDICAL_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setMedical({ ...res.data });
						setImages(imgs =>
							imgs.concat(
								{ order: 2, title: 'Medical Slip Pic', url: res.data.slip_pic },
								{ order: 3, title: 'Medical Card Pic', url: res.data.medical_card_pic }
							)
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setMedical({});
				});

			//visa entry data
			axios
				.get(`${VISAENTRY_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setVisaEntry({ ...res.data });
						setLoading(false);
					}
				})
				.catch(() => {
					setVisaEntry({});
				});

			//masaned okala data
			axios
				.get(`${MUSANEDOKALA_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setMusanedOkala({ ...res.data });
						setImages(imgs =>
							imgs.concat(
								{ order: 4, title: 'Masaned Okala Doc1', url: res.data.doc1_image },
								{ order: 5, title: 'Masaned Okala Doc2', url: res.data.doc2_image }
							)
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setMusanedOkala({});
				});

			//mfa data
			axios
				.get(`${MOFA_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setMofa({ ...res.data });
						setLoading(false);
					}
				})
				.catch(() => {
					setMofa({});
				});

			//callingEmbAttestation data
			axios
				.get(`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setCallingEmbAttestation({ ...res.data });
						setImages(imgs =>
							imgs.concat(
								{ order: 6, title: 'Calling Doc', url: res.data.calling_doc },
								{ order: 7, title: 'Calling Doc1', url: res.data.doc1 },
								{ order: 8, title: 'Calling Doc2', url: res.data.doc2 }
							)
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setCallingEmbAttestation({});
				});

			//office work data
			axios
				.get(`${OFFICEWORK_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setOfficeWork({ ...res.data });
						setImages(imgs =>
							imgs.concat(
								{ order: 9, title: 'Office Work PC', url: res.data.pc_image },
								{ order: 10, title: 'Office Work DL', url: res.data.dl_image },
								{ order: 11, title: 'Office Work Doc1', url: res.data.doc1_image },
								{ order: 12, title: 'Office Work Doc2', url: res.data.doc2_image }
							)
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setOfficeWork({});
				});

			//embassy data
			axios
				.get(`${EMBASSY_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					let embassyData = {};

					if (res.data?.visa_entry?.id && res.data?.mofa?.id && res.data?.embassy?.id) {
						setImages(imgs =>
							imgs.concat(
								{ order: 13, title: 'Embassy Old Visa', url: res.data.old_visa_image },
								{ order: 14, title: 'Embassy Stamp Visa', url: res.data.stamp_visa_image }
							)
						);

						setLoading(false);

						const visa_entry = res.data?.visa_entry;
						const mofa = res.data?.mofa;
						embassyData = {
							...res.data.embassy,
							visa_number_readonly: visa_entry.visa_number,
							sponsor_id_no_readonly: visa_entry.sponsor_id_no,
							sponsor_name_english_readonly: visa_entry.sponsor_name_english,
							sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
							mofa_no_readonly: mofa.mofa_no
						};
					} else {
						embassyData.push({});
					}

					setEmbassy({ ...embassyData });
				})
				.catch(() => {
					setEmbassy({});
				});

			//training data
			axios
				.get(`${TRAINING_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setTraining({ ...res.data });
						setImages(imgs =>
							imgs.concat(
								{ order: 15, title: 'Training Doc1', url: res.data.doc1_image },
								{ order: 16, title: 'Training Certificate', url: res.data.certificate_image }
							)
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setTraining({});
				});

			//manpower data
			axios
				.get(`${MANPOWER_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setManPower({ ...res.data });
						setImages(imgs =>
							imgs.concat({ order: 17, title: 'Manpower Smart Card', url: res.data.smart_card_image })
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setManPower({});
				});

			//flight data
			axios
				.get(`${FLIGHT_BY_PASSENGER_ID}${pId}`)
				.then(res => {
					if (res?.data?.id) {
						setFlight({ ...res.data });
						setImages(imgs =>
							imgs.concat({ order: 18, title: 'Flight Ticket', url: res.data.ticket_image })
						);
						setLoading(false);
					}
				})
				.catch(() => {
					setFlight({});
				});
		} else {
			setLoading(false);
			setMedical({});
			setOfficeWork({});
			setEmbassy({});
			setMofa({});
			setManPower({});
			setMusanedOkala({});
			setTraining({});
			setFlight({});
			setVisaEntry({});
			setPassenger({});
			setCallingEmbAttestation({});
			setImages([]);
		}
	}, [pId]);

	//show loading when data fething
	if (loading) {
		return <FuseLoading />;
	}

	//content
	return (
		<div>
			<div className={`${classes.container}`}>
				<div className="flex justify-between items-start flex-col md:flex-row">
					<div className="w-full md:w-1/4"></div>

					<div className="w-full md:w-1/2">
						<div className={classes.logoContainer}>
							<img src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`} />
						</div>
						<div className={classes.addressContainer}>
							<pre>{siteSetting?.address || ''}</pre>
						</div>
					</div>

					<div
						className={`w-full md:w-1/4 justify-center md:justify-start mt-20 md:mt-0 ${classes.passengerImgContainer}`}
					>
						<div className="passengerImgHolder rounded-2">
							<img src={`${BASE_URL}${passenger.passenger_pic}`} />
						</div>
					</div>
				</div>

				{noData ? (
					<div className={`flex-col md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
						<h1>no data found</h1>
					</div>
				) : (
					<>
						{_.isEmpty(passenger) || (
							<div
								className={`flex-col md:flex-row rounded-4 mx-0 md:mx-40 ${classes.currentStsContainer}`}
							>
								<div className="leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16">
									<i className="label text-xs md:text-sm">Passenger ID :</i>
									<b className="value text-xs md:text-sm">{passenger?.passenger_id || ''}</b>
								</div>
								<div className="border hidden md:block"></div>
								<div className="rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16">
									<i className="label text-xs md:text-sm">Current Status :</i>
									<b className="value text-xs md:text-sm">{passenger?.current_status?.name || ''}</b>
								</div>
							</div>
						)}

						{_.isEmpty(passenger) || <PassengerDetail classes={classes} data={passenger} pid={pId} />}
						{_.isEmpty(medical) || <MedicalDetail classes={classes} data={medical} pid={pId} />}
						{_.isEmpty(visaEntry) || <VisaEntryDetail classes={classes} data={visaEntry} />}
						{_.isEmpty(musanedOkala) || (
							<MusanedOkalaDetail classes={classes} data={musanedOkala} pid={pId} />
						)}
						{_.isEmpty(mofa) || <MofaDetail classes={classes} data={mofa} pid={pId} />}
						{_.isEmpty(callingEmbAttestation) || (
							<CallingEmbAttestationDetail classes={classes} data={callingEmbAttestation} pid={pId} />
						)}
						{_.isEmpty(officeWork) || <OfficeWorkDetail classes={classes} data={officeWork} pid={pId} />}
						{_.isEmpty(embassy) || <EmbassyDetail classes={classes} data={embassy} pid={pId} />}
						{_.isEmpty(training) || <TrainingDetail classes={classes} data={training} pid={pId} />}
						{_.isEmpty(manPower) || <ManPowerDetail classes={classes} data={manPower} pid={pId} />}
						{_.isEmpty(flight) || <FlightDetail classes={classes} data={flight} pid={pId} />}

						{_.isEmpty(images) || <Images classes={classes} images={images} />}
					</>
				)}
			</div>
		</div>
	);
}

export default PassengerAllDetails;
