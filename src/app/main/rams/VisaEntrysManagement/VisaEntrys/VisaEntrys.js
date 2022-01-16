import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import VisaEntrysHeader from './VisaEntrysHeader';
import VisaEntrysTable from './VisaEntrysTable';

const VisaEntrys = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<VisaEntrysHeader />}
			content={<VisaEntrysTable />}
			innerScroll
		/>
	);
};
export default withReducer('visaEntrysManagement', reducer)(VisaEntrys);
