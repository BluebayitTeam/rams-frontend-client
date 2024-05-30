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
							finger_status: doneNotDone.find((data) => data.default)?.id,
							passenger: 'all',
							police_clearance_no: '',
							police_clearance_date: '',
							driving_license_no: '',
							driving_license_date: '',
							finger_no: '',
							finger_date: '',
							certificate_experience: '',
							current_status: 'all'
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
		createOfficeWork(getValues())
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
						reset({
							passenger: 'all',
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id,
							police_clearance_no: '',
							police_clearance_date: '',
							driving_license_no: '',
							driving_license_date: '',
							finger_no: '',
							finger_date: '',
							certificate_experience: '',
							current_status: 'all'
						});
						navigate('/apps/officeWork/officeWorks/new');
						AddedSuccessfully();
					}
				}
			});
	}

	function handleRemoveOfficeWork() {
		removeOfficeWork(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						reset({
							passenger: 'all',
							police_clearance_no: '',
							police_clearance_date: '',
							driving_license_no: '',
							driving_license_date: '',
							finger_no: '',
							finger_date: '',
							certificate_experience: '',
							current_status: 'all',
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id
						});
						localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
						navigate('/apps/officeWork/officeWorks/new');

						dispatch(showMessage({ message: 'Please Restart The Backend', variant: 'error' }));
					}
				}

				RemoveSuccessfully();
			})
			.catch((error) => {
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCancel() {
		reset({
			passenger: 'all',
			police_clearance_no: '',
			police_clearance_date: '',
			driving_license_no: '',
			driving_license_date: '',
			finger_no: '',
			finger_date: '',
			certificate_experience: '',
			current_status: 'all',
			police_clearance_status: doneNotDone.find((data) => data.default)?.id,
			driving_license_status: doneNotDone.find((data) => data.default)?.id,
			finger_status: doneNotDone.find((data) => data.default)?.id
		});
		navigate('/apps/officeWork/officeWorks/new');
	}

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
							className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
							variant="contained"
							onClick={handleUpdateOfficeWork}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Update
						</Button>
					)}

				{routeParams?.officeWorkId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
							variant="contained"
							onClick={handleRemoveOfficeWork}
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

export default OfficeWorkHeader;
