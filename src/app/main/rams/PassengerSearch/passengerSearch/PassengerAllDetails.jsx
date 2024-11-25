/* eslint-disable no-undef */

import FuseLoading from '@fuse/core/FuseLoading';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import getUserData from 'src/app/@helpers/getUserData';
import PrintIcon from '@mui/icons-material/Print';
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
  PASSENGER_STATUS_STEP_DIAGRAM,
  SEARCH_PASSENGER_BY,
  TRAINING_BY_PASSENGER_ID,
  VISAENTRY_BY_PASSENGER_ID,
} from 'src/app/constant/constants';
import _ from 'lodash';
import PassengerDetailPrint from './PassengerDetailPrint';
import PassengerDetail from './PassengerDetail';
import { makeStyles } from '@mui/styles';

import StatusStepDetail from './StatusStepDetail';
import CallingEmbAttestationDetail from './CallingEmbAttestationDetail';
import CallingEmbAttestationDetailPrint from './CallingEmbAttestationDetailPrint';
import OfficeWorkDetailPrint from './OfficeWorkDetailPrint';
import OfficeWorkDetail from './OfficeWorkDetail';
import MusanedOkalaDetail from './MusanedOkalaDetail';
import MusanedOkalaDetailPrint from './MusanedOkalaDetailPrint';
import MofaDetailPrint from './MofaDetailPrint';
import MofaDetail from './MofaDetail';
import ManPowerDetail from './ManPowerDetail';
import ManPowerDetailPrint from './ManPowerDetailPrint';
import TrainingDetail from './TrainingDetail';
import TrainingDetailPrint from './TrainingDetailPrint';
import FlightDetail from './FlightDetail';
import FlightDetailPrint from './FlightDetailPrint';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary.dark,
    height: 'fit-content',
    paddingTop: '40px',
    paddingBottom: '40px',
    overflow: 'hidden',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '70px',
    marginBottom: '10px',
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '15px',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  passengerImgContainer: {
    marginTop: '60px',
    display: 'flex',
    alignItems: 'flex-start',
    '& .passengerImgHolder': {
      height: 'fit-content',
      width: 'fit-content',
      overflow: 'hidden',
      border: `1px solid ${
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      }`,
      '& > img': {
        height: '150px',
        width: '125px',
      },
    },
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
      textAlign: 'center',
    },
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
        color:
          theme.palette.type === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        fontWeight: 400,
        padding: '8px 5px',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        fontSize: '17px',
      },
      '& .value': {
        // color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
        fontWeight: 500,
        padding: '8px 5px',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        overflowWrap: 'break-word',
        fontSize: '18px',
        color: 'green',
      },
    },
    '& .rightRow': {
      '& .value': {
        color: 'red !important',
      },
    },
    '& .border': {
      borderLeft: `1px solid ${
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      }`,
    },
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
      color:
        theme.palette.type === 'dark'
          ? theme.palette.common.white
          : theme.palette.primary.dark,
      textAlign: 'center',
      position: 'absolute',
      top: '-15px',
      fontSize: '20px',
      fontStyle: 'italic',
      padding: '0px 5px',
      zIndex: 1,
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
          height: 'fit-content',
        },
        '& .leftRow, .rightRow': {
          display: 'flex',
          justifyContent: 'space-between',
          '& .label': {
            color:
              theme.palette.type === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            fontWeight: 400,
            minWidth: '50%',
            padding: '4px 0px',
            borderBottom: `1px solid ${theme.palette.primary.light}`,
          },
          '& .value': {
            color:
              theme.palette.type === 'light'
                ? theme.palette.common.black
                : theme.palette.common.white,
            fontWeight: 500,
            minWidth: '50%',
            padding: '4px 0px',
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            overflowWrap: 'break-word',
          },
        },
        '& .border': {
          borderLeft: `1px solid ${
            theme.palette.type === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.dark
          }`,
        },
      },
    },
    '& .blockContentAction': {
      bottom: '-13px',
      right: '20px',
      position: 'absolute',
      cursor: 'pointer',
      background: theme.palette.background.paper,
      color: 'green',
      border: `1px solid ${
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      }`,
      borderRadius: '50%',
      padding: '3px 5px',
      zIndex: 1,
    },
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
          theme.palette.type === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.dark
        }`,
        display: 'flex',
        justifyContent: 'center',
        '& h5': {
          top: '-10px',
          background: theme.palette.background.default,
          color:
            theme.palette.type === 'dark'
              ? theme.palette.common.white
              : theme.palette.primary.dark,
          padding: '0px 5px',
          zIndex: 1,
          position: 'absolute',
        },
      },
      '& .imgHolder': {
        border: `1px solid ${
          theme.palette.type === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.dark
        }`,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
}));

function PassengerAllDetails() {
  const classes = useStyles();
  const routeParams = useParams();
  const { passengerSearchId } = routeParams;

  const [pId, setpId] = useState(0);
  const [siteSetting, setSiteSetting] = useState({});

  const [medical, setMedical] = useState({});
  const [statusStep, setStatusStep] = useState({});
  const [country, setCountry] = useState('');

  const [passenger, setPassenger] = useState({});

  const [embassy, setEmbassy] = useState({});
  console.log('country', country);
  const [mofa, setMofa] = useState({});
  const [officeWork, setOfficeWork] = useState({});
  const [manPower, setManPower] = useState({});
  const [musanedOkala, setMusanedOkala] = useState({});
  const [flight, setFlight] = useState({});
  const [training, setTraining] = useState({});
  const [visaEntry, setVisaEntry] = useState({});

  const [callingEmbAttestation, setCallingEmbAttestation] = useState({});

  const [images, setImages] = useState([]);
  const [forms, setForms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const [inPrint, setInPrint] = useState(false);
  //print dom ref
  const componentRef = useRef();

  //printer action
  const printAction = useReactToPrint({
    content: () => componentRef.current,
  });

  //print handler
  const handlePrint = () => {
    setInPrint(true);
    printAction();

    // setInPrint(false);
  };

  //get site's logo & address
  useEffect(() => {
    const { authToken } = getUserData();
    axios
      .get(GET_SITESETTINGS, authToken)
      .then((res) => {
        setSiteSetting(res?.data?.general_settings[0] || {});
      })
      .catch(() => null);

    return () => sessionStorage.removeItem('passenger_search_key');
  }, []);

  //get paasenger id when searh keyord changed
  useEffect(() => {
    if (passengerSearchId) {
      setLoading(true);

      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(`${SEARCH_PASSENGER_BY}?keyword=${passengerSearchId}`, authTOKEN)
        .then((res) => {
          setpId(res?.data?.passengers[0]?.id || 0);
          setCountry(res?.data?.passengers[0]?.target_country?.name || 0);

          setLoading(false);
          if (res?.data?.passengers[0]?.id) {
            setNoData(false);
          } else {
            setNoData(true);
          }
        })
        .catch((error) => {
          setpId(0);
          setNoData(true);
          setLoading(false);
        });

      sessionStorage.setItem('passenger_search_key', passengerSearchId);
      window.dispatchEvent(
        new CustomEvent('storage', { detail: { name: 'passenger_search_key' } })
      );
    }
  }, [passengerSearchId]);

  //get all data
  useEffect(() => {
    if (pId) {
      setLoading(true);
      //passenger data
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      //Step data
      axios
        .get(`${PASSENGER_STATUS_STEP_DIAGRAM}${pId}`, authTOKEN)
        .then((res) => {
          // console.log('rexzxzxs', res.data.country);
          if (res?.data) {
            if (res?.data?.country === 'Malaysia') {
              setStatusStep({
                Medical: res.data?.medical,
                Calling_EMB_Attestation: res.data?.callingembattestation,
                E_Visa: res.data?.evisa,
                Training: res.data?.training,
                Manpower: res.data?.manpower,
                Flight: res.data?.flight,
              });
            } else if (res?.data?.country === 'Saudi Arabia') {
              setStatusStep({
                Medical: res.data?.medical,
                Mofa: res.data?.officework,
                Embassy: res.data?.embassy,
                Training: res.data?.training,
                Bmet: res.data?.bmet,
                Flight: res.data?.flight,
              });
            } else {
              setStatusStep({
                Office_Work: res.data?.officework,
                Medical: res.data?.medical,
                Mofa: res.data?.mofa,
                Musaned_Okala: res.data?.musanedokala,
                Calling_EMB_Attestation: res.data?.callingembattestation,
                Embassy: res.data?.embassy,
                Training: res.data?.training,
                Manpower: res.data?.manpower,
                Flight: res.data?.flight,
              });
            }

            setLoading(false);
          }
        })
        .catch(() => {
          setStatusStep({});
        });

      axios
        .get(`${GET_PASSENGER_BY_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setPassenger({ ...res.data });
            setImages((imgs) =>
              imgs.concat({
                order: 1,
                title: 'Passenger PP Pic',
                url: res.data.passport_pic,
                editurl: '/apps/passenger/passengers/',
                pid: pId,
              })
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setPassenger({});
        });

      //medical data

      axios
        .get(`${MEDICAL_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setMedical({ ...res.data });
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 2,
                  title: 'Medical Slip Pic',
                  url: res.data.slip_pic,
                  editurl: '/apps/medical-management/medical/',
                  pid: pId,
                },
                {
                  order: 3,
                  title: 'Medical Card Pic',
                  url: res.data.medical_card_pic,
                  editurl: '/apps/medical-management/medical/',
                  pid: pId,
                }
              )
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat(
              {
                order: 2,
                title: 'Medical Slip Pic',
                url: '',
                editurl: '/apps/medical-management/medical/',
                pid: pId,
              },
              {
                order: 3,
                title: 'Medical Card Pic',
                url: '',
                editurl: '/apps/medical-management/medical/',
                pid: pId,
              }
            )
          );
          setMedical({});
        });

      //visa entry data

      axios
        .get(`${VISAENTRY_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
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
        .get(`${MUSANEDOKALA_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setMusanedOkala({ ...res.data });
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 4,
                  title: 'Masaned Okala Doc1',
                  url: res.data.doc1_image,
                  editurl: '/apps/musanedOkala-management/musanedOkala/',
                  pid: pId,
                },
                {
                  order: 5,
                  title: 'Masaned Okala Doc2',
                  url: res.data.doc2_image,
                  editurl: '/apps/musanedOkala-management/musanedOkala/',
                  pid: pId,
                }
              )
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat(
              {
                order: 4,
                title: 'Masaned Okala Doc1',
                url: '',
                editurl: '/apps/musanedOkala-management/musanedOkala/',
                pid: pId,
              },
              {
                order: 5,
                title: 'Masaned Okala Doc2',
                url: '',
                editurl: '/apps/musanedOkala-management/musanedOkala/',
                pid: pId,
              }
            )
          );
          setMusanedOkala({});
        });

      //mfa data
      axios
        .get(`${MOFA_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
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
        .get(`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setCallingEmbAttestation({ ...res.data });
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 6,
                  title: 'Calling Doc',
                  url: res.data.calling_doc,
                  editurl:
                    '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                  pid: pId,
                },
                {
                  order: 7,
                  title: 'Calling Doc1',
                  url: res.data.doc1,
                  editurl:
                    '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                  pid: pId,
                },
                {
                  order: 8,
                  title: 'Calling Doc2',
                  url: res.data.doc2,
                  editurl:
                    '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                  pid: pId,
                }
              )
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat(
              {
                order: 6,
                title: 'Calling Doc',
                url: '',
                editurl:
                  '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                pid: pId,
              },
              {
                order: 7,
                title: 'Calling Doc1',
                url: '',
                editurl:
                  '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                pid: pId,
              },
              {
                order: 8,
                title: 'Calling Doc2',
                url: '',
                editurl:
                  '/apps/callingEmbAttestation-management/callingEmbAttestation/',
                pid: pId,
              }
            )
          );
          setCallingEmbAttestation({});
        });

      //office work data
      axios
        .get(`${OFFICEWORK_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setOfficeWork({ ...res.data });
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 9,
                  title: 'Office Work PC',
                  url: res.data.pc_image,
                  editurl: '/apps/officeWork-management/officeWork/',
                  pid: pId,
                },
                {
                  order: 10,
                  title: 'Office Work DL',
                  url: res.data.dl_image,
                  editurl: '/apps/officeWork-management/officeWork/',
                  pid: pId,
                },
                {
                  order: 11,
                  title: 'Office Work Doc1',
                  url: res.data.doc1_image,
                  editurl: '/apps/officeWork-management/officeWork/',
                  pid: pId,
                },
                {
                  order: 12,
                  title: 'Office Work Doc2',
                  url: res.data.doc2_image,
                  editurl: '/apps/officeWork-management/officeWork/',
                  pid: pId,
                }
              )
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat(
              {
                order: 9,
                title: 'Office Work PC',
                url: '',
                editurl: '/apps/officeWork-management/officeWork/',
                pid: pId,
              },
              {
                order: 10,
                title: 'Office Work DL',
                url: '',
                editurl: '/apps/officeWork-management/officeWork/',
                pid: pId,
              },
              {
                order: 11,
                title: 'Office Work Doc1',
                url: '',
                editurl: '/apps/officeWork-management/officeWork/',
                pid: pId,
              },
              {
                order: 12,
                title: 'Office Work Doc2',
                url: '',
                editurl: '/apps/officeWork-management/officeWork/',
                pid: pId,
              }
            )
          );
          setOfficeWork({});
        });

      //embassy data
      axios
        .get(`${EMBASSY_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          let embassyData = {};

          if (
            res.data?.visa_entry?.id &&
            res.data?.mofa?.id &&
            res.data?.embassy?.id
          ) {
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 13,
                  title: 'Embassy Old Visa',
                  url: res.data.old_visa_image,
                  editurl: '/apps/embassy-management/embassys/',
                  pid: pId,
                },
                {
                  order: 14,
                  title: 'Embassy Stamp Visa',
                  url: res.data.stamp_visa_image,
                  editurl: '/apps/embassy-management/embassys/',
                  pid: pId,
                }
              )
            );

            setLoading(false);

            const visa_entry = res.data?.visa_entry;
            const mofa = res.data?.mofa;
            const office_work = res.data?.officework;
            const musanedokala = res.data?.musanedokala;
            embassyData = {
              ...res.data.embassy,
              visa_number_readonly: visa_entry.visa_number,
              sponsor_id_no_readonly: visa_entry.sponsor_id_no,
              sponsor_name_english_readonly: visa_entry.sponsor_name_english,
              sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
              mofa_no_readonly: mofa.mofa_no,
              police_clearance_no_readonly: office_work.police_clearance_no,
              oakala_no_readonly: musanedokala.okala_no,
              driving_license_no_readonly: office_work.driving_license_no,
              musaned_okala_no_readonly: musanedokala.musaned_no,
              certificate_experience_no_readonly:
                office_work.certificate_experience,
            };
          } else {
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 13,
                  title: 'Embassy Old Visa',
                  url: '',
                  editurl: '/apps/embassy-management/embassys/',
                  pid: pId,
                },
                {
                  order: 14,
                  title: 'Embassy Stamp Visa',
                  url: '',
                  editurl: '/apps/embassy-management/embassys/',
                  pid: pId,
                }
              )
            );
            embassyData.push({});
          }

          setEmbassy({ ...embassyData });
        })
        .catch(() => {
          setEmbassy({});
        });

      //training data
      axios
        .get(`${TRAINING_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setTraining({ ...res.data });
            setImages((imgs) =>
              imgs.concat(
                {
                  order: 15,
                  title: 'Training Doc1',
                  url: res.data.doc1_image,
                  editurl: '/apps/training-management/training/',
                  pid: pId,
                },
                {
                  order: 16,
                  title: 'Training Certificate',
                  url: res.data.certificate_image,
                  editurl: '/apps/training-management/training/',
                  pid: pId,
                }
              )
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat(
              {
                order: 15,
                title: 'Training Doc1',
                url: '',
                editurl: '/apps/training-management/training/',
                pid: pId,
              },
              {
                order: 16,
                title: 'Training Certificate',
                url: '',
                editurl: '/apps/training-management/training/',
                pid: pId,
              }
            )
          );
          setTraining({});
        });

      //manpower data
      axios
        .get(`${MANPOWER_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setManPower({ ...res.data });
            setImages((imgs) =>
              imgs.concat({
                order: 17,
                title: 'Manpower Smart Card',
                url: res.data.smart_card_image,
                editurl: '/apps/manPower-management/manPower/',
                pid: pId,
              })
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat({
              order: 17,
              title: 'Manpower Smart Card',
              url: '',
              editurl: '/apps/manPower-management/manPower/',
              pid: pId,
            })
          );
          setManPower({});
        });

      //flight data

      axios
        .get(`${FLIGHT_BY_PASSENGER_ID}${pId}`, authTOKEN)
        .then((res) => {
          if (res?.data?.id) {
            setFlight({ ...res.data });
            setImages((imgs) =>
              imgs.concat({
                order: 18,
                title: 'Flight Ticket',
                url: res.data.ticket_file,
                editurl: '/apps/flight-management/flight/',
                pid: pId,
              })
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setImages((imgs) =>
            imgs.concat({
              order: 18,
              title: 'Flight Ticket',
              url: '',
              editurl: '/apps/flight-management/flight/',
              pid: pId,
            })
          );
          setFlight({});
        });
    } else {
      setPassenger({});

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

      setCallingEmbAttestation({});
      setImages([]);
    }
  }, [pId]);

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <div>
      <div>
        {noData ? (
          ''
        ) : (
          <PrintIcon
            fontSize='large'
            className='cursor-pointer inside icon'
            style={{
              margin: '30px',
              color: 'blue',
              border: inPrint && '1px solid blue',
              borderRadius: '30px',
              padding: '2px',
            }}
            onClick={() => {
              sessionStorage.setItem(
                'passengerAllDetailsPrint',
                'passengerAllDetailsPrint'
              );
              handlePrint();
            }}
          />
        )}

        <div className={`${classes.container}`}>
          <div className='flex justify-between items-start flex-row md:flex-row'>
            <div className='w-full md:w-1/4'></div>

            <div className='w-full md:w-1/2'>
              <div className={classes.logoContainer}>
                <img
                  src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`}
                />
              </div>
              <div className={classes.addressContainer}>
                <p>{siteSetting?.address || ''}</p>
              </div>
            </div>

            <div
              className={`w-full md:w-1/4 justify-center md:justify-start mb-20 md:mt-0 ${classes.passengerImgContainer}`}>
              <div className='passengerImgHolder rounded-2'>
                {passenger.passenger_pic ? (
                  <img src={`${BASE_URL}${passenger.passenger_pic}`} />
                ) : (
                  <img src='/assets/images/userImg/noImageFound.jpeg' />
                )}
              </div>
            </div>
          </div>

          {noData ? (
            <div
              className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
              <h1>no data found</h1>
            </div>
          ) : (
            <>
              {_.isEmpty(passenger) || (
                <div
                  className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.currentStsContainer}`}>
                  <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                    <i className='label text-xs md:text-sm'>Passenger ID :</i>
                    <b className='value text-xs md:text-sm'>
                      {passenger?.passenger_id || ''}
                    </b>
                  </div>
                  <div className='border hidden md:block'></div>
                  <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                    <i className='label text-xs md:text-sm'>Current Status :</i>
                    {sessionStorage.setItem(
                      'passengerCurrentStatus',
                      passenger?.current_status?.name
                    )}

                    <b className='value text-xs md:text-sm'>
                      {passenger?.current_status?.name || ''}
                    </b>
                  </div>
                </div>
              )}
              {
                <StatusStepDetail
                  classes={classes}
                  data={statusStep}
                  completed={Object?.entries(statusStep)
                    .filter(([_, value]) => value)
                    .map(([index]) => Object.keys(statusStep).indexOf(index))}
                  pid={pId}
                />
              }

              {_.isEmpty(passenger) || (
                <PassengerDetail classes={classes} data={passenger} pid={pId} />
              )}
              {
                <OfficeWorkDetail
                  classes={classes}
                  data={officeWork}
                  pid={pId}
                />
              }
              {/* {<MedicalDetail classes={classes} data={medical} pid={pId} />} */}

              {/* <EmbassyDetail classes={classes} data={embassy} pid={pId} /> */}

              {country === 'Malaysia' && (
                <CallingEmbAttestationDetail
                  classes={classes}
                  data={callingEmbAttestation}
                  pid={pId}
                />
              )}
              {/* 
              {country === 'Saudi Arabia' && (
                <MusanedOkalaDetail
                  classes={classes}
                  data={musanedOkala}
                  pid={pId}
                />
              )} */}

              {
                <MusanedOkalaDetail
                  classes={classes}
                  data={musanedOkala}
                  pid={pId}
                />
              }
              {<MofaDetail classes={classes} data={mofa} pid={pId} />}
              {<ManPowerDetail classes={classes} data={manPower} pid={pId} />}
              {<TrainingDetail classes={classes} data={training} pid={pId} />}
              {<FlightDetail classes={classes} data={flight} pid={pId} />}

              {/* {country === 'Saudi Arabia' && (
                <EmbassyDetail classes={classes} data={embassy} pid={pId} />
              )} */}

              {/* {country === 'Saudi Arabia' && (
                <VisaEntryDetail classes={classes} data={visaEntry} />
              )}
              {country === 'Saudi Arabia' && (
                <MusanedOkalaDetail
                  classes={classes}
                  data={musanedOkala}
                  pid={pId}
                />
              )}
              {country === 'Saudi Arabia' && (
                <MofaDetail classes={classes} data={mofa} pid={pId} />
              )}

              {
                <OfficeWorkDetail
                  classes={classes}
                  data={officeWork}
                  pid={pId}
                />
              }


             
              {<ManPowerDetail classes={classes} data={manPower} pid={pId} />}
              {
                <Forms
                  classes={classes}
                  pid={passengerSearchId}
                  id={pId}
                  data={passenger}
                />
              }
              {_.isEmpty(images) || (
                <Images classes={classes} images={images} />
              )} */}
              {/* NOT NEED */}
              {/* {_.isEmpty(forms) || <Forms classes={classes} pid={pId} />} */}
            </>
          )}
        </div>

        {/* Print Action  */}

        <div className='w-full' style={{ display: 'none' }}>
          <div className={`${classes.pageContainer}  `} ref={componentRef}>
            <div
              className='flex justify-between items-start flex-col md:flex-row'
              style={{ margin: '50px' }}>
              <div className='w-full md:w-1/4'></div>

              <div className='w-full md:w-1/2'>
                <div className={classes.logoContainer}>
                  <img
                    src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`}
                  />
                </div>
                <div className={classes.addressContainer}>
                  <pre>{siteSetting?.address || ''}</pre>
                </div>
              </div>

              <div
                className={`w-full md:w-1/4 justify-center md:justify-start mt-20 md:mt-0 ${classes.passengerImgContainer}`}>
                <div className='passengerImgHolder rounded-2'>
                  <img src={`${BASE_URL}${passenger.passenger_pic}`} />
                </div>
              </div>
            </div>

            {noData ? (
              <div
                className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
                <h1>no data found</h1>
              </div>
            ) : (
              <>
                {_.isEmpty(passenger) || (
                  <div
                    className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.currentStsContainer}`}
                    style={{ margin: '30px' }}>
                    <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                      <i className='label text-xs md:text-sm'>Passenger ID :</i>
                      <b className='value text-xs md:text-sm'>
                        {passenger?.passenger_id || ''}
                      </b>
                    </div>
                    <div className='border hidden md:block'></div>
                    <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                      <i className='label text-xs md:text-sm'>
                        Current Status :
                      </i>
                      {sessionStorage.setItem(
                        'passengerCurrentStatus',
                        passenger?.current_status?.name
                      )}

                      <b className='value text-xs md:text-sm'>
                        {passenger?.current_status?.name || ''}
                      </b>
                    </div>
                  </div>
                )}

                {_.isEmpty(passenger) || (
                  <PassengerDetailPrint
                    classes={classes}
                    data={passenger}
                    pid={pId}
                  />
                )}
                {/* {_.isEmpty(medical) || (
                  <MedicalDetailPrint
                    classes={classes}
                    data={medical}
                    pid={pId}
                  />
                )} */}
                {_.isEmpty(callingEmbAttestation) || (
                  <CallingEmbAttestationDetailPrint
                    classes={classes}
                    data={callingEmbAttestation}
                    pid={pId}
                  />
                )}

                {_.isEmpty(officeWork) || (
                  <OfficeWorkDetailPrint
                    classes={classes}
                    data={officeWork}
                    pid={pId}
                  />
                )}

                {_.isEmpty(musanedOkala) || (
                  <MusanedOkalaDetailPrint
                    classes={classes}
                    data={musanedOkala}
                    pid={pId}
                  />
                )}

                {_.isEmpty(mofa) || (
                  <MofaDetailPrint classes={classes} data={mofa} pid={pId} />
                )}

                {_.isEmpty(manPower) || (
                  <ManPowerDetailPrint
                    classes={classes}
                    data={manPower}
                    pid={pId}
                  />
                )}

                {_.isEmpty(training) || (
                  <TrainingDetailPrint
                    classes={classes}
                    data={training}
                    pid={pId}
                  />
                )}

                {_.isEmpty(flight) || (
                  <FlightDetailPrint
                    classes={classes}
                    data={flight}
                    pid={pId}
                  />
                )}

                {/* {_.isEmpty(embassy) || (
                  <EmbassyDetailPrint
                    classes={classes}
                    data={embassy}
                    pid={pId}
                  />
                )} */}
                {/* {_.isEmpty(visaEntry) || (
                  <VisaEntryDetailPrint classes={classes} data={visaEntry} />
                )} */}
                {/* {_.isEmpty(musanedOkala) || (
                  <MusanedOkalaDetailPrint
                    classes={classes}
                    data={musanedOkala}
                    pid={pId}
                  />
                )} */}

                {/* {_.isEmpty(officeWork) || (
                  <OfficeWorkDetailPrint
                    classes={classes}
                    data={officeWork}
                    pid={pId}
                  />
                )} */}

                {/* {_.isEmpty(manPower) || (
                  <ManPowerDetailPrint
                    classes={classes}
                    data={manPower}
                    pid={pId}
                  />
                )} */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerAllDetails;
