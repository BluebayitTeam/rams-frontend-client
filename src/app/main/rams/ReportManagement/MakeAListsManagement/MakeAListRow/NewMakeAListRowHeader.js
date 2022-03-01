import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const NewMakeAListRowHeader = () => {
	const theme = useTheme();

	const routeParams = useParams();

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center"
						component={Link}
						role="button"
						to="/apps/makeAList-management/makeALists"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">MakeAListRows</span>
					</Typography>
				</motion.div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Typography className="text-16 sm:text-20 truncate font-semibold mr-5">
					{routeParams.makeAListName}
				</Typography>
			</motion.div>
		</div>
	);
};

export default NewMakeAListRowHeader;
