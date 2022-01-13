import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import EmbassyReportsTable from './EmbassyReportsTable';

const EmbassyReport = () => {
	return (
		<FusePageCarded
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			content={<EmbassyReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('embassysReportManagement', reducer)(EmbassyReport);
