import _ from '@lodash';

const RecruitingAgencyModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('recruitingAgency-'),
		name: ''
	});
export default RecruitingAgencyModel;
