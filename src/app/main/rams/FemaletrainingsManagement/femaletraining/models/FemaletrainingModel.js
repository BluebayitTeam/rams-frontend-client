import _ from '@lodash';

const MaletrainingModel = (data) =>
	_.defaults(data || {}, {
		passenger: '',
		center_name: '',
		district: ''
	});
export default MaletrainingModel;
