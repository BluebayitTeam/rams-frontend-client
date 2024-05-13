import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import history from '@history';
import _ from 'lodash';
import { useCreateMedicalMutation, useDeleteMedicalMutation, useUpdateMedicalMutation } from '../MedicalsApi';

/**
 * The medical header.
 */
function MedicalHeader() {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;

	const routeParams = useParams();
	const { fromSearch } = useParams();

	const passengers = useSelector((state) => state.data.passengers);
	const [saveMedical] = useCreateMedicalMutation();
	const [removeMedical] = useDeleteMedicalMutation();

	const [updateMedical] = useUpdateMedicalMutation();

	function handleSaveMedical() {
		saveMedical(getValues()).then((res) => {
			if (res.payload?.data?.id) {
				if (fromSearch) {
					history.goBack();
				} else {
					localStorage.setItem('medicalAlert', 'saveMedical');
					history.push('/apps/medical/medicals/new');
					reset({
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
					// dispatch(setAlert(saveAlertMsg));
				}
			}
		});
	}

	function handleUpdateMedical() {
		updateMedical(getValues()).then((res) => {
			if (res.payload?.data?.id) {
				if (fromSearch) {
					history.goBack();
				} else {
					localStorage.setItem('medicalAlert', 'updateMedical');
					history.push('/apps/medical/medicals/new');
					reset({
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
					// dispatch(setAlert(updateAlertMsg));
				}
			}
		});
	}

	// function handleUpdateMedical() {
	// 	updateMedical(getValues()).then((data) => {
	// 		UpdatedSuccessfully();

	// 		navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
	// 	});
	// }

	function handleRemoveMedical() {
		removeMedical(getValues()).then((res) => {
			if (res.payload) {
				if (fromSearch) {
					history.goBack();
				} else {
					localStorage.setItem('medicalAlert', 'deleteMedical');
					history.push('/apps/medical/medicals/new');
					reset({
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
					// dispatch(setAlert(removeAlertMsg));
				}
			}
		});
	}

	function handleCancel() {
		if (fromSearch) {
			history.goBack();
		} else {
			history.push('/apps/medical/medicals/new');
			reset({
				medical_card: doneNotDone.find((data) => data.default)?.id,
				medical_result: medicalResults.find((data) => data.default)?.id
			});
		}
	}

	const userRole = localStorage.getItem('userRole');

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
					sessionStorage.getItem('operation') !== 'save' && (
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
