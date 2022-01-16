import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import CitysHeader from './CitysHeader';
import CitysTable from './CitysTable';

const Citys = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<CitysHeader />}
			content={<CitysTable />}
			innerScroll
		/>
	);
};
export default withReducer('citysManagement', reducer)(Citys);
