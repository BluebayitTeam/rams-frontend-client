import _ from '@lodash';

const AirwayModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('department-'),
		name: ''
	});
export default AirwayModel;
