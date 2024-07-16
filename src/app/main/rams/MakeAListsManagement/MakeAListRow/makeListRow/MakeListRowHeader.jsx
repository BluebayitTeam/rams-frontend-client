import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function MakeListRowHeader() {
	const theme = useTheme();

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography
							className="flex items-center sm:mb-12"
							component={Link}
							role="button"
							to="/apps/makeAList/makeALists"
							color="inherit"
						>
							<FuseSvgIcon size={20}>
								{theme.direction === 'ltr'
									? 'heroicons-outline:arrow-sm-left'
									: 'heroicons-outline:arrow-sm-right'}
							</FuseSvgIcon>
							<Typography
								variant="caption"
								className="text-2xl font-bold"
							>
								Make A List Rows
							</Typography>
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<div className="flex items-center max-w-full" />
			</motion.div>
		</div>
	);
}

export default MakeListRowHeader;
