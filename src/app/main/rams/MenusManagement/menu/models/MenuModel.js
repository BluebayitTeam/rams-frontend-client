import _ from '@lodash';

const MenuModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('menu-'),
		name: ''
	});
export default MenuModel;
