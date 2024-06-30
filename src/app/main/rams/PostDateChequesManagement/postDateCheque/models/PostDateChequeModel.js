import _ from '@lodash';

const PostDateChequeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('postDateCheque-'),
		name: ''
	});
export default PostDateChequeModel;
