import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
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
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const passengers = useSelector((state) => state.data.passengers);
	const userRole = localStorage.getItem('userRole');

	// const handleDelete = localStorage.getItem('deleteMedical');
	// const handleUpdate = localStorage.getItem('updateMedical');

	// function handleUpdateMedical() {
	// 	saveMedical(getValues()).then((data) => {
	// 		UpdatedSuccessfully();

	// 		navigate(`/apps/medical/medicals`);
	// 	});
	// }

	function handleUpdateMedical() {
		saveMedical(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/medical/medicals`);
		});
	}

	// function handleCreateMedical() {
	// 	createMedical(getValues())
	// 		.unwrap()
	// 		.then((data) => {
	// 			AddedSuccessfully();

	// 			navigate(`/apps/medical/medicals`);
	// 		});
	// }

	function handleSaveMedical() {
		createMedical(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/medical/medicals`);
			});
	}

	// function handleRemoveMedical(dispatch) {
	// 	removeMedical(medicalId);
	// 	DeletedSuccessfully();
	// 	navigate('/apps/medical/medicals');
	// 	dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	// }

	function handleRemoveMedical(dispatch) {
		removeMedical(medicalId);
		DeletedSuccessfully();
		navigate('/apps/medical/medicals');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/medical/medicals`);
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
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
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSaveMedical}
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
					sessionStorage.getItem('operation') != 'save' && (
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveMedical}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
							style={{
								backgroundColor: '#ea5b78',
								color: 'white',
								display: userRole === 'ADMIN' || userRole === 'admin' ? 'flex' : 'none'
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
