import _ from '@lodash';

const CurrencyModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('currency-'),
		name: ''
	});
export default CurrencyModel;
