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
import { doneNotDone } from 'src/app/@data/data';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import {
	useCreateOfficeWorkMutation,
	useDeleteOfficeWorkMutation,
	useUpdateOfficeWorkMutation
} from '../OfficeWorksApi';

/**
 * The medical header.
 */
function OfficeWorkHeader() {
	const routeParams = useParams();
	const { officeWorkId } = routeParams;
	const [createOfficeWork] = useCreateOfficeWorkMutation();
	const [saveOfficeWork] = useUpdateOfficeWorkMutation();
	const [removeOfficeWork] = useDeleteOfficeWorkMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteOfficeWork');
	const handleUpdate = localStorage.getItem('updateOfficeWork');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateOfficeWork() {
		saveOfficeWork(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('officeWorkAlert', 'updateOfficeWork');

						reset({
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id
						});

						UpdatedSuccessfully();
						navigate('/apps/officeWork/officeWorks/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating officeWork', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateOfficeWork() {
		// createOfficeWork(getValues())
		// 	.unwrap()
		// 	.then((res) => {
		// 		if (res.payload?.data?.id) {
		// 			if (fromSearch) {
		// 				history.goBack();
		// 			} else {
		// 				localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
		// 				navigate('/apps/officeWork/officeWorks/new');
		// 				reset({
		// 					police_clearance_status: doneNotDone.find((data) => data.default)?.id,
		// 					driving_license_status: doneNotDone.find((data) => data.default)?.id,
		// 					finger_status: doneNotDone.find((data) => data.default)?.id
		// 				});
		// 			}
		// 		}

		createOfficeWork(getValues())
			.unwrap()
			.then((res) => {
				if (res.payload?.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
						navigate('/apps/officeWork/officeWorks/new');
						reset({
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id
						});
					}
				}

				AddedSuccessfully();
			});
	}

	function handleRemoveOfficeWork() {
		removeOfficeWork(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res.payload?.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
						navigate('/apps/officeWork/officeWorks/new');
						reset({
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id
						});
						dispatch(showMessage({ message: 'Please Restart The Backend', variant: 'error' }));
					}
				}

				RemoveSuccessfully();
			})
			.catch((error) => {
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	// function handleCancel() {
	// 	if (fromSearch) {
	// 		history.goBack();
	// 	} else {
	// 		navigate('/apps/officeWork/officeWorks/new');
	// 		reset({
	// 			officeWork_card: doneNotDone.find((data) => data.default)?.id,
	// 			officeWork_result: officeWorkResults.find((data) => data.default)?.id
	// 		});
	// 	}
	// }
	const handleCancel = () => {
		navigate('/apps/officeWork/officeWorks/new');
		reset({
			police_clearance_status: doneNotDone.find((data) => data.default)?.id,
			driving_license_status: doneNotDone.find((data) => data.default)?.id,
			finger_status: doneNotDone.find((data) => data.default)?.id
		});
	};

	useEffect(() => {
		if (officeWorkId === 'new') {
			reset({
				police_clearance_status: doneNotDone.find((data) => data.default)?.id,
				driving_license_status: doneNotDone.find((data) => data.default)?.id,
				finger_status: doneNotDone.find((data) => data.default)?.id
			});
		}
	}, [officeWorkId, reset]);
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
								{routeParams.officeWorkId === 'new'
									? 'Create New Office Work'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.officeWorkId !== 'new' && 'Office Work Detail'}
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
				{(routeParams.officeWorkId === 'new' ||
					(sessionStorage.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateOfficeWork}
					>
						Save
					</Button>
				)}

				{routeParams?.officeWorkId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdateOfficeWork}
						>
							Update
						</Button>
					)}

				{routeParams?.officeWorkId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveOfficeWork}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
							style={{
								backgroundColor: '#ea5b78',
								color: 'white'
								// display: user_role === 'ADMIN' || user_role === 'admin' ? 'flex' : 'none'
							}}
						>
							Remove
						</Button>
					)}
				{watch('passenger') && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						style={{ backgroundColor: '#FFAA4C', color: 'white' }}
						onClick={handleCancel}
					>
						Cancel
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default OfficeWorkHeader;
