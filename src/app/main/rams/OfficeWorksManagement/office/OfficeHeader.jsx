import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
import { useCreateOfficeMutation, useDeleteOfficeMutation, useUpdateOfficeMutation } from '../OfficesApi';

/**
 * The office header.
 */
function OfficeHeader() {
	const routeParams = useParams();
	const { officeId } = routeParams;
	const [createOffice] = useCreateOfficeMutation();
	const [saveOffice] = useUpdateOfficeMutation();
	const [removeOffice] = useDeleteOfficeMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteOffice');
	const handleUpdate = localStorage.getItem('updateOffice');
	const passengers = useSelector((state) => state.data.passengers);

	function handleUpdateOffice() {
		saveOffice(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/office/offices/new`);
		});
	}

	function handleCreateOffice() {
		createOffice(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/office/offices/new`);
			});
	}

	function handleRemoveOffice(dispatch) {
		removeOffice(officeId);
		DeletedSuccessfully();
		navigate('/apps/office/offices');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/office/offices/new`);
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
								{routeParams.officeId === 'new'
									? 'Create New Office'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.officeId !== 'new' && 'Offices Detail'}
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
			>
				{handleDelete === 'deleteOffice' && officeId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this office?
					</Typography>
				)}
				{handleDelete === 'deleteOffice' && officeId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-1 "
						variant="contained"
						color="secondary"
						onClick={handleRemoveOffice}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						// style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{officeId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4 "
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateOffice}
					>
						Save
					</Button>
				)}

				{/* {(routeParams.officeId === 'new' ||
					(sessionStorage?.getItem('operation') === 'save' && watch('passenger'))) && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateOffice}
					>
						Save
					</Button>
				)} */}

				{handleDelete !== 'deleteOffice' && handleUpdate === 'updateOffice' && officeId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300"
						color="secondary"
						variant="contained"
						// style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateOffice}
					>
						Update
					</Button>
				)}
				<Button
					className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
					variant="contained"
					// style={{ backgroundColor: '#FFAA4C', color: 'white' }}
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default OfficeHeader;
