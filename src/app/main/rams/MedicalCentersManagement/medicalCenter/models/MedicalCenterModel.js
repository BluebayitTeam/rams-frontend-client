import _ from '@lodash';

const MedicalCenterModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('medicalCenter-'),
		name: ''
	});
export default MedicalCenterModel;
