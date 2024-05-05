import _ from '@lodash';

const PassengerModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('passenger-'),
		name: ''
	});
export default PassengerModel;
