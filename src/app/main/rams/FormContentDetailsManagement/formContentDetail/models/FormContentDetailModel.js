import _ from '@lodash';

const FormContentDetailModel = (data) => _.defaults(data || {}, { details: '', head: '' });
export default FormContentDetailModel;
