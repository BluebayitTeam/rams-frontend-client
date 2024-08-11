import _ from '@lodash';

const SiteSettingModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('siteSetting-'),
		name: ''
	});
export default SiteSettingModel;
