import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getUserData from 'app/@helpers/getUserData';
import { BASE_URL, GET_SITESETTINGS } from 'app/constant/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
    console.log("theme", theme)
    return ({
        container: {
            height: "100%",
            background: theme.palette.background.paper,
            color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
            border: `2px solid ${theme.palette.primary.dark}`
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
        }
    })
});

function PassengerAllDetails({ open, action }) {

    const [siteSetting, setSiteSetting] = useState({})

    const classes = useStyles();

    useEffect(() => {
        const { authToken } = getUserData()
        axios.get(GET_SITESETTINGS, authToken).then(res => {
            console.log("GET_SITESETTINGS_Res", res?.data?.general_settings[0] || {})
            setSiteSetting(res?.data?.general_settings[0] || {})
        }).catch(() => { })
    }, [])

    return (
        <div>
            <Modal open={open} onClose={() => action(false)}>
                <div className={`m-0 lg:m-64 h-screen rounded-4 ${classes.container}`}>
                    <div className={classes.logoContainer}>
                        <img src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`} />
                    </div>
                    <div className={classes.addressContainer}>
                        <pre>{siteSetting?.address || ""}</pre>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default PassengerAllDetails



