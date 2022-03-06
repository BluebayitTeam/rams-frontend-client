import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import RecruitingAgencysHeader from './RecruitingAgencysHeader';
import RecruitingAgencysTable from './RecruitingAgencysTable';

const RecruitingAgencys = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<RecruitingAgencysHeader />}
			content={<RecruitingAgencysTable />}
			innerScroll
		/>
	);
};
export default withReducer('recruitingAgencysManagement', reducer)(RecruitingAgencys);
