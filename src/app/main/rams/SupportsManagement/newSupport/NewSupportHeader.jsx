/* eslint-disable no-nested-ternary */
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD, GET_TICKET_BY_ID } from 'src/app/constant/constants';
import { AddedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useCreateNewSupportMutation, useDeleteSupportMutation, useUpdateSupportMutation } from '../SupportsApi';

/**
 * The newSupport header.
 */
function NewSupportHeader(props) {
	const routeParams = useParams();
	const { newSupportId } = routeParams;

	console.log('newSupportId', newSupportId);

	const [createNewSupport] = useCreateNewSupportMutation();
	const [saveNewSupport] = useUpdateSupportMutation();
	const [removeNewSupport] = useDeleteSupportMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteNewSupport');
	const handleUpdate = localStorage.getItem('updateNewSupport');

	const [ticketDetail, setTicketDetail] = useState({});

	console.log('ticketDetail', ticketDetail);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_TICKET_BY_ID}${newSupportId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setTicketDetail(data))
			.catch(() => {});
	}, [newSupportId]);

	const refresh = () => {
		props?.refetch();
	};

	function handleCreateNewSupport() {
		createNewSupport({ ...getValues(), email: ADMIN_LOGIN_EMAIL, password: ADMIN_LOGIN_PASSWORD })
			.unwrap()

			.then((data) => {
				AddedSuccessfully();
				console.log('test', data);
				navigate(`/apps/support/supports`);
			});
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
						<span className="flex mx-4 font-medium">New Supports</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-14 sm:text-18 truncate font-semibold">
							Create New Support
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{handleDelete === 'deleteNewSupport' && newSupportId !== 'new' && (
					<Typography
						className="mt-6"
						variant="subtitle2"
					>
						Do you want to remove this newSupport?
					</Typography>
				)}

				{newSupportId === 'new' && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateNewSupport}
					>
						Save
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

export default NewSupportHeader;
