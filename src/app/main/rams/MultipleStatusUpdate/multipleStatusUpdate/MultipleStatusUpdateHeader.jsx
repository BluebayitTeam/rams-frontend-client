import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import _ from '@lodash';
import { useCreateMultipleStatusUpdateMutation } from '../MultipleStatusUpdatesApi';

/**
 * The multipleStatusUpdate header.
 */
function MultipleStatusUpdateHeader({ handleReset }) {
	const routeParams = useParams();
	const { multipleStatusUpdateId } = routeParams;
	const [saveDocumentSend] = useCreateMultipleStatusUpdateMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();

	const { passenger } = watch();
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const name = watch('name');

	useEffect(() => {
		setIsButtonDisabled(!passenger);
	}, [passenger]);

	function handleSaveMultipleStatusUpdate() {
		saveDocumentSend(getValues()).then((res) => {
			CustomNotification('success', 'Multiple Status UpdateSuccessfully..');
			handleReset({ email: '' });
		});
	}

	function handleCancelMultipleStatusUpdate() {
		handleReset({});

		handleReset({ date: '' });
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex flex-col items-start max-w-full min-w-0">
					<div className="flex items-center max-w-full">
						<motion.div
							className="hidden sm:flex"
							initial={{ scale: 0 }}
							animate={{ scale: 1, transition: { delay: 0.3 } }}
						/>

						<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
							<motion.div
								initial={{ x: -20 }}
								animate={{ x: 0, transition: { delay: 0.3 } }}
							>
								<span className="hidden sm:flex mx-4 font-medium">Multiple Status Update</span>
								<Typography className="text-16 sm:text-20 truncate font-semibold">
									{name || 'Create Multiple Status Update'}
								</Typography>
								<Typography
									variant="caption"
									className="font-medium"
								>
									Multiple Status Update Detail
								</Typography>
							</motion.div>
						</div>
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
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSaveMultipleStatusUpdate}
				>
					Save
				</Button>

				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					style={{ backgroundColor: '#FFAA4C', color: 'white' }}
					onClick={handleCancelMultipleStatusUpdate}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default MultipleStatusUpdateHeader;
