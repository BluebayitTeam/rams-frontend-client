import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateProfilesMutation,
  useDeleteProfilesMutation,
  useUpdateProfilesMutation,
} from '../ProfilessApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import _ from 'lodash';

/**
 * The profiles header.
 */
function ProfilesHeader() {
  const routeParams = useParams();

  const { profilesId, profilesName } = routeParams;
  const [createProfiles] = useCreateProfilesMutation();
  const [saveProfiles] = useUpdateProfilesMutation();
  const [removeProfiles] = useDeleteProfilesMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteProfiles');
  const handleUpdate = localStorage.getItem('updateProfiles');

  function handleUpdateProfiles() {
    saveProfiles(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/profiles/profiless`);
    });
  }

  function handleCreateProfiles() {
    createProfiles(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/profiles/profiless`);
      });
  }

  function handleRemoveProfiles(dispatch) {
    removeProfiles(profilesId);
    DeletedSuccessfully();
    navigate('/apps/profiles/profiless');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/profiles/profiless`);
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
            to='/apps/profiles/profiless'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Profiless</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteProfiles' && profilesName !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this profiles?
          </Typography>
        )}
        {handleDelete === 'deleteProfiles' &&
          profilesName !== 'new' &&
          hasPermission('PROFILES_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300'
              variant='contained'
              color='secondary'
              onClick={handleRemoveProfiles}
              style={{ padding: '0 25px' }}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Remove
            </Button>
          )}
        {profilesName === 'new' && hasPermission('PROFILES_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateProfiles}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteProfiles' &&
          handleUpdate === 'updateProfiles' &&
          profilesName !== 'new' &&
          hasPermission('PROFILES_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              color='secondary'
              variant='contained'
              onClick={handleUpdateProfiles}>
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

export default ProfilesHeader;
