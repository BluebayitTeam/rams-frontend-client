import _ from '@lodash';

const ScheduleModel = (data) =>
	_.defaults(data || {}, {
		// id: _.uniqueId('schedule-'),
		// name: '',

	});
export default ScheduleModel;
