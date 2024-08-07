import _ from '@lodash';

const PassengerTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('passengerType-'),
		name: ''
	});
export default PassengerTypeModel;
