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
import { removeContra, saveContra, updateContra } from '../store/contraSlice';

const NewContraHeader = ({ letFormSave }) => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();
	const { contraId } = routeParams;

	const handleDelete = localStorage.getItem('contraEvent');

	function handleSaveContra() {
		dispatch(saveContra(getValues())).then(res => {
			console.log('saveContraRes', res);
			if (res.payload?.data?.account_logs && res.payload?.data?.contras) {
				localStorage.setItem('contraAlert', 'saveContra');
				history.push('/apps/contra-management/contras');
			}
		});
	}

	function handleUpdateContra() {
		dispatch(updateContra(getValues())).then(res => {
			console.log('updateContraRes', res);
			if (res.payload?.data?.data?.account_logs && res.payload?.data?.data?.contras) {
				localStorage.setItem('contraAlert', 'updateContra');
				history.push('/apps/contra-management/contras');
			}
		});
	}

	function handleRemoveContra() {
		dispatch(removeContra(contraId)).then(res => {
			console.log('removeContraRes', res);
			if (res.payload) {
				localStorage.removeItem('contraEvent');
				localStorage.setItem('contraAlert', 'deleteContra');
				history.push('/apps/contra-management/contras');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/contra-management/contras');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') {
				if (routeParams.contraId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
					isShouldFormSave(e) && handleSaveContra();
				} else if (handleDelete !== 'Delete' && routeParams?.contraName) {
					isShouldFormUpdate(e) && handleUpdateContra();
				} else if (handleDelete == 'Delete' && routeParams.contraId !== 'new') {
					handleRemoveContra();
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
						to="/apps/contra-management/contras"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Contras</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New Contra'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Contra Detail
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
						Do you want to remove this Contra?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.contraId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveContra}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.contraId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid || !letFormSave}
						onClick={handleSaveContra}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.contraName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateContra}
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

export default NewContraHeader;
