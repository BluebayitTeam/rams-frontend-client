import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import _ from 'lodash';
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
    const values = getValues();

    const educationLength = values.education ? values.education.length : 0;
    const experienceLength = values.experience ? values.experience.length : 0;
    saveCandidateApplication({
      ...values,
      id: CandidateApplicationId,
      educationLength,
      experienceLength,
    }).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/CandidateApplication/CandidateApplications`);
    });
  }

  function handleCreateCandidateApplication() {
    const values = getValues();

    const educationLength = values.education ? values.education.length : 0;
    const experienceLength = values.experience ? values.experience.length : 0;

    createCandidateApplication({
      ...values,
      educationLength,
      experienceLength,
    })
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        navigate(`/apps/CandidateApplication/CandidateApplications`);
      })
      .catch((error) => {
        console.error('Error creating candidate application:', error);
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
      <div className='flex flex-col w-2/3 items-start max-w-full min-w-0'>
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
              Do you want to remove this candidate application?
            </Typography>
          )}
        {
          handleDelete === 'deleteCandidateApplication' &&
          CandidateApplicationId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300'
              variant='contained'
              color='secondary'
              onClick={handleRemoveCandidateApplication}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ padding: '0 28px' }}>
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
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateCandidateApplication}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteCandidateApplication' &&
          handleUpdate === 'updateCandidateApplication' &&
          CandidateApplicationId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              color='secondary'
              variant='contained'
              onClick={handleUpdateCandidateApplication}>
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

export default CandidateApplicationHeader;
