import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getUserData from 'app/@helpers/getUserData';
import { BASE_URL, EMBASSY_BY_PASSENGER_ID, GET_SITESETTINGS, MEDICAL_BY_PASSENGER_ID, MOFA_BY_PASSENGER_ID } from 'app/constant/constants';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import EmbassyDetail from './EmbassyDetail';
import MedicalDetail from './MedicalDetail';
import MofaDetail from './MofaDetail';

const useStyles = makeStyles(theme => {
    console.log("theme", theme)
    return ({
        container: {
            background: theme.palette.background.paper,
            color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.primary.dark,
            border: `2px solid ${theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark}`
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            height: '70px',
            marginTop: '40px',
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
                background: theme.palette.background.paper,
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

function PassengerAllDetails({ open, action, searchKey = '' }) {

    const classes = useStyles();

    const [pId, setpId] = useState(4)
    const [siteSetting, setSiteSetting] = useState({})

    const [medical, setMedical] = useState({ titleName: 'Medical' })
    const [embassy, setEmbassy] = useState({ titleName: 'Embassy' })
    const [mofa, setMofa] = useState({ titleName: 'Mofa' })

    useEffect(() => {
        const { authToken } = getUserData()
        axios.get(GET_SITESETTINGS, authToken).then(res => {
            console.log("GET_SITESETTINGS_Res", res?.data?.general_settings[0] || {})
            setSiteSetting(res?.data?.general_settings[0] || {})
        }).catch(() => { })
    }, [])

    useEffect(() => {
        if (searchKey) {
            setpId(4)
        }
    }, [searchKey])

    useEffect(() => {
        if (pId) {
            axios.get(`${MEDICAL_BY_PASSENGER_ID}${pId}`).then(res => {
                const medicalData = _.isObject(res?.data) ? res.data : {}
                setMedical({ titleName: 'Medical', ...medicalData })
            }).catch(() => {
                setMedical({ titleName: 'Medical' })
            })
        }
    }, [pId])

    useEffect(() => {
        if (pId) {
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
                // else if (res.data?.visa_entry?.id && res.data?.mofa?.id) {
                //     const visa_entry = res.data?.visa_entry
                //     const mofa = res.data?.mofa
                //     embassyData = {
                //         profession_english: visa_entry.profession_english,
                //         profession_arabic: visa_entry.profession_arabic,
                //         visa_number_readonly: visa_entry.visa_number,
                //         sponsor_id_no_readonly: visa_entry.sponsor_id_no,
                //         sponsor_name_english_readonly: visa_entry.sponsor_name_english,
                //         sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
                //         mofa_no_readonly: mofa.mofa_no,
                //     }
                // }
                else {
                    embassyData.push({})
                }

                setEmbassy({ titleName: 'Embassy', ...embassyData })
            }).catch(() => {
                setEmbassy({ titleName: 'Embassy' })
            })
        }
    }, [pId])

    useEffect(() => {
        if (pId) {
            axios.get(`${MOFA_BY_PASSENGER_ID}${pId}`).then(res => {
                const mofaData = _.isObject(res?.data) ? res.data : {}
                setMofa({ titleName: 'Embassy', ...mofaData })
            }).catch(() => {
                setMofa({ titleName: 'Embassy' })
            })
        }
    }, [pId])

    return (
        <div>
            <Modal open={open} onClose={() => action(false)}>
                <div className={`m-0 md:m-64 h-screen rounded-4 ${classes.container}`}>
                    <div className={classes.logoContainer}>
                        <img src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`} />
                    </div>
                    <div className={classes.addressContainer}>
                        <pre>{siteSetting?.address || "jhknfg8o6trbi7lvyi8u jhgijutyujhl lygfjhjutf"}</pre>
                    </div>


                    <MedicalDetail classes={classes} data={medical} setData={setMedical} pid={pId} modalAction={action} />
                    <EmbassyDetail classes={classes} data={embassy} setData={setEmbassy} pid={pId} modalAction={action} />
                    <MofaDetail classes={classes} data={mofa} setData={setMofa} pid={pId} modalAction={action} />

                </div>
            </Modal >
        </div >
    )
}

export default PassengerAllDetails



