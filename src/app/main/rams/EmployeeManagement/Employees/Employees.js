import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import EmployeesHeader from './EmployeesHeader';
import EmployeesTable from './EmployeesTable';

const Employees = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<EmployeesHeader />}
			content={<EmployeesTable />}
			innerScroll
		/>
	);
};
export default withReducer('employeesManagement', reducer)(Employees);
