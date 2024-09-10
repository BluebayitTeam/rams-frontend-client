import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

/**
 * The manpowerSubmissionList header.
 */
function ManpowerSubmissionListHeader() {
	const routeParams = useParams();
	const { manpowerSubmissionListId } = routeParams;
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const { name } = watch();

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'Create New Manpower Submission List'}
						</Typography>
					</motion.div>
				</div>
			</div>

			{/* <motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete === 'deleteManpowerSubmissionList' && manpowerSubmissionListId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this manpowerSubmissionList?
					</Typography>
				)}
				{handleDelete === 'deleteManpowerSubmissionList' && manpowerSubmissionListId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveManpowerSubmissionList}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{manpowerSubmissionListId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateManpowerSubmissionList}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteManpowerSubmissionList' &&
					handleUpdate === 'updateManpowerSubmissionList' &&
					manpowerSubmissionListId !== 'new' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdateManpowerSubmissionList}
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
}

export default ManpowerSubmissionListHeader;
