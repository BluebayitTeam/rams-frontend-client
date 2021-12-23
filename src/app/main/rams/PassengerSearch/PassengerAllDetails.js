import { makeStyles } from '@material-ui/core/styles';
import getUserData from 'app/@helpers/getUserData';
import { BASE_URL, EMBASSY_BY_PASSENGER_ID, FLIGHT_BY_PASSENGER_ID, GET_PASSENGER_BY_ID, GET_SITESETTINGS, MANPOWER_BY_PASSENGER_ID, MEDICAL_BY_PASSENGER_ID, MOFA_BY_PASSENGER_ID, MUSANEDOKALA_BY_PASSENGER_ID, OFFICEWORK_BY_PASSENGER_ID, SEARCH_PASSENGER_BY, TRAINING_BY_PASSENGER_ID, VISAENTRY_BY_PASSENGER_ID } from 'app/constant/constants';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EmbassyDetail from './EmbassyDetail';
import FlightDetail from './FlightDetail';
import ManPowerDetail from './ManPowerDetail';
import MedicalDetail from './MedicalDetail';
import MofaDetail from './MofaDetail';
import MusanedOkalaDetail from './MusanedOkalaDetail';
import OfficeWorkDetail from './OfficeWorkDetail';
import PassengerDetail from './PassengerDetail';
import TrainingDetail from './TrainingDetail';
import VisaEntryDetail from './VisaEntryDetail';

const useStyles = makeStyles(theme => {
    console.log("theme", theme)
    return ({
        container: {
            background: theme.palette.background.default,
            color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.primary.dark,
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
            fontStyle: 'italic'
        },
        blockContainer: {
            height: 'fit-content',
            position: 'relative',
            border: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& .blockContentName': {
                height: '30px',
                background: theme.palette.background.default,
                color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.primary.dark,
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
                    '& .leftRow, .rightRow': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        '& .label': {
                            color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
                            fontWeight: 400,
                            minWidth: '50%',
                            padding: '4px 0px',
                            borderBottom: `1px solid ${theme.palette.primary.light}`,
                        },
                        '& .value': {
                            color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
                            fontWeight: 500,
                            minWidth: '50%',
                            padding: '4px 0px',
                            borderBottom: `1px solid ${theme.palette.primary.light}`,
                            overflowWrap: 'break-word',
                        }
                    },
                    '& .border': {
                        borderLeft: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
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
                border: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
                borderRadius: '50%',
                padding: '3px 5px',
                zIndex: 1,
            }
        },
    }
    )
});

