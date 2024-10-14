import _ from '@lodash';

const ReportClmModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('client-'),
    first_name: '',
    logo: '',
    country_code1: '+880',
    country_code2: '+880',
    show_country_code1: '+880',
    show_country_code2: '+880',
    is_client_active: true,
  });
export default ReportClmModel;
