import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useCreateAirwayMutation, useDeleteAirwayMutation, useUpdateAirwayMutation } from '../AirwaysApi';

/**
 * The airway header.
 */
function AirwayHeader() {
	const routeParams = useParams();
	const { airwayId } = routeParams;
	const [createAirway] = useCreateAirwayMutation();
	const [saveAirway] = useUpdateAirwayMutation();
	const [removeAirway] = useDeleteAirwayMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteAirway');
	const handleUpdate = localStorage.getItem('updateAirway');

	function handleUpdateAirway() {
		saveAirway(getValues()).then((data) => {
			UpdatedSuccessfully();
			navigate(`/apps/airway/airways`);
		});
	}

	function handleCreateAirway() {
		createAirway(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/airway/airways`);
			});
	}

	function handleRemoveAirway(dispatch) {
		removeAirway(airwayId);
		DeletedSuccessfully();
		navigate('/apps/airway/airways');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/airway/airways`);
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opaairway: 0 }}
					animate={{ x: 0, opaairway: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/airway-management/airways"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Airways</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					/>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.3 } }}
						>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New'}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								Airway Detail
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
				{handleDelete === 'deleteAirway' && airwayId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this airway?
					</Typography>
				)}
				{handleDelete === 'deleteAirway' && airwayId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveAirway}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{airwayId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateAirway}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteAirway' && handleUpdate === 'updateAirway' && airwayId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateAirway}
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
}

export default AirwayHeader;
