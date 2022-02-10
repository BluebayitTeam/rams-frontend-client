import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isShouldFormSave from 'app/@helpers/isShouldFormSave';
import isShouldFormUpdate from 'app/@helpers/isShouldFormUpdate';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { removeJournal, saveJournal, updateJournal } from '../store/journalSlice';

const NewJournalHeader = ({ letFormSave }) => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();
	const { journalId, journalName } = routeParams;

	const handleDelete = localStorage.getItem('journalEvent');

	function handleSaveJournal() {
		dispatch(saveJournal(getValues())).then(res => {
			console.log('saveJournalRes', res);
			if (res.payload?.data?.account_logs && res.payload?.data?.journals) {
				localStorage.setItem('journalAlert', 'saveJournal');
				history.push('/apps/journal-management/journals');
			}
		});
	}

	function handleUpdateJournal() {
		dispatch(updateJournal(getValues())).then(res => {
			console.log('updateJournalRes', res);
			if (res.payload?.data?.data?.account_logs && res.payload?.data?.data?.journals) {
				localStorage.setItem('journalAlert', 'updateJournal');
				history.push('/apps/journal-management/journals');
			}
		});
	}

	function handleRemoveJournal() {
		dispatch(removeJournal(journalId)).then(res => {
			console.log('removeJournalRes', res);
			if (res.payload) {
				localStorage.removeItem('journalEvent');
				localStorage.setItem('journalAlert', 'deleteJournal');
				history.push('/apps/journal-management/journals');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/journal-management/journals');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') {
				if (routeParams.journalId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
					isShouldFormSave(e) && handleSaveJournal();
				} else if (handleDelete !== 'Delete' && routeParams?.journalName) {
					isShouldFormUpdate(e) && handleUpdateJournal();
				} else if (handleDelete == 'Delete' && routeParams.journalId !== 'new') {
					handleRemoveJournal();
				}
			}
		};

		window.addEventListener('keydown', handleSaveAndUpdate);

		return () => window.removeEventListener('keydown', handleSaveAndUpdate);
	}, [dirtyFields, isValid]);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/journal-management/journals"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Journals</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{journalName || 'Create New Journal'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Journal Detail
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete == 'Delete' && (
					<Typography className="mt-6" variant="subtitle2">
						Do you want to remove this Journal?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.journalId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveJournal}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.journalId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid || !letFormSave}
						onClick={handleSaveJournal}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.journalName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						disabled={!letFormSave}
						variant="contained"
						style={{
							backgroundColor: letFormSave ? '#4dc08e' : 'rgba(255 255 255 / 12%)',
							color: 'white'
						}}
						onClick={handleUpdateJournal}
					>
						Update
					</Button>
				)}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					style={{ backgroundColor: '#FFAA4C', color: 'white' }}
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
};

export default NewJournalHeader;
