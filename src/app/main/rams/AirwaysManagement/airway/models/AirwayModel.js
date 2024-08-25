import _ from '@lodash';

const AirwayModel = (data) =>
	_.defaults(data || {}, {
		name: '',
		short_code: '',
		air_code: ''
	});
export default AirwayModel;
