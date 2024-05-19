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
import { useCreateMedicalMutation, useDeleteMedicalMutation, useUpdateMedicalMutation } from '../MedicalsApi';

/**
 * The medical header.
 */
function MedicalHeader() {
	const routeParams = useParams();
	const { medicalId } = routeParams;
	const [createMedical] = useCreateMedicalMutation();
	const [saveMedical] = useUpdateMedicalMutation();
	const [removeMedical] = useDeleteMedicalMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteMedical');
	const handleUpdate = localStorage.getItem('updateMedical');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateMedical() {
		saveMedical(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'updateMedical');

						reset({
							medical_card: doneNotDone.find((data) => data.default)?.id || '',
							medical_result: medicalResults.find((data) => data.default)?.id || ''
						});

						UpdatedSuccessfully();
						navigate('/apps/medical/medicals/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating medical', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateMedical() {
		createMedical(getValues())
			.unwrap()
			.then((res) => {
				if (res.payload?.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveMedical');
						navigate('/apps/medical/medicals/new');
						reset({
							medical_card: doneNotDone.find((data) => data.default)?.id,
							medical_result: medicalResults.find((data) => data.default)?.id
						});
					}
				}

				AddedSuccessfully();
			});

		// createMedical(getValues())
		// 	.then((res) => {
		// 		if (res.data?.id) {
		// 			if (fromSearch) {
		// 				history.goBack();
		// 			} else {
		// 				localStorage.setItem('medicalAlert', 'updateMedical');

		// 				reset({
		// 					medical_card: doneNotDone.find((data) => data.default)?.id || '',
		// 					medical_result: medicalResults.find((data) => data.default)?.id || ''
		// 				});

		// 				AddedSuccessfully();

		// 				navigate('/apps/medical/medicals/new');
		// 			}
		// 		} else {
		// 			// Handle cases where res.data.id is not present
		// 			console.error('Update failed: No id in response data');
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		// Handle error
		// 		console.error('Error updating medical', error);
		// 		dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
		// 	});
	}

	function handleRemoveMedical() {
		removeMedical(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res.payload?.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveMedical');
						navigate('/apps/medical/medicals/new');
						reset({
							medical_card: doneNotDone.find((data) => data.default)?.id,
							medical_result: medicalResults.find((data) => data.default)?.id
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
	// 		navigate('/apps/medical/medicals/new');
	// 		reset({
	// 			medical_card: doneNotDone.find((data) => data.default)?.id,
	// 			medical_result: medicalResults.find((data) => data.default)?.id
	// 		});
	// 	}
	// }
	const handleCancel = () => {
		navigate('/apps/medical/medicals/new');
		reset({
			medical_card: doneNotDone.find((data) => data.default)?.id,
			medical_result: medicalResults.find((data) => data.default)?.id
		});
	};

	useEffect(() => {
		if (medicalId === 'new') {
			reset({
				medical_card: doneNotDone.find((data) => data.default)?.id || '',
				medical_result: medicalResults.find((data) => data.default)?.id || ''
			});
		}
	}, [medicalId, reset]);
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
								{routeParams.medicalId === 'new'
									? 'Create New Medical'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.medicalId !== 'new' && 'Medicals Detail'}
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
				{(routeParams.medicalId === 'new' ||
					(sessionStorage.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields)}
						onClick={handleCreateMedical}
					>
						Save
					</Button>
				)}

				{routeParams?.medicalId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdateMedical}
						>
							Update
						</Button>
					)}

				{routeParams?.medicalId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveMedical}
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

export default MedicalHeader;
