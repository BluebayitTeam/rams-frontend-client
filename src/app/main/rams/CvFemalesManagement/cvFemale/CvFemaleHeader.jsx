import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import _ from 'lodash';
import { useCreateCvFemaleMutation, useDeleteCvFemaleMutation, useUpdateCvFemaleMutation } from '../CvFemalesApi';

/**
 * The cvFemale header.
 */
function CvFemaleHeader() {
	const routeParams = useParams();
	const { cvFemaleId } = routeParams;
	const [createCvFemale] = useCreateCvFemaleMutation();
	const [saveCvFemale] = useUpdateCvFemaleMutation();
	const [removeCvFemale] = useDeleteCvFemaleMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, image, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteCvFemale');
	const handleUpdate = localStorage.getItem('updateCvFemale');

	// console.log('image', image);

	function handleUpdateCvFemale() {
		saveCvFemale(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/cvFemale/cvFemales`);
		});
	}

	function handleCreateCvFemale() {
		createCvFemale(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/cvFemale/cvFemales`);
			});
	}

	function handleRemoveCvFemale(dispatch) {
		removeCvFemale(cvFemaleId);
		DeletedSuccessfully();
		navigate('/apps/cvFemale/cvFemales');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/cvFemale/cvFemales`);
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/cvFemale/cvFemales"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Female CV</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'Create New Female CV'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Female CV Detail
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
			>
				{handleDelete === 'deleteCvFemale' && cvFemaleId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-1 "
						variant="contained"
						color="secondary"
						onClick={handleRemoveCvFemale}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						// style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{cvFemaleId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4 "
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateCvFemale}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteCvFemale' && handleUpdate === 'updateCvFemale' && cvFemaleId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300"
						color="secondary"
						variant="contained"
						// style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateCvFemale}
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

export default CvFemaleHeader;
