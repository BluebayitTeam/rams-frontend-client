import _ from '@lodash';

const ProfileModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('profile-'),
    first_name: '',
  });
export default ProfileModel;
