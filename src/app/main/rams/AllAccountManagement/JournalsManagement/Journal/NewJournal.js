import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@material-ui/core';
import useUserInfo from 'app/@customHooks/useUserInfo.js';
import setIdIfValueIsObjArryData from 'app/@helpers/setIdIfValueIsObjArryData.js';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2.js';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import { getJournal, newJournal, resetJournal, setUserBasedBranch } from '../store/journalSlice';
import JournalForm from './JournalForm.js';
import NewJournalHeader from './NewJournalHeader.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	branch: yup.string().nullable().required('Branch is required'),
	sub_ledger: yup.string().nullable().required('Sub Ledger is required')
});

const Journal = () => {
	const dispatch = useDispatch();
	const journal = useSelector(({ journalsManagement }) => journalsManagement.journal);
	const [noJournal, setNoJournal] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const routeParams = useParams();

	const { reset } = methods;

	const [letFormSave, setLetFormSave] = useState(false);

	const { userId } = useUserInfo();

	useDeepCompareEffect(() => {
		function updateJournalState() {
			const { journalId, journalName } = routeParams;

			if (journalId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newJournal());
				dispatch(setUserBasedBranch(userId));
			} else {
				/**
				 * Get User data
				 */

				dispatch(getJournal(journalName)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoJournal(true);
					}
				});
			}
		}

		updateJournalState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!journal) {
			return;
		}
		/**
		 * Reset the form on journal state changes
		 */
		const convertedJournalItems = setIdIfValueIsObjArryData(journal?.items);
		const convertedJournal = setIdIfValueIsObject2(journal);
		reset({ ...convertedJournal, items: convertedJournalItems });
	}, [journal, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Journal on component unload
			 */
			dispatch(resetJournal());
			setNoJournal(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noJournal) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such journal!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Journal Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<NewJournalHeader letFormSave={letFormSave} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<JournalForm setLetFormSave={setLetFormSave} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('journalsManagement', reducer)(Journal);
