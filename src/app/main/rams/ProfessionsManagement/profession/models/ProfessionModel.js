import _ from '@lodash';

const ProfessionModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('profession-'),
		name: ''
	});
export default ProfessionModel;
