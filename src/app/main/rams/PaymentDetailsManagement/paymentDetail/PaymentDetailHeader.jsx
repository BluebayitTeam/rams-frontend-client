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
import {
	useCreatePaymentDetailMutation,
	useDeletePaymentDetailMutation,
	useUpdatePaymentDetailMutation
} from '../PaymentDetailsApi';

/**
 * The paymentDetail header.
 */
function PaymentDetailHeader() {
	const routeParams = useParams();
	const { paymentDetailId } = routeParams;
	const [createPaymentDetail] = useCreatePaymentDetailMutation();
	const [savePaymentDetail] = useUpdatePaymentDetailMutation();
	const [removePaymentDetail] = useDeletePaymentDetailMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deletePaymentDetail');
	const handleUpdate = localStorage.getItem('updatePaymentDetail');

	function handleUpdatePaymentDetail() {
		savePaymentDetail(getValues()).then((data) => {
			navigate(`/apps/paymentDetail/paymentDetails`);
		});
	}

	function handleCreatePaymentDetail() {
		createPaymentDetail(getValues())
			.unwrap()
			.then((data) => {
				navigate(`/apps/paymentDetail/paymentDetails`);
			});
	}

	function handleRemovePaymentDetail(dispatch) {
		removePaymentDetail(paymentDetailId);
		navigate('/apps/paymentDetail/paymentDetails');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/paymentDetail/paymentDetails`);
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
						to="/apps/paymentDetail/paymentDetails"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">PaymentDetails</span>
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
								src="assets/images/apps/ecommerce/paymentDetail-image-placeholder.png"
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
							{name || 'New PaymentDetail'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							PaymentDetail Detail
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete === 'deletePaymentDetail' && paymentDetailId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this paymentDetail?
					</Typography>
				)}
				{handleDelete === 'deletePaymentDetail' && paymentDetailId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemovePaymentDetail}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{paymentDetailId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreatePaymentDetail}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deletePaymentDetail' &&
					handleUpdate === 'updatePaymentDetail' &&
					paymentDetailId !== 'new' && (
						<Button
							className="whitespace-nowrap mx-4"
							color="secondary"
							variant="contained"
							style={{ backgroundColor: '#4dc08e', color: 'white' }}
							onClick={handleUpdatePaymentDetail}
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

export default PaymentDetailHeader;
