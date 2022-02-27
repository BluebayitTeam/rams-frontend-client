import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { removeRole, saveRole, updateRole } from '../store/roleSlice';

const NewRoleHeader = () => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { getValues, watch, setError } = methods;
	const name = watch('name');
	const permissions = watch('permissions');
	console.log(permissions);
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();

	const handleDelete = localStorage.getItem('deleteRole');
	const handleUpdate = localStorage.getItem('updateRole');

	function handleSaveRole() {
		dispatch(saveRole(getValues())).then(res => {
			if (res.payload.data?.id) {
				localStorage.setItem('roleAlertPermission', 'saveRoleSuccessfully');
				history.push('/apps/roles-management/roles');
			} else if (res.payload.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
				console.log(res.payload.data.detail);
			}
		});
	}

	function handleUpdateRole() {
		dispatch(updateRole(getValues())).then(res => {
			console.log('updateRoleRes', res);
			if (res.payload.data?.id) {
				localStorage.setItem('roleAlert', 'updateRole');
				history.push('/apps/roles-management/roles');
			} else if (res.payload.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
				console.log(res.payload.data.detail);
			}
		});
	}

	function handleRemoveRole() {
		dispatch(removeRole(getValues())).then(res => {
			console.log('removeRoleRes', res);
			if (res.payload) {
				localStorage.removeItem('roleEvent');
				localStorage.setItem('roleAlert', 'deleteRole');
				history.push('/apps/roles-management/roles');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/roles-management/roles');
	}

	// if (loading) {
	//     return <FuseLoading />;
	// }

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-2"
						component={Link}
						role="button"
						to="/apps/roles-management/roles"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Roles</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					></motion.div>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Create New Role'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Roles Detail
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
				{handleDelete === 'deleteRole' && (
					<Typography className="mt-6" variant="subtitle2">
						Do you want to remove this Roles?
					</Typography>
				)}
				{handleDelete === 'deleteRole' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveRole}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{handleDelete !== 'deleteRole' && routeParams.roleId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={!name || _.isEmpty(permissions)}
						onClick={handleSaveRole}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteRole' && handleUpdate === 'updateRole' && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						//disabled={_.isEmpty(dirtyFields) || !isValid}
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateRole}
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
};

export default NewRoleHeader;
