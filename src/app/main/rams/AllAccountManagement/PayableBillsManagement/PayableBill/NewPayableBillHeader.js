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
import { removePayableBill, savePayableBill, updatePayableBill } from '../store/payableBillSlice';

const NewPayableBillHeader = ({ letFormSave, extraItem }) => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();
	const { payableBillId } = routeParams;

	const handleDelete = localStorage.getItem('payableBillEvent');

	function handleSavePayableBill() {
		const values = getValues();
		dispatch(savePayableBill({ ...values, items: [...values?.items, extraItem] })).then(res => {
			console.log('savePayableBillRes', res);
			if (res.payload?.data?.account_logs && res.payload?.data?.purchases) {
				localStorage.setItem('payableBillAlert', 'savePayableBill');
				history.push('/apps/payableBill-management/payableBills');
			}
		});
	}

	function handleUpdatePayableBill() {
		const values = getValues();
		dispatch(updatePayableBill({ ...values, items: [...values?.items, extraItem] })).then(res => {
			console.log('updatePayableBillRes', res);
			if (res.payload?.data?.data?.account_logs && res.payload?.data?.data?.purchases) {
				localStorage.setItem('payableBillAlert', 'updatePayableBill');
				history.push('/apps/payableBill-management/payableBills');
			}
		});
	}

	function handleRemovePayableBill() {
		dispatch(removePayableBill(payableBillId)).then(res => {
			console.log('removePayableBillRes', res);
			if (res.payload) {
				localStorage.removeItem('payableBillEvent');
				localStorage.setItem('payableBillAlert', 'deletePayableBill');
				history.push('/apps/payableBill-management/payableBills');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/payableBill-management/payableBills');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') {
				if (routeParams.payableBillId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
					isShouldFormSave(e) && handleSavePayableBill();
				} else if (handleDelete !== 'Delete' && routeParams?.payableBillName) {
					isShouldFormUpdate(e) && handleUpdatePayableBill();
				} else if (handleDelete == 'Delete' && routeParams.payableBillId !== 'new') {
					handleRemovePayableBill();
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
						to="/apps/payableBill-management/payableBills"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Payable Bills</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New Payable Bill'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Payable Bill Detail
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
						Do you want to remove this Payable Bill?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.payableBillId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemovePayableBill}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.payableBillId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid || !letFormSave}
						onClick={handleSavePayableBill}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.payableBillName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdatePayableBill}
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

export default NewPayableBillHeader;
