/* eslint-disable no-undef */
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { AddedSuccessfully, RemoveSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector, useDispatch } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import {
	useCreateCallingEmbAttestationMutation,
	useDeleteCallingEmbAttestationMutation,
	useUpdateCallingEmbAttestationMutation
} from '../CallingEmbAttestationsApi';

/**
 * The callingEmbAttestation header.
 */
function CallingEmbAttestationHeader() {
	const routeParams = useParams();
	const { callingEmbAttestationId } = routeParams;
	const [createCallingEmbAttestation] = useCreateCallingEmbAttestationMutation();
	const [saveCallingEmbAttestation] = useUpdateCallingEmbAttestationMutation();
	const [removeCallingEmbAttestation] = useDeleteCallingEmbAttestationMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { name, images, featuredImageId } = watch();
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();

	function handleUpdateCallingEmbAttestation() {
		saveCallingEmbAttestation(getValues())
			.then((res) => {
				// debugger;

				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('callingEmbAttestationAlert', 'updateCallingEmbAttestation');

						reset({
							emb_attestation_status: doneNotDone.find((data) => data.default)?.id || '',
							calling_status: doneNotDone.find((data) => data.default)?.id || '',
							bio_submitted_status: doneNotDone.find((data) => data.default)?.id || ''
						});

						UpdatedSuccessfully();
						navigate('/apps/malaysiaStatus-management/malaysiaStatus/new');
					}
				} else {
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				console.error('Error updating callingEmbAttestation', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateCallingEmbAttestation() {
		createCallingEmbAttestation(getValues())
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('callingEmbAttestationAlert', 'saveCallingEmbAttestation');

						reset({
							passenger: 'all',
							emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
							calling_status: doneNotDone.find((data) => data.default)?.id,
							bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
							interviewed_date: '',
							interviewed: '',
							submitted_for_sev_date: '',
							submitted_for_sev: '',
							sev_received_date: '',
							sev_received: '',
							submitted_for_permission_immigration_clearance_date: '',
							submitted_for_permission_immigration_clearance: '',
							immigration_clearance_date: '',
							immigration_clearance: '',
							handover_passport_ticket_date: '',
							handover_passport_ticket: '',
							accounts_cleared_date: '',
							accounts_cleared: '',
							dispatched_date: '',
							dispatched: '',
							repatriation_date: '',
							repatriation: ''
						});
						navigate('/apps/malaysiaStatus-management/malaysiaStatus/new');
						AddedSuccessfully();
					}
				}
			})
			.catch((error) => {
				console.error('Error creating callingEmbAttestation', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleRemoveCallingEmbAttestation() {
		removeCallingEmbAttestation(getValues()?.id)
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						reset({
							passenger: 'all',
							emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
							calling_status: doneNotDone.find((data) => data.default)?.id,
							bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
							interviewed_date: '',
							interviewed: '',
							submitted_for_sev_date: '',
							submitted_for_sev: '',
							sev_received_date: '',
							sev_received: '',
							submitted_for_permission_immigration_clearance_date: '',
							submitted_for_permission_immigration_clearance: '',
							immigration_clearance_date: '',
							immigration_clearance: '',
							handover_passport_ticket_date: '',
							handover_passport_ticket: '',
							accounts_cleared_date: '',
							accounts_cleared: '',
							dispatched_date: '',
							dispatched: '',
							repatriation_date: '',
							repatriation: ''
						});
						localStorage.setItem('callingEmbAttestationAlert', 'saveCallingEmbAttestation');
						navigate('/apps/malaysiaStatus-management/malaysiaStatus/new');
						dispatch(showMessage({ message: 'Please Restart The Backend', variant: 'error' }));
					}
				}

				RemoveSuccessfully();
			})
			.catch((error) => {
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	const handleCancel = () => {
		reset({
			passenger: 'all',
			emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
			calling_status: doneNotDone.find((data) => data.default)?.id,
			bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
			interviewed_date: '',
			interviewed: '',
			submitted_for_sev_date: '',
			submitted_for_sev: '',
			sev_received_date: '',
			sev_received: '',
			submitted_for_permission_immigration_clearance_date: '',
			submitted_for_permission_immigration_clearance: '',
			immigration_clearance_date: '',
			immigration_clearance: '',
			handover_passport_ticket_date: '',
			handover_passport_ticket: '',
			accounts_cleared_date: '',
			accounts_cleared: '',
			dispatched_date: '',
			dispatched: '',
			repatriation_date: '',
			repatriation: ''
		});
		navigate('/apps/malaysiaStatus-management/malaysiaStatus/new');
	};
	useEffect(() => {
		if (callingEmbAttestationId === 'new') {
			reset({
				passenger: 'all',
				emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
				calling_status: doneNotDone.find((data) => data.default)?.id,
				bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
				interviewed_date: '',
				interviewed: '',
				submitted_for_sev_date: '',
				submitted_for_sev: '',
				sev_received_date: '',
				sev_received: '',
				submitted_for_permission_immigration_clearance_date: '',
				submitted_for_permission_immigration_clearance: '',
				immigration_clearance_date: '',
				immigration_clearance: '',
				handover_passport_ticket_date: '',
				handover_passport_ticket: '',
				accounts_cleared_date: '',
				accounts_cleared: '',
				dispatched_date: '',
				dispatched: '',
				repatriation_date: '',
				repatriation: ''
			});
		}
	}, [callingEmbAttestationId, reset]);

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.3 } }}
						>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{routeParams.callingEmbAttestationId === 'new'
									? 'Create New Malaysia Status'
									: passengers?.find(({ id }) => id === watch('passenger'))?.passenger_name || ''}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{routeParams.callingEmbAttestationId !== 'new' && 'Malaysia Detail'}
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{(routeParams.callingEmbAttestationId === 'new' || sessionStorage.getItem('operation') === 'save') &&
					watch('passenger') && (
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields)}
							onClick={handleCreateCallingEmbAttestation}
						>
							Save
						</Button>
					)}

				{routeParams.callingEmbAttestationId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
							variant="contained"
							onClick={handleUpdateCallingEmbAttestation}
							startIcon={<Icon className="hidden sm:flex">update</Icon>}
						>
							Update
						</Button>
					)}

				{routeParams.callingEmbAttestationId !== 'new' &&
					watch('passenger') &&
					sessionStorage.getItem('operation') !== 'save' && (
						<Button
							className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
							variant="contained"
							onClick={handleRemoveCallingEmbAttestation}
							startIcon={<Icon className="hidden sm:flex">delete</Icon>}
						>
							Remove
						</Button>
					)}

				{watch('passenger') && (
					<Button
						className="whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
						variant="contained"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default CallingEmbAttestationHeader;
