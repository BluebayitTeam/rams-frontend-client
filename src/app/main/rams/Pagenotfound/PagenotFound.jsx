import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function PagenotFound() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center p-16">
			<div className="max-w-512 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
				>
					<Typography
						variant="h1"
						color="inherit"
						className="font-medium mb-16"
					>
						404
					</Typography>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
				>
					<Typography
						variant="h5"
						color="textSecondary"
						className="mb-16 font-normal"
					>
						Sorry but we could not find the page you are looking for
					</Typography>
				</motion.div>

				<Link
					className="font-normal"
					to="/apps/dashboards/project"
				>
					Go back to dashboard
				</Link>
			</div>
		</div>
	);
}

export default PagenotFound;
