/* eslint-disable no-undef */
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { AddedSuccessfully, RemoveSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { useCreateManPowerMutation, useDeleteManPowerMutation, useUpdateManPowerMutation } from '../ManPowersApi';

/**
 * The manPower header.
 */
function ManPowerHeader() {
	const routeParams = useParams();
	const { manPowerId } = routeParams;
	const [createManPower] = useCreateManPowerMutation();
	const [saveManPower] = useUpdateManPowerMutation();
	const [removeManPower] = useDeleteManPowerMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteManPower');
	const handleUpdate = localStorage.getItem('updateManPower');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateManPower() {
		saveManPower(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'updateManPower');

						// reset({
						// 	passenger: 'all',
						// 	training_card_status: doneNotDone.find((data) => data.default)?.id,
						// 	recruiting_agency: 'all',
						// 	training_center: '',
						// 	admission_date: '',
						// 	serial_no: '',
						// 	certificate_no: '',
						// 	certificate_date: '',
						// 	batch_number: '',
						// 	current_status: ''
						// });
						console.log('sklfjjdf', getValues());
						UpdatedSuccessfully();
						navigate('/apps/manPower-management/manPowers/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating manPower', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateManPower() {
		createManPower(getValues())
			// .unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveManPower');

						reset({
							passenger: 'all',
				man_power_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				new_visa_no: '',
				registration_id: '',
				man_power_date: '',
				submit_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: '',
						});
						navigate('/apps/manPower-management/manPowers/new');
						AddedSuccessfully();
					}
				}
			});
	}

	function handleRemoveManPower() {
		removeManPower(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						reset({
				passenger: 'all',
				man_power_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				new_visa_no: '',
				registration_id: '',
				man_power_date: '',
				submit_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: '',
						});
						localStorage.setItem('medicalAlert', 'saveManPower');
						navigate('/apps/manPower-management/manPowers/new');
						dispatch(showMessage({ message: 'Please Restart The Backend', variant: 'error' }));
					}
				}

				RemoveSuccessfully();
			})
			.catch((error) => {
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	const handleCancel = () => {
		if (fromSearch) {
			history.goBack();
		} else {
			history.push('/apps/manPower-management/manPowers/new');
			reset({
				passenger: 'all',
				man_power_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				new_visa_no: '',
				registration_id: '',
				man_power_date: '',
				submit_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: '',
			});
		}
	};

	useEffect(() => {
		if (manPowerId === 'new') {
			reset({
				passenger: 'all',
				man_power_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				new_visa_no: '',
				registration_id: '',
				man_power_date: '',
				submit_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: '',
			});
		}
	}, [manPowerId, reset]);
	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.3 } }}
						>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{routeParams.manPowerId === 'new'
									? 'Create New manPower'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.manPowerId !== 'new' && 'manPowers Detail'}
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
				{(routeParams.manPowerId === 'new' ||
					(sessionStorage.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields)}
						onClick={handleCreateManPower}
					>
						Save
					</Button>
				)}

				{routeParams?.manPowerId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
							variant="contained"
							onClick={handleUpdateManPower}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Update
						</Button>
					)}

				{routeParams?.manPowerId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
							variant="contained"
							onClick={handleRemoveManPower}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Remove
						</Button>
					)}

				{watch('passenger') && (
					<Button
						className="whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
						variant="contained"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default ManPowerHeader;
