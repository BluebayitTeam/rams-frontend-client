import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import ContrasHeader from './ContrasHeader';
import ContrasTable from './ContrasTable';

const Contras = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<ContrasHeader />}
			content={<ContrasTable />}
			innerScroll
		/>
	);
};
export default withReducer('contrasManagement', reducer)(Contras);
