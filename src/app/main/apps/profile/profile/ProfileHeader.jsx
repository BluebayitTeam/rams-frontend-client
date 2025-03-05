import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useUpdateProfileMutation } from '../ProfilesApi';
import { selectUser, updateUser } from 'src/app/auth/user/store/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

/**
 * The profile header.
 */
function ProfileHeader() {
  const routeParams = useParams();
  const user = useSelector(selectUser);
  console.log('userfdfjdslfj', user);

  const { profileId } = routeParams;
  const [saveProfile] = useUpdateProfileMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleUpdate = localStorage.getItem('updateProfile');
  const dispatch = useDispatch();

  // function handleUpdateProfile() {
  //   UpdatedSuccessfully();

  //   saveProfile(getValues());
  //   navigate(`/apps/profile/profiles`);
  //   dispatch(
  //     updateUser({
  //       ...user,
  //       data: {
  //         ...user.data,
  //         // photoURL: photoURL,
  //         displayName: `${getValues().first_name}`,
  //       },
  //     })
  //   );
  // }

  async function handleUpdateProfile() {
    try {
      UpdatedSuccessfully();

      // Call the mutation and wait for the response
      const response = await saveProfile(getValues()).unwrap();

      // Update the Redux state with the response data
      dispatch(
        updateUser({
          ...user,
          data: {
            ...user.data,
            photoURL: response.image,
            displayName: response.first_name,
          },
        })
      );

      navigate(`/apps/profile/profiles`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  function handleCancel() {
    navigate(`/apps/profile/profiles`);
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0'>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
          <Typography
            className='flex items-center sm:mb-12'
            component={Link}
            role='button'
            to='/apps/profile/profiles'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Profiles</span>
          </Typography>
        </motion.div>

        <div className='flex items-center max-w-full'>
          <motion.div
            className='hidden sm:flex'
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}>
            {images && images.length > 0 && featuredImageId ? (
              <img
                className='w-32 sm:w-48 rounded'
                src={_.find(images, { id: featuredImageId })?.url}
                alt={name}
              />
            ) : (
              <img
                className='w-32 sm:w-48 rounded'
                src='assets/images/apps/ecommerce/profile-image-placeholder.png'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {name || 'Update Password'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Password
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        <Button
          className='whitespace-nowrap mx-4'
          color='secondary'
          variant='contained'
          style={{ backgroundColor: '#4dc08e', color: 'white' }}
          onClick={handleUpdateProfile}>
          Update
        </Button>

        <Button
          className='whitespace-nowrap mx-4'
          variant='contained'
          style={{ backgroundColor: '#FFAA4C', color: 'white' }}
          onClick={handleCancel}>
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default ProfileHeader;
