import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import {
	AddedSuccessfully,
	CustomNotification,
	DeletedSuccessfully,
	UpdatedSuccessfully
} from 'src/app/@customHooks/notificationAlert';
import { useDispatch } from 'react-redux';
import {
	useCreatePermissionMutation,
	useDeletePermissionMutation,
	useUpdatePermissionMutation
} from '../PermissionsApi';

/**
 * The permission header.
 */
function PermissionHeader() {
	const dispatch = useDispatch();

	const routeParams = useParams();
	const { permissionId } = routeParams;
	const [createPermission] = useCreatePermissionMutation();
	const [savePermission] = useUpdatePermissionMutation();
	const [removePermission] = useDeletePermissionMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deletePermission');
	const handleUpdate = localStorage.getItem('updatePermission');

	function handleUpdatePermission() {
		savePermission(getValues()).then((data) => {
			UpdatedSuccessfully();
			navigate(`/apps/permission/permissions`);
		});
	}

	function handleCreatePermission() {
		createPermission(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/permission/permissions`);
			});
	}

	// function handleRemovePermission(dispatch) {
	// 	debugger;
	// 	try {
	// 		removePermission(permissionId);

	// 		if (permissionId) {
	// 			DeletedSuccessfully();
	// 		}

	// 		navigate('/apps/permission/permissions');
	// 	} catch (error) {
	// 		// Handle the error here
	// 		console.error('Errodfsdfdsfsdfsdfdsr', error);
	// 	}
	// }

	function handleRemovePermission() {
		removePermission(permissionId)
			.unwrap()
			.then((data) => {
				if (data) {
					DeletedSuccessfully();
				}

				navigate('/apps/permission/permissions');
			})
			.catch((error) => {
				CustomNotification('error', `${error.response.data.detail}`);
			});
	}

	function handleCancel() {
		navigate(`/apps/permission/permissions`);
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opapermission: 0 }}
					animate={{ x: 0, opapermission: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/permission-management/permissions"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Permissions</span>
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
								Permission Detail
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
				{handleDelete === 'deletePermission' && permissionId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this permission?
					</Typography>
				)}
				{handleDelete === 'deletePermission' && permissionId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemovePermission}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{permissionId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreatePermission}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deletePermission' &&
					handleUpdate === 'updatePermission' &&
					permissionId !== 'new' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdatePermission}
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

export default PermissionHeader;
