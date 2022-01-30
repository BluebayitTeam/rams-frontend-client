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
import { removeSubLedger, saveSubLedger, updateSubLedger } from '../store/subLedgerSlice';

const NewSubLedgerHeader = () => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();
	const routeParams = useParams();
	const handleDelete = localStorage.getItem('subLedgerEvent');

	function handleSaveSubLedger() {
		dispatch(saveSubLedger(getValues())).then(res => {
			console.log('saveSubLedgerRes', res);
			if (res.payload?.data?.id) {
				localStorage.setItem('subLedgerAlert', 'saveSubLedger');
				history.push('/apps/subLedger-management/subLedgers');
			}
		});
	}

	function handleUpdateSubLedger() {
		dispatch(updateSubLedger(getValues())).then(res => {
			console.log('updateSubLedgerRes', res);
			if (res.payload?.data?.id) {
				localStorage.setItem('subLedgerAlert', 'updateSubLedger');
				history.push('/apps/subLedger-management/subLedgers');
			}
		});
	}

	function handleRemoveSubLedger() {
		dispatch(removeSubLedger(getValues())).then(res => {
			console.log('removeSubLedgerRes', res);
			if (res.payload) {
				localStorage.removeItem('subLedgerEvent');
				localStorage.setItem('subLedgerAlert', 'deleteSubLedger');
				history.push('/apps/subLedger-management/subLedgers');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/subLedger-management/subLedgers');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') {
				if (routeParams.subLedgerId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
					isShouldFormSave(e) && handleSaveSubLedger();
				} else if (handleDelete !== 'Delete' && routeParams?.subLedgerName) {
					isShouldFormUpdate(e) && handleUpdateSubLedger();
				} else if (handleDelete == 'Delete' && routeParams.subLedgerId !== 'new') {
					handleRemoveSubLedger();
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
						to="/apps/subLedger-management/subLedgers"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">SubLedgers</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New SubLedger'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								SubLedger Detail
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
						Do you want to remove this SubLedger?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.subLedgerId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveSubLedger}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.subLedgerId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSaveSubLedger}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.subLedgerName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateSubLedger}
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

export default NewSubLedgerHeader;
