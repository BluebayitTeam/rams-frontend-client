import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const NewKsaVisaHeader = () => {
	const methods = useFormContext();
	const { watch } = methods;
	const name = watch('name');

	// function handleSaveKsaVisa() {
	// 	dispatch(saveKsaVisa(getValues())).then(res => {
	// 		console.log('saveKsaVisaRes', res);
	// 		if (res.payload?.data?.id) {
	// 			localStorage.setItem('ksaVisaAlert', 'saveKsaVisa');
	// 			history.push('/apps/ksaVisa-management/ksaVisas');
	// 		}
	// 	});
	// }

	// function handleUpdateKsaVisa() {
	// 	dispatch(updateKsaVisa(getValues())).then(res => {
	// 		console.log('updateKsaVisaRes', res);
	// 		if (res.payload?.data?.id) {
	// 			localStorage.setItem('ksaVisaAlert', 'updateKsaVisa');
	// 			history.push('/apps/ksaVisa-management/ksaVisas');
	// 		}
	// 	});
	// }

	// function handleRemoveKsaVisa() {
	// 	dispatch(removeKsaVisa(getValues())).then(res => {
	// 		console.log('removeKsaVisaRes', res);
	// 		if (res.payload) {
	// 			localStorage.removeItem('ksaVisaEvent');
	// 			localStorage.setItem('ksaVisaAlert', 'deleteKsaVisa');
	// 			history.push('/apps/ksaVisa-management/ksaVisas');
	// 		}
	// 	});
	// }

	// function handleCancel() {
	// 	history.push('/apps/ksaVisa-management/ksaVisas');
	// }

	// useEffect(() => {
	// 	const handleSaveAndUpdate = e => {
	// 		if (e.key === 'Enter') {
	// 			if (routeParams.ksaVisaId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
	// 				isShouldFormSave(e) && handleSaveKsaVisa();
	// 			} else if (handleDelete !== 'Delete' && routeParams?.ksaVisaName) {
	// 				isShouldFormUpdate(e) && handleUpdateKsaVisa();
	// 			} else if (handleDelete == 'Delete' && routeParams.ksaVisaId !== 'new') {
	// 				handleRemoveKsaVisa();
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
						to="/apps/ksaVisa-management/ksaVisas"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">KsaVisas</span>
					</Typography>
				</motion.div> */}

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'KsaVisa Form'}
							</Typography>
							{/* <Typography variant="caption" className="font-medium">
								KsaVisa Form
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
						Do you want to remove this KsaVisa?
					</Typography>
				)}
				{handleDelete == 'Delete' && routeParams.ksaVisaId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveKsaVisa}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{routeParams.ksaVisaId == 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSaveKsaVisa}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'Delete' && routeParams?.ksaVisaName && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateKsaVisa}
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

export default NewKsaVisaHeader;
