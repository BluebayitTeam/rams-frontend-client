import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

function ManpowerNoteSheetFemaleHeader() {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.3 } }}
						>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								Note Sheet Female
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManpowerNoteSheetFemaleHeader;
