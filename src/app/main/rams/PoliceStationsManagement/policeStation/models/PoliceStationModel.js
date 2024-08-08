import _ from '@lodash';

const PoliceStationModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('policeStation-'),
		name: ''
	});
export default PoliceStationModel;
