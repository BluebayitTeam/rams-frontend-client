/* eslint-disable no-nested-ternary */
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD, GET_TICKET_BY_ID } from 'src/app/constant/constants';
import { useCreateSupportMutation, useDeleteSupportMutation, useUpdateSupportMutation } from '../SupportsApi';

/**
 * The support header.
 */
function SupportHeader(props) {
	const routeParams = useParams();
	const { supportId } = routeParams;
	const [createSupport] = useCreateSupportMutation();
	const [saveSupport] = useUpdateSupportMutation();
	const [removeSupport] = useDeleteSupportMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteSupport');
	const handleUpdate = localStorage.getItem('updateSupport');

	const [ticketDetail, setTicketDetail] = useState({});

	console.log('ticketDetail', ticketDetail);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_TICKET_BY_ID}${supportId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setTicketDetail(data))
			.catch(() => {});
	}, [supportId]);

	const refresh = () => {
		props?.refetch();
	};

	function handleUpdateSupport() {
		saveSupport(getValues()).then((data) => {
			navigate(`/apps/support/supports`);
		});
	}

	function handleCreateSupport() {
		createSupport({ ...getValues(), email: ADMIN_LOGIN_EMAIL, password: ADMIN_LOGIN_PASSWORD })
			.unwrap()
			.then((data) => {
				navigate(`/apps/support/supports`);
			});
	}

	function handleRemoveSupport(dispatch) {
		removeSupport(supportId);
		navigate('/apps/support/supports');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/support/supports`);
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
						to="/apps/support/supports"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Supports</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-14 sm:text-18 truncate font-semibold">
							Subject:{ticketDetail?.subject}
						</Typography>
						<Typography className="text-12 sm:text-12 truncate font-semibold mb-5">
							{ticketDetail?.user?.first_name}&nbsp;
							{ticketDetail?.user?.last_name}({ticketDetail?.user?.email})
						</Typography>
						<div className="flex ">
							<Typography
								variant="caption"
								gutterBottom
								component="div"
								className={clsx(
									'inline text-12 font-semibold  py-4 px-12 rounded-full truncate text-white',
									ticketDetail?.ticket_status?.name === ('open' || 'Open')
										? 'bg-green-800'
										: ticketDetail?.ticket_status?.name === ('closed' || 'Closed')
											? 'bg-red-800'
											: ticketDetail?.ticket_status?.name ===
												  ('customer-reply' ||
														'Customer-reply' ||
														'Customer-Reply' ||
														'Customer Reply')
												? 'bg-blue-800'
												: ticketDetail?.ticket_status?.name === ('answered' || 'Answered')
													? 'bg-purple-800'
													: ticketDetail?.ticket_status?.name ===
														  ('in_process' || 'In process')
														? 'bg-orange-800'
														: ''
								)}
								style={{ marginRight: '5px' }}
							>
								{/* {_.isEmpty(ticketStatus) || ticketStatus.find(ticketSt => ticketSt?.name === support?.ticket_status)?.name} */}
								{ticketDetail?.ticket_status?.name}
							</Typography>
							<Typography
								variant="p"
								gutterBottom
								component="div"
								className={clsx(
									'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
									ticketDetail?.ticket_priority?.name === ('high' || 'High')
										? 'bg-green-400'
										: ticketDetail?.ticket_priority?.name === ('normal' || 'Normal')
											? 'bg-orange-400'
											: ticketDetail?.ticket_priority?.name === ('low' || 'Low')
												? 'bg-blue-400'
												: ticketDetail?.ticket_priority?.name
													? 'bg-black'
													: ''
								)}
								style={{ marginRight: '5px' }}
							>
								{ticketDetail?.ticket_priority?.name}
							</Typography>

							<Typography
								variant="p"
								gutterBottom
								component="div"
								className={clsx(
									'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white bg-black'
								)}
								style={{ marginRight: '5px' }}
							>
								{ticketDetail?.ticket_department?.name}
							</Typography>
							<Typography
								variant="p"
								gutterBottom
								component="div"
								className={clsx(
									'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-black bg-gray-300'
								)}
								style={{ marginRight: '5px' }}
							>
								Ticket#{ticketDetail?.ticket_number}
							</Typography>
							<Typography
								variant="p"
								gutterBottom
								component="div"
								style={{ color: 'grey', display: 'flex', alignItems: 'center' }}
							>
								{ticketDetail?.created_at && format(new Date(ticketDetail?.created_at), 'MMM dd, yyyy')}
							</Typography>
						</div>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete === 'deleteSupport' && supportId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this support?
					</Typography>
				)}
				{handleDelete === 'deleteSupport' && supportId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						onClick={handleRemoveSupport}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						style={{ backgroundColor: '#ea5b78', color: 'white' }}
					>
						Remove
					</Button>
				)}
				{supportId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateSupport}
					>
						Save
					</Button>
				)}
				{handleDelete !== 'deleteSupport' && handleUpdate === 'updateSupport' && supportId !== 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						color="secondary"
						variant="contained"
						style={{ backgroundColor: '#4dc08e', color: 'white' }}
						onClick={handleUpdateSupport}
					>
						Update
					</Button>
				)}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					onClick={refresh}
				>
					Refresh
				</Button>
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

export default SupportHeader;
