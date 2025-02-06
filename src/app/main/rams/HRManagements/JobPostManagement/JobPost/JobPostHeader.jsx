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
  useCreateJobPostMutation,
  useDeleteJobPostMutation,
  useUpdateJobPostMutation,
} from '../JobPostsApi';

/**
 * The JobPost header.
 */
function JobPostHeader() {
  const routeParams = useParams();

  const { JobPostId } = routeParams;
  const [createJobPost] = useCreateJobPostMutation();
  const [saveJobPost] = useUpdateJobPostMutation();
  const [removeJobPost] = useDeleteJobPostMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteJobPost');
  const handleUpdate = localStorage.getItem('updateJobPost');

  function handleUpdateJobPost() {
    saveJobPost(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/JobPost/JobPosts`);
    });
  }

  function handleCreateJobPost() {
    createJobPost(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/JobPost/JobPosts`);
      });
  }

  function handleRemoveJobPost(dispatch) {
    removeJobPost(JobPostId);
    DeletedSuccessfully();
    navigate('/apps/JobPost/JobPosts');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/JobPost/JobPosts`);
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
          <Typography
            className='flex items-center sm:mb-2'
            component={Link}
            role='button'
            to='/apps/JobPost/JobPosts/'
            color='inherit'>
            <Icon className='text-20'>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className='hidden sm:flex mx-4 font-medium'>Leave Types</span>
          </Typography>
        </motion.div>

        <div className='flex items-center max-w-full'>
          <motion.div
            className='hidden sm:flex'
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          />

          <div className='flex flex-col min-w-0 mx-8 sm:mc-16'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className='text-16 sm:text-20 truncate font-semibold'>
                {name || 'Create New Leave Types'}
              </Typography>
              <Typography variant='caption' className='font-medium'>
                Leave Types Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteJobPost' && JobPostId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this JobPost?
          </Typography>
        )}
        {
          handleDelete === 'deleteJobPost' && JobPostId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              onClick={handleRemoveJobPost}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ backgroundColor: '#ea5b78', color: 'white' }}>
              Remove
            </Button>
          )
          // )
        }
        {JobPostId === 'new' && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateJobPost}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteJobPost' &&
          handleUpdate === 'updateJobPost' &&
          JobPostId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateJobPost}>
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

export default JobPostHeader;
