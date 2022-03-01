import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from '../store/index';
import { getMakeAListClms, resetMakeAListClms } from '../store/makeAListClmSlice';
import MakeAListClmForm from './MakeAListClmForm';
import NewMakeAListClmHeader from './NewMakeAListClmHeader';

/**
 * Form Validation Schema
 */

const MakeAListClm = () => {
	const dispatch = useDispatch();
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateMakeAListClmState() {
			const { makeAListId } = routeParams;
			dispatch(getMakeAListClms(makeAListId));
		}
		updateMakeAListClmState();
		return () => dispatch(resetMakeAListClms());
	}, [dispatch, routeParams]);

	/**
	 * Show Message if the requested products is not exists
	 */

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-80 h-80'
			}}
			header={<NewMakeAListClmHeader />}
			content={
				<div className="px-16 sm:px-24 max-w-2xl min-h-full">
					<MakeAListClmForm />
				</div>
			}
			innerScroll
		/>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeAListClm);
