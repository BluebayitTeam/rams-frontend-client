import _ from '@lodash';

const AgentModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('agent-'),
		first_name: '',
		logo: '',
		country_code1: '+880',
		country_code2: '+880',
		show_country_code1: '+880',
		show_country_code2: '+880',
		is_agent_active: true
	});
export default AgentModel;
