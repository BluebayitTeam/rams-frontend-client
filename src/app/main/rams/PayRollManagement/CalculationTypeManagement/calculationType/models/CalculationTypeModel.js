import _ from '@lodash';

const CalculationTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('calculationType-'),
		name: '',

	});
export default CalculationTypeModel;
