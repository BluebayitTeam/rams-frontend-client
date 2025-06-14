import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import {
	useCreateSubscriptionLoanMutation,
	useDeleteSubscriptionLoanMutation,
	useUpdateSubscriptionLoanMutation
} from '../SubscriptionLoansApi';

/**
 * The subscriptionLoan header.
 */
function SubscriptionLoanHeader() {
	const routeParams = useParams();
	const { subscriptionLoanId } = routeParams;
	const [createSubscriptionLoan] = useCreateSubscriptionLoanMutation();
	const [saveSubscriptionLoan] = useUpdateSubscriptionLoanMutation();
	const [removeSubscriptionLoan] = useDeleteSubscriptionLoanMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteSubscriptionLoan');
	const handleUpdate = localStorage.getItem('updateSubscriptionLoan');

	function handleUpdateSubscriptionLoan() {
		saveSubscriptionLoan(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/subscriptionLoan/subscriptionLoans`);
		});
	}

	function handleCreateSubscriptionLoan() {
		createSubscriptionLoan(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/subscriptionLoan/subscriptionLoans`);
			});
	}

	function handleRemoveSubscriptionLoan(dispatch) {
		removeSubscriptionLoan(subscriptionLoanId);
		DeletedSuccessfully();
		navigate('/apps/subscriptionLoan/subscriptionLoans');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/subscriptionLoan/subscriptionLoans`);
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/subscriptionLoan/subscriptionLoans"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Subscription Loans</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{images && images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/subscriptionLoan-image-placeholder.png"
								alt={name}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'New SubscriptionLoan'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							SubscriptionLoan Detail
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete === 'deleteSubscriptionLoan' && subscriptionLoanId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this subscriptionLoan?
					</Typography>
				)}
				{handleDelete === 'deleteSubscriptionLoan' && subscriptionLoanId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveSubscriptionLoan}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{subscriptionLoanId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateSubscriptionLoan}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteSubscriptionLoan' &&
					handleUpdate === 'updateSubscriptionLoan' &&
					subscriptionLoanId !== 'new' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdateSubscriptionLoan}
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
			</motion.div>
		</div>
	);
}

export default SubscriptionLoanHeader;
