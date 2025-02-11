import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateUserDefineValueMutation,
  useDeleteUserDefineValueMutation,
  useUpdateUserDefineValueMutation,
} from '../UserDefineValueApi';

/**
 * The userDefineValue header.
 */
function UserDefineValueHeader() {
  const routeParams = useParams();

  // console.log('hhhhhhh', routeParams);
  const { userDefineValueId } = routeParams;
  const [createUserDefineValue] = useCreateUserDefineValueMutation();
  const [saveUserDefineValue] = useUpdateUserDefineValueMutation();
  const [removeUserDefineValue] = useDeleteUserDefineValueMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteUserDefineValue');
  const handleUpdate = localStorage.getItem('updateUserDefineValue');

  function handleUpdateUserDefineValue() {
    saveUserDefineValue(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/userDefineValue/userDefineValues`);
    });
  }

  function handleCreateUserDefineValue() {
    createUserDefineValue(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/userDefineValue/userDefineValues`);
      });
  }

  function handleRemoveUserDefineValue(dispatch) {
    removeUserDefineValue(userDefineValueId);
    DeletedSuccessfully();
    navigate('/apps/userDefineValue/userDefineValues');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/userDefineValue/userDefineValues`);
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
            to='/apps/userDefineValue/userDefineValues'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>UserDefineValues</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteUserDefineValue' && userDefineValueId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this userDefineValue?
          </Typography>
        )}
        {handleDelete === 'deleteUserDefineValue' &&
          userDefineValueId !== 'new' &&
          // hasPermission('PAY_HEAD_TYPE_DELETE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            onClick={handleRemoveUserDefineValue}
            startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
            style={{ backgroundColor: '#ea5b78', color: 'white', padding: "0 28px" }}>
            Remove
          </Button>
          // )
        }
        {userDefineValueId === 'new'
          //  && hasPermission('PAY_HEAD_TYPE_CREATE') 
          && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleCreateUserDefineValue}>
              Save
            </Button>
          )}
        {handleDelete !== 'deleteUserDefineValue' &&
          handleUpdate === 'updateUserDefineValue' &&
          userDefineValueId !== 'new' &&
          // hasPermission('PAY_HEAD_TYPE_UPDATE') && 
          (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateUserDefineValue}>
              Update
            </Button>
          )}
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

export default UserDefineValueHeader;
