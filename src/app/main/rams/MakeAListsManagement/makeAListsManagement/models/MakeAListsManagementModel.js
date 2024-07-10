import _ from '@lodash';
import moment from 'moment';

const MakeAListsManagementModel = (data) =>
	_.defaults(data || {}, {
		make_date: moment(new Date()).format('YYYY-MM-DD'),
		id: _.uniqueId('MakeAListsManagement-'),
		title: '',
		trade: '',
		medical_center: '',
		recruiting_agency: '',
		recruiting_agency_transfer: '',
		current_status: '',
		note: ''
	});
export default MakeAListsManagementModel;
