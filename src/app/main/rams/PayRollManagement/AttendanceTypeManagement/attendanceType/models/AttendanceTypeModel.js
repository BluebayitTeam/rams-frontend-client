import _ from '@lodash';

const AttendanceTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('attendanceType-'),
		name: '',

	});
export default AttendanceTypeModel;
