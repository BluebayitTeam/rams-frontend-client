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
import { useCreateTrainingMutation, useDeleteTrainingMutation, useUpdateTrainingMutation } from '../TrainingsApi';

/**
 * The training header.
 */
function TrainingHeader() {
	const routeParams = useParams();
	const { trainingId } = routeParams;
	const [createTraining] = useCreateTrainingMutation();
	const [saveTraining] = useUpdateTrainingMutation();
	const [removeTraining] = useDeleteTrainingMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteTraining');
	const handleUpdate = localStorage.getItem('updateTraining');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateTraining() {
		saveTraining(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'updateTraining');

						reset({
							medical_card: doneNotDone.find((data) => data.default)?.id || '',
							medical_result: medicalResults.find((data) => data.default)?.id || ''
						});

						UpdatedSuccessfully();
						navigate('/apps/training/trainings/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating training', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateTraining() {
		createTraining(getValues())
			// .unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveTraining');

						reset({
							passenger: 'all',
							medical_center: 'all',
							medical_serial_no: '',
							medical_result: medicalResults.find((data) => data.default)?.id || '',
							medical_card: doneNotDone.find((data) => data.default)?.id || '',
							medical_exam_date: '',
							medical_report_date: '',
							medical_issue_date: '',
							medical_expiry_date: '',
							notes: '',
							slip_pic: '',
							medical_card_pic: '',
							current_status: 'all'
						});
						navigate('/apps/training/trainings/new');
						AddedSuccessfully();
					}
				}
			});
	}

	function handleRemoveTraining() {
		removeTraining(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						reset({
							passenger: 'all',
							medical_center: 'all',
							medical_serial_no: '',
							medical_result: medicalResults.find((data) => data.default)?.id || '',
							medical_card: doneNotDone.find((data) => data.default)?.id || '',
							medical_exam_date: '',
							medical_report_date: '',
							medical_issue_date: '',
							medical_expiry_date: '',
							notes: '',
							slip_pic: '',
							medical_card_pic: '',
							current_status: 'all'
						});
						localStorage.setItem('medicalAlert', 'saveTraining');
						navigate('/apps/training/trainings/new');
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
		reset({
			passenger: 'all',
			medical_center: 'all',
			medical_serial_no: '',
			medical_result: medicalResults.find((data) => data.default)?.id || '',
			medical_card: doneNotDone.find((data) => data.default)?.id || '',
			medical_exam_date: '',
			medical_report_date: '',
			medical_issue_date: '',
			medical_expiry_date: '',
			notes: '',
			slip_pic: '',
			medical_card_pic: '',
			current_status: 'all'
		});
		navigate('/apps/training/trainings/new');
	};

	useEffect(() => {
		if (trainingId === 'new') {
			reset({
				passenger: 'all',
				medical_center: 'all',
				medical_serial_no: '',
				medical_result: medicalResults.find((data) => data.default)?.id || '',
				medical_card: doneNotDone.find((data) => data.default)?.id || '',
				medical_exam_date: '',
				medical_report_date: '',
				medical_issue_date: '',
				medical_expiry_date: '',
				notes: '',
				slip_pic: '',
				medical_card_pic: '',
				current_status: 'all'
			});
		}
	}, [trainingId, reset]);
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
								{routeParams.trainingId === 'new'
									? 'Create New Training'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.trainingId !== 'new' && 'Trainings Detail'}
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
				{(routeParams.trainingId === 'new' ||
					(sessionStorage.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields)}
						onClick={handleCreateTraining}
					>
						Save
					</Button>
				)}

				{routeParams?.trainingId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
							variant="contained"
							onClick={handleUpdateTraining}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Update
						</Button>
					)}

				{routeParams?.trainingId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
							variant="contained"
							onClick={handleRemoveTraining}
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

export default TrainingHeader;
