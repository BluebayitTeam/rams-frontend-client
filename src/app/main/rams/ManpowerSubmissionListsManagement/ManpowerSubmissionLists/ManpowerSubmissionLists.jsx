import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import ManpowerSubmissionListsHeader from './ManpowerSubmissionListsHeader';
import ManpowerSubmissionListsTable from './ManpowerSubmissionListsTable';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Company Name', name: 'comapany_name', show: true },
	{ id: 2, label: 'Employee Name', name: 'employee_name', show: true },
	{ id: 3, label: 'Job Post', name: 'job_post', show: true },
	{ id: 4, label: 'Salary', name: 'salary', show: true },
	{ id: 5, label: 'Reg.ID No', name: 'reg_id_no', show: true },
	{ id: 6, label: 'Visa Number', name: 'visa_number', show: true },
	{ id: 7, label: 'Visa Issue Date', name: 'visa_issue_date', show: true },
	{ id: 8, label: 'Visa Expiry Date', name: 'visa_expirt_date', show: true },
	{ id: 9, label: 'Passport No', name: 'passport_no', show: true },
	{ id: 10, label: 'Passport Issue Date', name: 'passport_issue_date', show: true },
	{ id: 11, label: 'Passport Expiry Date', name: 'passport_expiry_date', show: true },
	{ id: 12, label: 'Date of Birth', name: 'date_of_birth', show: true }
];

function ManpowerSubmissionLists() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const classes = useStyles();
	const [generalData, setGeneralData] = useState({});
	const [searchKey, setSearchKey] = useState('');
	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80'
			}}
			header={
				<ManpowerSubmissionListsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<ManpowerSubmissionListsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ManpowerSubmissionLists;
