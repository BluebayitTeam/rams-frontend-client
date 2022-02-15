// import _ from '@lodash';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import { useTheme } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import isShouldFormSave from 'app/@helpers/isShouldFormSave';
// import isShouldFormUpdate from 'app/@helpers/isShouldFormUpdate';
// import { motion } from 'framer-motion';
// import React, { useEffect } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory, useParams } from 'react-router-dom';
// import { removeBmet, saveBmet, updateBmet } from '../store/bmetSlice';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

const NewBmetHeader = () => {
	const bmet = useSelector(({ bmetsManagement }) => bmetsManagement.bmet);
	const name = bmet?.passenger?.[0]?.passenger_name;

	// function handleSaveBmet() {
	// 	dispatch(saveBmet(getValues())).then(res => {
	// 		console.log('saveBmetRes', res);
	// 		if (res.payload?.data?.id) {
	// 			localStorage.setItem('bmetAlert', 'saveBmet');
	// 			history.push('/apps/bmet-management/bmets');
	// 		}
	// 	});
	// }

	// function handleUpdateBmet() {
	// 	dispatch(updateBmet(getValues())).then(res => {
	// 		console.log('updateBmetRes', res);
	// 		if (res.payload?.data?.id) {
	// 			localStorage.setItem('bmetAlert', 'updateBmet');
	// 			history.push('/apps/bmet-management/bmets');
	// 		}
	// 	});
	// }

	// function handleRemoveBmet() {
	// 	dispatch(removeBmet(getValues())).then(res => {
	// 		console.log('removeBmetRes', res);
	// 		if (res.payload) {
	// 			localStorage.removeItem('bmetEvent');
	// 			localStorage.setItem('bmetAlert', 'deleteBmet');
	// 			history.push('/apps/bmet-management/bmets');
	// 		}
	// 	});
	// }

	// function handleCancel() {
	// 	history.push('/apps/bmet-management/bmets');
	// }

	// useEffect(() => {
	// 	const handleSaveAndUpdate = e => {
	// 		if (e.key === 'Enter') {
	// 			if (routeParams.bmetId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
	// 				isShouldFormSave(e) && handleSaveBmet();
	// 			} else if (handleDelete !== 'Delete' && routeParams?.bmetName) {
	// 				isShouldFormUpdate(e) && handleUpdateBmet();
	// 			} else if (handleDelete == 'Delete' && routeParams.bmetId !== 'new') {
	// 				handleRemoveBmet();
	// 			}
	// 		}
	// 	};

	// 	window.addEventListener('keydown', handleSaveAndUpdate);

	// 	return () => window.removeEventListener('keydown', handleSaveAndUpdate);
	// }, [dirtyFields, isValid]);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				{/* <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/bmet-management/bmets"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Bmets</span>
					</Typography>
				</motion.div> */}

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Bmet Form'}
							</Typography>
							{/* <Typography variant="caption" className="font-medium">
								Bmet Form
							</Typography> */}
						</motion.div>
					</div>
				</div>
			</div>
			{/* <motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete == 'Delete' && (
					<Typography className="mt-6" variant="subtitle2">
						Do you want to remove this Bmet?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.bmetId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveBmet}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.bmetId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSaveBmet}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.bmetName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateBmet}
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
			</motion.div> */}
		</div>
	);
};

export default NewBmetHeader;
