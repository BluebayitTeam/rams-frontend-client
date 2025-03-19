import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
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
  useCreateShortlistedCandidateMutation,
  useDeleteShortlistedCandidateMutation,
  useUpdateShortlistedCandidateMutation,
} from '../ShortlistedCandidatesApi';

/**
 * The ShortlistedCandidate header.
 */
function ShortlistedCandidateHeader() {
  const routeParams = useParams();

  const { ShortlistedCandidateId } = routeParams;
  const [createShortlistedCandidate] = useCreateShortlistedCandidateMutation();
  const [saveShortlistedCandidate] = useUpdateShortlistedCandidateMutation();
  const [removeShortlistedCandidate] = useDeleteShortlistedCandidateMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { title, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteShortlistedCandidate');
  const handleUpdate = localStorage.getItem('updateShortlistedCandidate');

  function handleUpdateShortlistedCandidate() {
    saveShortlistedCandidate(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/ShortlistedCandidate/ShortlistedCandidates`);
    });
  }

  function handleCreateShortlistedCandidate() {

    createShortlistedCandidate(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/ShortlistedCandidate/ShortlistedCandidates`);
      });
  }

  function handleRemoveShortlistedCandidate(dispatch) {
    removeShortlistedCandidate(ShortlistedCandidateId);
    DeletedSuccessfully();
    navigate('/apps/ShortlistedCandidate/ShortlistedCandidates');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/ShortlistedCandidate/ShortlistedCandidates`);
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <motion.div
          initial={{ x: 20, opashortlistedcandidate: 0 }}
          animate={{
            x: 0,
            opashortlistedcandidate: 1,
            transition: { delay: 0.3 },
          }}>
          <Typography
            className='flex items-center sm:mb-2'
            component={Link}
            role='button'
            to='/apps/ShortlistedCandidate/ShortlistedCandidates/'
            shortlistedcandidate='inherit'>
            <Icon className='text-20'>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className='hidden sm:flex mx-4 font-medium'>Candidates</span>
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
                {title || 'Shortlist Candidate'}
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
        {handleDelete === 'deleteShortlistedCandidate' &&
          ShortlistedCandidateId !== 'new' && (
            <Typography className='mt-6' variant='subtitle2'>
              Do you want to remove this Shortlisted Candidate?
            </Typography>
          )}
        {
          handleDelete === 'deleteShortlistedCandidate' &&
          ShortlistedCandidateId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300'
              variant='contained'
              color='secondary'
              onClick={handleRemoveShortlistedCandidate}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Remove
            </Button>
          )
          // )
        }
        {ShortlistedCandidateId === 'new' && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateShortlistedCandidate}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteShortlistedCandidate' &&
          handleUpdate === 'updateShortlistedCandidate' &&
          ShortlistedCandidateId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              color='secondary'
              variant='contained'
              onClick={handleUpdateShortlistedCandidate}>
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

export default ShortlistedCandidateHeader;
