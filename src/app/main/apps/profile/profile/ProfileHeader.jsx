import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

/**
 * The bmet header.
 */
function ProfileHeader() {
  const routeParams = useParams();
  const { profileId, userName } = routeParams;
  const [createProfile] = useCreateProfileMutation();
  const [saveProfile] = useUpdateProfileMutation();
  const [removeProfile] = useDeleteProfileMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { first_name, image, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteProfile');
  const handleUpdate = localStorage.getItem('updateProfile');

  function handleUpdateProfile() {
    saveProfile(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/profile/profiles`);
    });
  }

  function handleCreateProfile() {
    createProfile(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/profile/profiles`);
      });
  }

  function handleRemoveProfile(dispatch) {
    removeProfile(profileId);
    DeletedSuccessfully();
    navigate('/apps/profile/profiles');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/profile/profiles`);
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0'>
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
            {typeof image === 'string' && image.length > 0 ? (
              image.endsWith('.pdf') ? (
                <PictureAsPdf
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    display: 'block',
                    fontSize: '35px',
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : image.endsWith('.doc') || image.endsWith('.docx') ? (
                <DescriptionIcon
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    display: 'block',
                    fontSize: '35px',
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : (
                <img
                  className='w-32 sm:w-48 rounded'
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                  }}
                  src={`${BASE_URL}${image}`}
                  alt={name}
                />
              )
            ) : (
              <img
                className='w-32 sm:w-48 rounded'
                src='/assets/images/logos/user.jpg'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {first_name || 'New Profile'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Profile Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
        {handleDelete === 'deleteProfile' && userName !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this profile?
          </Typography>
        )}
        {handleDelete === 'deleteProfile' &&
          userName !== 'new' &&
          hasPermission('PROFILE_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300'
              variant='contained'
              color='secondary'
              style={{ padding: '0 28px' }}
              onClick={handleRemoveProfile}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Remove
            </Button>
          )}
        {userName === 'new' && hasPermission('PROFILE_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4 '
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateProfile}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteProfile' &&
          handleUpdate === 'updateProfile' &&
          userName !== 'new' &&
          hasPermission('PROFILE_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              color='secondary'
              variant='contained'
              // disabled={_.isEmpty(dirtyFields) || isValid}
              onClick={handleUpdateProfile}>
              Update
            </Button>
          )}

        <Button
          className='whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300'
          variant='contained'
          onClick={handleCancel}>
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default ProfileHeader;
