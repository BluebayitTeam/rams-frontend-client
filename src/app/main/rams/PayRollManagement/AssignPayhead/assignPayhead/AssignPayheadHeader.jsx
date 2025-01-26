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
  CustomNotification,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateAssignPayheadMutation,
  useDeleteAssignPayheadMutation,
  useUpdateAssignPayheadMutation,
} from '../AssignPayheadsApi';
import _ from 'lodash';

/**
 * The assignPayhead header.
 */
function AssignPayheadHeader() {
  const routeParams = useParams();

  console.log('hhhhhhh', routeParams);
  const { assignPayheadId } = routeParams;
  const [createAssignPayhead] = useCreateAssignPayheadMutation();
  const [saveAssignPayhead] = useUpdateAssignPayheadMutation();
  const [removeAssignPayhead] = useDeleteAssignPayheadMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteAssignPayhead');

  const handleUpdate = localStorage.getItem('updateAssignPayhead');

  function handleUpdateAssignPayhead() {
    const payload = {
      ...getValues(), // Spread the form values
      id: assignPayheadId, // Add the assignPayheadId to the payload
    };
    saveAssignPayhead(payload).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/assignPayhead/assignPayheads`);
    });
  }

  function handleCreateAssignPayhead() {
    createAssignPayhead(getValues())
      .unwrap()
      .then((data) => {
        console.log('dataCheck', data);
        AddedSuccessfully();
        navigate(`/apps/assignPayhead/assignPayheads`);
      })
      .catch((error) => {
        console.error('Errorfjkdshkjsdfjkdsh', error.response.data.detail);
        CustomNotification('error', `${error.response.data.detail}`);
      });
  }

  function handleRemoveAssignPayhead(dispatch) {
    removeAssignPayhead(assignPayheadId);
    DeletedSuccessfully();
    navigate('/apps/assignPayhead/assignPayheads');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/assignPayhead/assignPayheads`);
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
            to='/apps/assignPayhead/assignPayheads'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Assign Payheads</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteAssignPayhead' &&
          assignPayheadId !== 'new' && (
            <Typography className='mt-6' variant='subtitle2'>
              Do you want to remove this assignPayhead?
            </Typography>
          )}
        {
          handleDelete === 'deleteAssignPayhead' &&
            assignPayheadId !== 'new' && (
              // hasPermission('PAY_HEAD_TYPE_DELETE') && (
              <Button
                className='whitespace-nowrap mx-4'
                variant='contained'
                color='secondary'
                onClick={handleRemoveAssignPayhead}
                startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
                style={{ backgroundColor: '#ea5b78', color: 'white' }}>
                Remove
              </Button>
            )
          // )
        }
        {assignPayheadId === 'new' && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateAssignPayhead}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteAssignPayhead' &&
          handleUpdate === 'updateAssignPayhead' &&
          assignPayheadId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateAssignPayhead}>
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

export default AssignPayheadHeader;
