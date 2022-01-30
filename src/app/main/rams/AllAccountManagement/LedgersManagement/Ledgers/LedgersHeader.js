import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
import isShouldGoAddPage from 'app/@helpers/isShouldGoAddPage';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setLedgersSearchText } from '../store/ledgersSlice';

const useStyles = makeStyles(() => ({
	alert: props => ({
		width: 'fit-content',
		height: '35px',
		position: 'fixed',
		right: '30px',
		paddingTop: '0px',
		fontSize: '15px',
		borderRadius: '15px',
		transitionTimingFunction: 'ease-out',
		zIndex: props ? '1' : '-1',
		transition: props ? '0s' : '1s',
		opacity: props ? 1 : 0
	})
}));

const LedgersHeader = () => {
	const [alerOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const mainTheme = useSelector(selectMainTheme);
	const dispatch = useDispatch();
	const searchText = useSelector(({ ledgersManagement }) => ledgersManagement.ledgers.searchText);

	const classes = useStyles(alerOpen);

	useEffect(() => {
		const alert = localStorage.getItem('ledgerAlert');

		if (alert === 'saveLedger') {
			setAlertOpen(true);
			setAlertMessage('Add Success...');
			localStorage.removeItem('ledgerAlert');
		}
		if (alert === 'updateLedger') {
			setAlertOpen(true);
			setAlertMessage('Update Success...');
			localStorage.removeItem('ledgerAlert');
		}
		if (alert === 'deleteLedger') {
			setAlertOpen(true);
			setAlertMessage('Remove Success...');
			localStorage.removeItem('ledgerAlert');
		}

		setTimeout(() => {
			setAlertOpen(false);
		}, 3000);
	}, []);

	const history = useHistory();
	useEffect(() => {
		const goToFormPage = e =>
			e.key === 'Enter' &&
			isShouldGoAddPage(e) &&
			setTimeout(() => history.push('/apps/ledger-management/new'), 0);
		window.addEventListener('keydown', goToFormPage);
		return () => window.removeEventListener('keydown', goToFormPage);
	}, []);

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
					Ledgers
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
							//value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							//onBlur={ev => dispatch(setLedgersSearchText(ev))}
							onKeyDown={ev => {
								if (ev.key === 'Enter') {
									dispatch(setLedgersSearchText(ev));
								}
							}}
						/>
					</Paper>
				</ThemeProvider>
			</div>
			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				<Button
					component={Link}
					to="/apps/ledger-management/new"
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Add New Ledger</span>
					<span className="flex sm:hidden">New</span>
				</Button>
			</motion.div>

			<Alert
				variant="filled"
				severity="success"
				className={classes.alert}
				action={
					<CancelIcon
						onClick={() => {
							setAlertOpen(false);
						}}
						style={{ marginTop: '8px' }}
					/>
				}
			>
				{alertMessage}
			</Alert>
		</div>
	);
};

export default LedgersHeader;
