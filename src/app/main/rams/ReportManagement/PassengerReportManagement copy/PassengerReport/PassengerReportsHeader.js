import { makeStyles } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrdersSearchText } from '../store/passengerReportSlice';

const useStyles = makeStyles(theme => ({
    alert: (props) => ({
        width: "20%",
        height: "35px",
        position: "fixed",
        right: "30px",
        marginTop: "-85px",
        paddingTop: "0px",
        fontSize: "15px",
        borderRadius: "15px",
        transitionTimingFunction: "ease-out",
        zIndex: props ? "1" : "-1",
        transition: props ? "0s" : "1s",
        opacity: props ? 1 : 0,
    }),
}));

const PassengerReportsHeader = () => {

    const [alerOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const mainTheme = useSelector(selectMainTheme);
    const dispatch = useDispatch();
    const searchText = useSelector(({ salesReportManagement }) => salesReportManagement?.salesReports?.searchText);

    const classes = useStyles(alerOpen);

    useEffect(() => {
        const alert = localStorage.getItem("orderAlert")

        if (alert === "saveOrder") {
            setAlertOpen(true)
            setAlertMessage("Add Success...")
            localStorage.removeItem("orderAlert")
        }
        if (alert === "updateOrder") {
            setAlertOpen(true)
            setAlertMessage("Update Success...")
            localStorage.removeItem("orderAlert")
        }
        if (alert === "deleteOrder") {
            setAlertOpen(true)
            setAlertMessage("Remove Success...")
            localStorage.removeItem("orderAlert")
        }

        setTimeout(() => {
            setAlertOpen(false)
        }, 3000)

    }, [])

    const enterClick = (event) => {
        console.log(event.target.value);
        if (event.key === "Enter") {
            dispatch(setOrdersSearchText(event));
        }
    }

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <h>This is header</h>
        </div>
    );
};

export default PassengerReportsHeader;
