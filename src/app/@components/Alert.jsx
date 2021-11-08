// import { makeStyles } from '@material-ui/core';
// import CancelIcon from '@material-ui/icons/Cancel';
// import Alert from '@material-ui/lab/Alert';
// import { default as React, default as React } from 'react';


// const useStyles = makeStyles(theme => ({
//     alert: (props) => ({
//         width: "20%",
//         height: "50px",
//         position: "fixed",
//         right: "30px",
//         marginTop: "-85px",
//         paddingTop: "0px",
//         fontSize: "15px",
//         borderRadius: "15px",
//         transitionTimingFunction: "ease-out",
//         zIndex: props ? "1" : "-1",
//         transition: props ? "0s" : "1s",
//         opacity: props ? 1 : 0,
//     }),
// }));


// const Alert = ({ open = false, message = "", setOpen = (action) => null }) => {

//     const classes = useStyles(true);
//     console.log("alert", open, message, setOpen)
//     return (
//         <Alert variant="filled" severity="success" className={classes.alert}
//             action={
//                 <CancelIcon onClick={() => { setOpen(false) }} style={{ marginTop: "8px" }} />
//             }
//         >
//             {message}
//         </Alert>
//     )
// }

// export default Alert
