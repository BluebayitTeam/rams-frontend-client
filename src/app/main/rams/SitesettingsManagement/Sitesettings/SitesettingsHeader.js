import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSitesettingsSearchText } from '../store/sitesettingsSlice';

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

const SitesettingsHeader = () => {

	const [alerOpen, setAlertOpen] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")
	const mainTheme = useSelector(selectMainTheme);
	const dispatch = useDispatch();
	const searchText = useSelector(({ sitesettingsManagement }) => sitesettingsManagement.sitesettings.searchText);
	const classes = useStyles(alerOpen);

	useEffect(() => {
		const alert = localStorage.getItem("sitesettingAlert")

		if (alert === "saveSitesetting") {
			setAlertOpen(true)
			setAlertMessage("Add Success...")
			localStorage.removeItem("sitesettingAlert")
		}
		if (alert === "updateSitesetting") {
			setAlertOpen(true)
			setAlertMessage("Update Success...")
			localStorage.removeItem("sitesettingAlert")
		}
		if (alert === "deleteSitesetting") {
			setAlertOpen(true)
			setAlertMessage("Remove Success...")
			localStorage.removeItem("sitesettingAlert")
		}

		setTimeout(() => {
			setAlertOpen(false)
		}, 3000)

	}, [])

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Icon
					component={motion.span}
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.2 } }}
					className="text-24 md:text-32"
				>
					person
				</Icon>
				<Typography
					component={motion.span}
					initial={{ x: -10 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
				>
					Sitesettings
				</Typography>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Search"
							className="flex flex-1 mx-8"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							//onBlur={ev => dispatch(setSitesettingsSearchText(ev))}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter') {
									dispatch(setSitesettingsSearchText(ev))
								}
							}}
						/>
					</Paper>
				</ThemeProvider>
			</div>
			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				<Button
					component={Link}
					to="/apps/sitesettings-management/sitesetting/new"
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Add New Sitesetting</span>
					<span className="flex sm:hidden">New</span>
				</Button>
			</motion.div>

			<Alert variant="filled" severity="success" className={classes.alert}
				action={
					<CancelIcon onClick={() => { setAlertOpen(false) }} style={{ marginTop: "8px" }} />
				}
			>
				{alertMessage}
			</Alert>

		</div>
	);
};

export default SitesettingsHeader;