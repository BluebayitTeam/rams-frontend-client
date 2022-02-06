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
import { removeReceivableBill, saveReceivableBill, updateReceivableBill } from '../store/receivableBillSlice';

const NewReceivableBillHeader = ({ letFormSave }) => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();
	const { receivableBillId } = routeParams;

	const handleDelete = localStorage.getItem('receivableBillEvent');

	function handleSaveReceivableBill() {
		dispatch(saveReceivableBill(getValues())).then(res => {
			console.log('saveReceivableBillRes', res);
			if (res.payload?.data?.account_logs && res.payload?.data?.sales) {
				localStorage.setItem('receivableBillAlert', 'saveReceivableBill');
				history.push('/apps/receivableBill-management/receivableBills');
			}
		});
	}

	function handleUpdateReceivableBill() {
		dispatch(updateReceivableBill(getValues())).then(res => {
			console.log('updateReceivableBillRes', res);
			if (res.payload?.data?.data?.account_logs && res.payload?.data?.data?.sales) {
				localStorage.setItem('receivableBillAlert', 'updateReceivableBill');
				history.push('/apps/receivableBill-management/receivableBills');
			}
		});
	}

	function handleRemoveReceivableBill() {
		dispatch(removeReceivableBill(receivableBillId)).then(res => {
			console.log('removeReceivableBillRes', res);
			if (res.payload) {
				localStorage.removeItem('receivableBillEvent');
				localStorage.setItem('receivableBillAlert', 'deleteReceivableBill');
				history.push('/apps/receivableBill-management/receivableBills');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/receivableBill-management/receivableBills');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') {
				if (routeParams.receivableBillId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
					isShouldFormSave(e) && handleSaveReceivableBill();
				} else if (handleDelete !== 'Delete' && routeParams?.receivableBillName) {
					isShouldFormUpdate(e) && handleUpdateReceivableBill();
				} else if (handleDelete == 'Delete' && routeParams.receivableBillId !== 'new') {
					handleRemoveReceivableBill();
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
						to="/apps/receivableBill-management/receivableBills"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Receivable Bills</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New Receivable Bill'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Receivable Bill Detail
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
						Do you want to remove this Receivable Bill?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.receivableBillId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveReceivableBill}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.receivableBillId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid || !letFormSave}
						onClick={handleSaveReceivableBill}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.receivableBillName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateReceivableBill}
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

export default NewReceivableBillHeader;
