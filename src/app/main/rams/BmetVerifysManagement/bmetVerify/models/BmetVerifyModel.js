import _ from '@lodash';

const MaletrainingModel = (data) =>
	_.defaults(data || {}, {
		passenger: ''
	});
export default MaletrainingModel;
