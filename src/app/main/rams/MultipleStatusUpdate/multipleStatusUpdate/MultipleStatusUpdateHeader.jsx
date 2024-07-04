import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useCreateMultipleStatusUpdateMutation } from '../MultipleStatusUpdatesApi';

/**
 * The MultipleStatusUpdate header.
 */
function MultipleStatusUpdateHeader({ handleReset }) {
	const routeParams = useParams();
	const { MultipleStatusUpdateId } = routeParams;
	const [createMultipleStatusUpdate] = useCreateMultipleStatusUpdateMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();

	const handleDelete = localStorage.getItem('deleteMultipleStatusUpdate');
	const handleUpdate = localStorage.getItem('updateMultipleStatusUpdate');

	const visaEntry = watch('visa_entry');
	const isFormSave = watch('is_form_save');

	function handleCreateMultipleStatusUpdate() {
		createMultipleStatusUpdate(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();
				handleReset();
				navigate(`/multipleStatusUpdate/multipleStatusUpdates/new`);
			});
	}

	function handleCancel() {
		handleReset();
		navigate(`/apps/multipleStatusUpdate/multipleStatusUpdates/new`);
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							Multiple Visa Entry
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
			>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color={visaEntry ? 'secondary' : 'primary'}
					onClick={handleCreateMultipleStatusUpdate}
					disabled={!isFormSave}
				>
					Save
				</Button>

				<Button
					className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
					variant="contained"
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default MultipleStatusUpdateHeader;
