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
	useCreateMusanedOkalaMutation,
	useDeleteMusanedOkalaMutation,
	useUpdateMusanedOkalaMutation
} from '../MusanedOkalasApi';

/**
 * The musanedOkala header.
 */
function MusanedOkalaHeader() {
	const routeParams = useParams();
	const { musanedOkalaId } = routeParams;
	const [createMusanedOkala] = useCreateMusanedOkalaMutation();
	const [saveMusanedOkala] = useUpdateMusanedOkalaMutation();
	const [removeMusanedOkala] = useDeleteMusanedOkalaMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteMusanedOkala');
	const handleUpdate = localStorage.getItem('updateMusanedOkala');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateMusanedOkala() {
		saveMusanedOkala(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'updateMusanedOkala');

						reset({
							passenger: 'all',
							musaned_no: '',
							musaned_date: '',
							musaned_status: doneNotDone.find((data) => data.default)?.id,
							okala_status: doneNotDone.find((data) => data.default)?.id,

							musaned_given_by: '',
							okala_no: '',
							okala_date: '',
							okala_given_by: '',
							current_status: ''
						});

						UpdatedSuccessfully();
						navigate('/apps/musanedOkala-management/musanedOkalas/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating musanedOkala', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateMusanedOkala() {
		createMusanedOkala(getValues())
			// .unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveMusanedOkala');

						reset({
							passenger: 'all',
							musaned_no: '',
							musaned_date: '',
							musaned_status: doneNotDone.find((data) => data.default)?.id,
							okala_status: doneNotDone.find((data) => data.default)?.id,

							musaned_given_by: '',
							okala_no: '',
							okala_date: '',
							okala_given_by: '',
							current_status: ''
						});
					}

					navigate('/apps/musanedOkala-management/musanedOkalas/new');
					AddedSuccessfully();
				}
			});
	}

	function handleRemoveMusanedOkala() {
		removeMusanedOkala(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						reset({
							passenger: 'all',
							musaned_no: '',
							musaned_date: '',
							musaned_status: doneNotDone.find((data) => data.default)?.id,
							okala_status: doneNotDone.find((data) => data.default)?.id,

							musaned_given_by: '',
							okala_no: '',
							okala_date: '',
							okala_given_by: '',
							current_status: ''
						});
						localStorage.setItem('medicalAlert', 'saveMusanedOkala');
						navigate('/apps/musanedOkala-management/musanedOkalas/new');

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
			musaned_no: '',
			musaned_date: '',
			musaned_status: doneNotDone.find((data) => data.default)?.id,
			okala_status: doneNotDone.find((data) => data.default)?.id,

			musaned_given_by: '',
			okala_no: '',
			okala_date: '',
			okala_given_by: '',
			current_status: ''
		});
		navigate('/apps/musanedOkala-management/musanedOkalas/new');
	};

	useEffect(() => {
		if (musanedOkalaId === 'new') {
			reset({
				passenger: 'all',
				musaned_no: '',
				musaned_date: '',
				musaned_status: doneNotDone.find((data) => data.default)?.id,
				okala_status: doneNotDone.find((data) => data.default)?.id,

				musaned_given_by: '',
				okala_no: '',
				okala_date: '',
				okala_given_by: '',
				current_status: ''
			});
		}
	}, [musanedOkalaId, reset]);
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
								{routeParams.musanedOkalaId === 'new'
									? 'Create New MusanedOkala'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.musanedOkalaId !== 'new' && 'MusanedOkalas Detail'}
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
				{(routeParams.musanedOkalaId === 'new' ||
					(sessionStorage.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields)}
						onClick={handleCreateMusanedOkala}
					>
						Save
					</Button>
				)}

				{routeParams?.musanedOkalaId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
							variant="contained"
							onClick={handleUpdateMusanedOkala}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Update
						</Button>
					)}

				{routeParams?.musanedOkalaId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
							variant="contained"
							onClick={handleRemoveMusanedOkala}
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

export default MusanedOkalaHeader;
