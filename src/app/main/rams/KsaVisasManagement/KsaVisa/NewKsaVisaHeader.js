import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

const NewKsaVisaHeader = () => {
	const data = useSelector(({ ksaVisasManagement }) => ksaVisasManagement.ksaVisa);
	const name = data?.passenger?.[0]?.passenger_name;

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'KsaVisa Form'}
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewKsaVisaHeader;
