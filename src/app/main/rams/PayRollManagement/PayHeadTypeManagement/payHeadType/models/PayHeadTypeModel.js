import _ from '@lodash';

const PayHeadTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('payHeadType-'),
		name: '',

	});
export default PayHeadTypeModel;
