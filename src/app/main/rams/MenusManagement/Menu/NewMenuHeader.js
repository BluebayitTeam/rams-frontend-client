import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { removeMenu, saveMenu, updateMenu } from '../store/menuSlice';

const NewMenuHeader = () => {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();

	const handleDelete = localStorage.getItem('menuEvent');

	function handleSaveMenu() {
		dispatch(saveMenu(getValues())).then(res => {
			console.log('saveMenuRes', res);
			if (res.payload) {
				localStorage.setItem('menuAlert', 'saveMenu');
				history.push('/apps/menu-management/menus');
			}
		});
	}

	function handleUpdateMenu() {
		dispatch(updateMenu(getValues())).then(res => {
			console.log('updateMenuRes', res);
			if (res.payload) {
				localStorage.setItem('menuAlert', 'updateMenu');
				history.push('/apps/menu-management/menus');
			}
		});
	}

	function handleRemoveMenu() {
		dispatch(removeMenu(getValues())).then(res => {
			if (res.payload) {
				localStorage.removeItem('menuEvent');
				localStorage.setItem('menuAlert', 'deleteMenu');
				history.push('/apps/menu-management/menus');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/menu-management/menus');
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-2"
						component={Link}
						role="button"
						to="/apps/menu-management/menus"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Menus</span>
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
								{name || 'Create New Menu'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Menus Detail
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
				{handleDelete == 'Delete' && (
					<Typography className="mt-6" variant="subtitle2">
						Do you want to remove this Menu?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.menuId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveMenu}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.menuId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSaveMenu}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.menuName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateMenu}
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

export default NewMenuHeader;