function PassengerAllDetails() {

    const classes = useStyles();

    const [pId, setpId] = useState(0)
    const [siteSetting, setSiteSetting] = useState({})

    const [medical, setMedical] = useState({})
    const [embassy, setEmbassy] = useState({})
    const [mofa, setMofa] = useState({})
    const [officeWork, setOfficeWork] = useState({})
    const [manPower, setManPower] = useState({})
    const [musanedOkala, setMusanedOkala] = useState({})
    const [flight, setFlight] = useState({})
    const [training, setTraining] = useState({})
    const [visaEntry, setVisaEntry] = useState({})
    const [passenger, setPassenger] = useState({})

    const { searchKeyword } = useParams()

    //get site's logo & address
    useEffect(() => {
        const { authToken } = getUserData()
        axios.get(GET_SITESETTINGS, authToken).then(res => {
            console.log("GET_SITESETTINGS_Res", res?.data?.general_settings[0] || {})
            setSiteSetting(res?.data?.general_settings[0] || {})
        }).catch(() => null)

        return () => sessionStorage.removeItem('passenger_search_key')
    }, [])

    //get paasenger id when searh keyord changed
    useEffect(() => {
        if (searchKeyword) {
            console.log("searchKeyword", searchKeyword)
            axios.get(`${SEARCH_PASSENGER_BY}?keyword=${searchKeyword}`).then(res => {
                console.log("SEARCH_PASSENGER_BY_RES", res)
                setpId(res?.data?.passengers[0]?.id || 0)
            }).catch(() => {
                setpId(0)
            })

            sessionStorage.setItem('passenger_search_key', searchKeyword)
            window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'passenger_search_key' } }))
        }
    }, [searchKeyword])

    //get all data
    useEffect(() => {
        if (pId) {
            //medical data
            axios.get(`${MEDICAL_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setMedical({ ...res.data })
            }).catch(() => setMedical({}))

            //office work data
            axios.get(`${OFFICEWORK_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setOfficeWork({ ...res.data })
            }).catch(() => setOfficeWork({}))

            //mfa data
            axios.get(`${MOFA_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setMofa({ ...res.data })
            }).catch(() => setMofa({}))

            //manpower data
            axios.get(`${MANPOWER_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setManPower({ ...res.data })
            }).catch(() => setManPower({}))

            //masaned okala data
            axios.get(`${MUSANEDOKALA_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setMusanedOkala({ ...res.data })
            }).catch(() => setMusanedOkala({}))

            //training data
            axios.get(`${TRAINING_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setTraining({ ...res.data })
            }).catch(() => setTraining({}))

            //flight data
            axios.get(`${FLIGHT_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setFlight({ ...res.data })
            }).catch(() => setFlight({}))

            //visa entry data
            axios.get(`${VISAENTRY_BY_PASSENGER_ID}${pId}`).then(res => {
                res?.data?.id && setVisaEntry({ ...res.data })
            }).catch(() => setVisaEntry({}))

            //passenger data
            axios.get(`${GET_PASSENGER_BY_ID}${pId}`).then(res => {
                res?.data?.id && setPassenger({ ...res.data })
            }).catch(() => setPassenger({}))

            //embassy data
            axios.get(`${EMBASSY_BY_PASSENGER_ID}${pId}`).then(res => {

                let embassyData = {}

                if (res.data?.visa_entry?.id && res.data?.mofa?.id && res.data?.embassy?.id) {
                    const visa_entry = res.data?.visa_entry
                    const mofa = res.data?.mofa
                    embassyData = {
                        ...res.data.embassy,
                        visa_number_readonly: visa_entry.visa_number,
                        sponsor_id_no_readonly: visa_entry.sponsor_id_no,
                        sponsor_name_english_readonly: visa_entry.sponsor_name_english,
                        sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
                        mofa_no_readonly: mofa.mofa_no,
                    }
                }
                else {
                    embassyData.push({})
                }

                setEmbassy({ ...embassyData })
            }).catch(() => {
                setEmbassy({})
            })
        }
        else {
            setMedical({})
            setOfficeWork({})
            setEmbassy({})
            setMofa({})
            setManPower({})
            setMusanedOkala({})
            setTraining({})
            setFlight({})
            setVisaEntry({})
            setPassenger({})
        }
    }, [pId])


    return (
        <div>
            <div className={`${classes.container}`}>
                <div className={classes.logoContainer}>
                    <img src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`} />
                </div>
                <div className={classes.addressContainer}>
                    <pre>{siteSetting?.address || ""}</pre>
                </div>


                {_.isEmpty(passenger) || <PassengerDetail classes={classes} data={passenger} pid={pId} />}
                {_.isEmpty(medical) || <MedicalDetail classes={classes} data={medical} pid={pId} />}
                {_.isEmpty(visaEntry) || <VisaEntryDetail classes={classes} data={visaEntry} />}
                {_.isEmpty(musanedOkala) || <MusanedOkalaDetail classes={classes} data={musanedOkala} pid={pId} />}
                {_.isEmpty(mofa) || <MofaDetail classes={classes} data={mofa} pid={pId} />}
                {_.isEmpty(officeWork) || <OfficeWorkDetail classes={classes} data={officeWork} pid={pId} />}
                {_.isEmpty(embassy) || <EmbassyDetail classes={classes} data={embassy} pid={pId} />}
                {_.isEmpty(training) || <TrainingDetail classes={classes} data={training} pid={pId} />}
                {_.isEmpty(manPower) || <ManPowerDetail classes={classes} data={manPower} pid={pId} />}
                {_.isEmpty(flight) || <FlightDetail classes={classes} data={flight} pid={pId} />}


            </div>
        </div >
    )
}

export default PassengerAllDetails























// import FuseLoading from '@fuse/core/FuseLoading';
// import { makeStyles } from '@material-ui/core/styles';
// import getUserData from 'app/@helpers/getUserData';
// import { BASE_URL, EMBASSY_BY_PASSENGER_ID, FLIGHT_BY_PASSENGER_ID, GET_PASSENGER_BY_ID, GET_SITESETTINGS, MANPOWER_BY_PASSENGER_ID, MEDICAL_BY_PASSENGER_ID, MOFA_BY_PASSENGER_ID, MUSANEDOKALA_BY_PASSENGER_ID, OFFICEWORK_BY_PASSENGER_ID, SEARCH_PASSENGER_BY, TRAINING_BY_PASSENGER_ID, VISAENTRY_BY_PASSENGER_ID } from 'app/constant/constants';
// import axios from 'axios';
// import _ from 'lodash';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import EmbassyDetail from './EmbassyDetail';
// import FlightDetail from './FlightDetail';
// import ManPowerDetail from './ManPowerDetail';
// import MedicalDetail from './MedicalDetail';
// import MofaDetail from './MofaDetail';
// import MusanedOkalaDetail from './MusanedOkalaDetail';
// import OfficeWorkDetail from './OfficeWorkDetail';
// import PassengerDetail from './PassengerDetail';
// import TrainingDetail from './TrainingDetail';
// import VisaEntryDetail from './VisaEntryDetail';

// const useStyles = makeStyles(theme => {
//     console.log("theme", theme)
//     return ({
//         container: {
//             background: theme.palette.background.default,
//             color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.primary.dark,
//             height: 'fit-content',
//             paddingTop: '40px',
//             paddingBottom: '40px',
//             overflow: 'hidden',
//         },
//         logoContainer: {
//             display: 'flex',
//             justifyContent: 'center',
//             height: '70px',
//             marginBottom: '10px',
//         },
//         addressContainer: {
//             display: 'flex',
//             justifyContent: 'center',
//             fontSize: '15px',
//             fontStyle: 'italic'
//         },
//         blockContainer: {
//             height: 'fit-content',
//             position: 'relative',
//             border: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             '& .blockContentName': {
//                 height: '30px',
//                 background: theme.palette.background.default,
//                 color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.primary.dark,
//                 textAlign: 'center',
//                 position: 'absolute',
//                 top: '-15px',
//                 fontSize: '20px',
//                 fontStyle: 'italic',
//                 padding: '0px 5px',
//                 zIndex: 1,
//             },
//             '& .blockContentHolder': {
//                 marginTop: '30px',
//                 marginBottom: '30px',
//                 width: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-evenly',
//                 '& .container': {
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     '& .leftRow, .rightRow': {
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         '& .label': {
//                             color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
//                             fontWeight: 400,
//                             minWidth: '50%',
//                             padding: '4px 0px',
//                             borderBottom: `1px solid ${theme.palette.primary.light}`,
//                         },
//                         '& .value': {
//                             color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
//                             fontWeight: 500,
//                             minWidth: '50%',
//                             padding: '4px 0px',
//                             borderBottom: `1px solid ${theme.palette.primary.light}`,
//                             overflowWrap: 'break-word',
//                         }
//                     },
//                     '& .border': {
//                         borderLeft: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
//                     }
//                 }
//             },
//             '& .blockContentAction': {
//                 bottom: '-13px',
//                 right: '20px',
//                 position: 'absolute',
//                 cursor: 'pointer',
//                 background: theme.palette.background.paper,
//                 color: 'green',
//                 border: `1px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`,
//                 borderRadius: '50%',
//                 padding: '3px 5px',
//                 zIndex: 1,
//             }
//         },
//     }
//     )
// });

// function PassengerAllDetails() {

//     const classes = useStyles();

//     const [pId, setpId] = useState(0)
//     const [siteSetting, setSiteSetting] = useState({})

//     const [medical, setMedical] = useState({})
//     const [embassy, setEmbassy] = useState({})
//     const [mofa, setMofa] = useState({})
//     const [officeWork, setOfficeWork] = useState({})
//     const [manPower, setManPower] = useState({})
//     const [musanedOkala, setMusanedOkala] = useState({})
//     const [flight, setFlight] = useState({})
//     const [training, setTraining] = useState({})
//     const [visaEntry, setVisaEntry] = useState({})
//     const [passenger, setPassenger] = useState({})

//     const [responeCount, setResponeCount] = useState(0)

//     const [loading, setLoading] = useState(true)
//     const [nodata, setnodata] = useState(false)

//     const { searchKeyword } = useParams()

//     //get site's logo & address
//     useEffect(() => {
//         const { authToken } = getUserData()
//         axios.get(GET_SITESETTINGS, authToken).then(res => {
//             console.log("GET_SITESETTINGS_Res", res?.data?.general_settings[0] || {})
//             setSiteSetting(res?.data?.general_settings[0] || {})
//         }).catch(() => null)

//         return () => sessionStorage.removeItem('passenger_search_key')
//     }, [])

//     //get paasenger id when searh keyord changed
//     useEffect(() => {
//         if (searchKeyword) {
//             console.log("searchKeyword", searchKeyword)
//             axios.get(`${SEARCH_PASSENGER_BY}?keyword=${searchKeyword}`).then(res => {
//                 console.log("SEARCH_PASSENGER_BY_RES", res)
//                 setpId(res?.data?.passengers[0]?.id || 0)
//             }).catch(() => {
//                 setpId(0)
//             })

//             sessionStorage.setItem('passenger_search_key', searchKeyword)
//             window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'passenger_search_key' } }))
//         }
//     }, [searchKeyword])

//     //check have data or not
//     useEffect(() => {
//         console.log("effect")
//         if (responeCount > 9) {
//             _.isEmpty(medical) && _.isEmpty(embassy) && _.isEmpty(mofa) && _.isEmpty(officeWork) && _.isEmpty(manPower) && _.isEmpty(musanedOkala) && _.isEmpty(flight) && _.isEmpty(training) && _.isEmpty(visaEntry) && _.isEmpty(passenger) && setnodata(true)
//         }
//         else {
//             setnodata(false)
//             setLoading(false)
//         }
//     }, [responeCount, pId])

//     //get all data
//     useEffect(() => {
//         if (pId) {
//             setLoading(true)
//             setnodata(false)
//             setResponeCount(0)

//             //medical data
//             axios.get(`${MEDICAL_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setMedical({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setMedical({})
//                 setResponeCount((data) => data + 1)
//             })

//             //office work data
//             axios.get(`${OFFICEWORK_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setOfficeWork({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setOfficeWork({})
//                 setResponeCount((data) => data + 1)
//             })

//             //mfa data
//             axios.get(`${MOFA_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setMofa({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setMofa({})
//                 setResponeCount((data) => data + 1)
//             })

//             //manpower data
//             axios.get(`${MANPOWER_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setManPower({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setManPower({})
//                 setResponeCount((data) => data + 1)
//             })

//             //masaned okala data
//             axios.get(`${MUSANEDOKALA_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setMusanedOkala({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setMusanedOkala({})
//                 setResponeCount((data) => data + 1)
//             })

//             //training data
//             axios.get(`${TRAINING_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setTraining({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setTraining({})
//                 setResponeCount((data) => data + 1)
//             })

//             //flight data
//             axios.get(`${FLIGHT_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setFlight({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setFlight({})
//                 setResponeCount((data) => data + 1)
//             })

//             //visa entry data
//             axios.get(`${VISAENTRY_BY_PASSENGER_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setVisaEntry({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setVisaEntry({})
//                 setResponeCount((data) => data + 1)
//             })

//             //passenger data
//             axios.get(`${GET_PASSENGER_BY_ID}${pId}`).then(res => {
//                 if (res?.data?.id) {
//                     setPassenger({ ...res.data })
//                     setLoading(false)
//                 }
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setPassenger({})
//                 setResponeCount((data) => data + 1)
//             })

//             //embassy data
//             axios.get(`${EMBASSY_BY_PASSENGER_ID}${pId}`).then(res => {

//                 let embassyData = {}

//                 if (res.data?.visa_entry?.id && res.data?.mofa?.id && res.data?.embassy?.id) {
//                     const visa_entry = res.data?.visa_entry
//                     const mofa = res.data?.mofa
//                     embassyData = {
//                         ...res.data.embassy,
//                         visa_number_readonly: visa_entry.visa_number,
//                         sponsor_id_no_readonly: visa_entry.sponsor_id_no,
//                         sponsor_name_english_readonly: visa_entry.sponsor_name_english,
//                         sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
//                         mofa_no_readonly: mofa.mofa_no,
//                     }
//                 }
//                 else {
//                     embassyData.push({})
//                 }
//                 setEmbassy({ ...embassyData })
//                 !_.isEmpty(embassyData) && setLoading(false)
//                 setResponeCount((data) => data + 1)
//             }).catch(() => {
//                 setEmbassy({})
//                 setResponeCount((data) => data + 1)
//             })
//         }
//         else {
//             setMedical({})
//             setOfficeWork({})
//             setEmbassy({})
//             setMofa({})
//             setManPower({})
//             setMusanedOkala({})
//             setTraining({})
//             setFlight({})
//             setVisaEntry({})
//             setPassenger({})
//             setLoading(false)
//         }
//     }, [pId])

//     if (loading) {
//         return <FuseLoading />;
//     }

//     if (nodata) {
//         return <h1>no data found</h1>
//     }

//     return (
//         <div>
//             <div className={`${classes.container}`}>
//                 <div className={classes.logoContainer}>
//                     <img src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`} />
//                 </div>
//                 <div className={classes.addressContainer}>
//                     <pre>{siteSetting?.address || ""}</pre>
//                 </div>

//                 {_.isEmpty(passenger) || <PassengerDetail classes={classes} data={passenger} pid={pId} />}
//                 {_.isEmpty(medical) || <MedicalDetail classes={classes} data={medical} pid={pId} />}
//                 {_.isEmpty(visaEntry) || <VisaEntryDetail classes={classes} data={visaEntry} />}
//                 {_.isEmpty(musanedOkala) || <MusanedOkalaDetail classes={classes} data={musanedOkala} pid={pId} />}
//                 {_.isEmpty(mofa) || <MofaDetail classes={classes} data={mofa} pid={pId} />}
//                 {_.isEmpty(officeWork) || <OfficeWorkDetail classes={classes} data={officeWork} pid={pId} />}
//                 {_.isEmpty(embassy) || <EmbassyDetail classes={classes} data={embassy} pid={pId} />}
//                 {_.isEmpty(training) || <TrainingDetail classes={classes} data={training} pid={pId} />}
//                 {_.isEmpty(manPower) || <ManPowerDetail classes={classes} data={manPower} pid={pId} />}
//                 {_.isEmpty(flight) || <FlightDetail classes={classes} data={flight} pid={pId} />}


//             </div>
//         </div >
//     )
// }

// export default PassengerAllDetails