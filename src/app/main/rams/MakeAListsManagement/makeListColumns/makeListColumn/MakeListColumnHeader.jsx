import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useUpdateMakeListColumnMutation } from '../MakeListColumnApi';

function MakeListColumnHeader() {
	const routeParams = useParams();
	console.log('routeParams', routeParams);

	const [saveMakeListColumn] = useUpdateMakeListColumnMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();

	function handleUpdateMakeListColumn() {
		const expendedData = {
			id: routeParams.makeAListId,
			...getValues()
		};

		console.log('expendedData', expendedData);
		saveMakeListColumn(expendedData)
			.unwrap()
			.then(() => {
				AddedSuccessfully();
				navigate(`/apps/makeAList/makeALists`);
			})
			.catch((error) => {
				console.error('Failed to create make a list column:', error);
			});
	}

	function handleCancel() {
		navigate(`/apps/makeAList/makeALists`);
	}

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
							variant="caption"
							className="text-2xl font-bold"
						>
							{routeParams?.['*']}
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300"
					color="secondary"
					variant="contained"
					onClick={handleUpdateMakeListColumn}
				>
					Save
				</Button>

				<Button
					className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
					variant="contained"
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default MakeListColumnHeader;
