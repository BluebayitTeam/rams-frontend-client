import _ from '@lodash';
import moment from 'moment';

const MakeAListsManagementModel = (data) =>
	_.defaults(data || {}, {
		make_date: moment(new Date()).format('YYYY-MM-DD'),
		id: _.uniqueId('MakeAListsManagement-'),
		name: ''
	});
export default MakeAListsManagementModel;
