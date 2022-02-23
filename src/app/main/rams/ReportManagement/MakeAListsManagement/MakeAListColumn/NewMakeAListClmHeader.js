import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isShouldFormUpdate from 'app/@helpers/isShouldFormUpdate';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateMakeAListClms } from '../store/makeAListClmSlice';

const NewMakeAListClmHeader = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const history = useHistory();

	const routeParams = useParams();

	function handleUpdateMakeAListClm() {
		dispatch(updateMakeAListClms(routeParams.makeAListId)).then(res => {
			console.log('updateMakeAListClmRes', res);
			if (!res.payload.make_list) {
				localStorage.setItem('makeAListClmAlert', 'updateMakeAListClm');
				history.push('/apps/makeAList-management/makeALists');
			}
		});
	}

	function handleCancel() {
		history.push('/apps/makeAList-management/makeALists');
	}

	useEffect(() => {
		const handleSaveAndUpdate = e => {
			if (e.key === 'Enter') isShouldFormUpdate(e) && handleUpdateMakeAListClm();
		};
		window.addEventListener('keydown', handleSaveAndUpdate);
		return () => window.removeEventListener('keydown', handleSaveAndUpdate);
	}, []);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center"
						component={Link}
						role="button"
						to="/apps/makeAListClm-management/makeAListClms"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">MakeAListClms</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{routeParams.makeAListName}
							</Typography>
							<Typography variant="caption" className="font-medium">
								MakeAListClm Detail
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
				<Button
					className="whitespace-nowrap mx-4"
					color="secondary"
					variant="contained"
					style={{ backgroundColor: '#4dc08e', color: 'white' }}
					onClick={handleUpdateMakeAListClm}
				>
					Update
				</Button>
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

export default NewMakeAListClmHeader;
