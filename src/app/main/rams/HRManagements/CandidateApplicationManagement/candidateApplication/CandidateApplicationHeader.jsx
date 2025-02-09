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
  useCreateCandidateApplicationMutation,
  useDeleteCandidateApplicationMutation,
  useUpdateCandidateApplicationMutation,
} from '../CandidateApplicationsApi';

/**
 * The CandidateApplication header.
 */
function CandidateApplicationHeader() {
  const routeParams = useParams();

  const { CandidateApplicationId } = routeParams;
  const [createCandidateApplication] = useCreateCandidateApplicationMutation();
  const [saveCandidateApplication] = useUpdateCandidateApplicationMutation();
  const [removeCandidateApplication] = useDeleteCandidateApplicationMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { title, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteCandidateApplication');
  const handleUpdate = localStorage.getItem('updateCandidateApplication');

  function handleUpdateCandidateApplication() {
    saveCandidateApplication(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/CandidateApplication/CandidateApplications`);
    });
  }

  function handleCreateCandidateApplication() {
    console.log('getValuesCehck212154', getValues());
    createCandidateApplication(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/CandidateApplication/CandidateApplications`);
      });
  }

  function handleRemoveCandidateApplication(dispatch) {
    removeCandidateApplication(CandidateApplicationId);
    DeletedSuccessfully();
    navigate('/apps/CandidateApplication/CandidateApplications');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/CandidateApplication/CandidateApplications`);
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
            to='/apps/CandidateApplication/CandidateApplications/'
            color='inherit'>
            <Icon className='text-20'>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className='hidden sm:flex mx-4 font-medium'>
              Candidate Application
            </span>
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
                {name || 'Create New Application'}
              </Typography>
              <Typography variant='caption' className='font-medium'>
                Candidate Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteCandidateApplication' &&
          CandidateApplicationId !== 'new' && (
            <Typography className='mt-6' variant='subtitle2'>
              Do you want to remove this District?
            </Typography>
          )}
        {
          handleDelete === 'deleteCandidateApplication' &&
            CandidateApplicationId !== 'new' && (
              // hasPermission('PAY_HEAD_TYPE_DELETE') && (
              <Button
                className='whitespace-nowrap mx-4'
                variant='contained'
                color='secondary'
                onClick={handleRemoveCandidateApplication}
                startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
                style={{ backgroundColor: '#ea5b78', color: 'white' }}>
                Remove
              </Button>
            )
          // )
        }
        {CandidateApplicationId === 'new' && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateCandidateApplication}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteCandidateApplication' &&
          handleUpdate === 'updateCandidateApplication' &&
          CandidateApplicationId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateCandidateApplication}>
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

export default CandidateApplicationHeader;
