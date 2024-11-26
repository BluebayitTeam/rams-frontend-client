import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateVisaEntryMutation,
  useDeleteVisaEntryMutation,
  useUpdateVisaEntryMutation,
} from '../VisaEntrysApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The visaEntry header.
 */
function VisaEntryHeader() {
  const routeParams = useParams();
  console.log('routeParamsPrint', routeParams);
  const { visaEntryId, fromSearch } = routeParams;

  const [createVisaEntry] = useCreateVisaEntryMutation();
  const [saveVisaEntry] = useUpdateVisaEntryMutation();
  const [removeVisaEntry] = useDeleteVisaEntryMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteVisaEntry');
  const handleUpdate = localStorage.getItem('updateVisaEntry');

  function handleUpdateVisaEntry() {
    saveVisaEntry(getValues()).then((data) => {
      if (fromSearch) {
        navigate(-1);
      } else {
        UpdatedSuccessfully();
        navigate('/apps/visaEntry/visaEntrys');
      }
    });
  }

  function handleCreateVisaEntry() {
    createVisaEntry(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/visaEntry/visaEntrys`);
      });
  }

  function handleRemoveVisaEntry(dispatch) {
    removeVisaEntry(visaEntryId);
    DeletedSuccessfully();
    navigate('/apps/visaEntry/visaEntrys');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    if (fromSearch == 'fromSearch') {
      navigate(-1);
    } else {
      navigate(`/apps/visaEntry/visaEntrys`);
    }
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
            to='/apps/visaEntry/visaEntrys'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>VisaEntrys</span>
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
                src='assets/images/apps/ecommerce/visaEntry-image-placeholder.png'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {name || 'New VisaEntry'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              VisaEntry Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
        {handleDelete === 'deleteVisaEntry' && visaEntryId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this visaEntry?
          </Typography>
        )}
        {handleDelete === 'deleteVisaEntry' &&
          visaEntryId !== 'new' &&
          hasPermission('VISA_ENTRY_DELETE') && (
            <Button
              className='whitespace-nowrap mx-1 '
              variant='contained'
              color='secondary'
              onClick={handleRemoveVisaEntry}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              // style={{ backgroundColor: '#ea5b78', color: 'white' }}
            >
              Remove
            </Button>
          )}
        {visaEntryId === 'new' && hasPermission('VISA_ENTRY_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4 '
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateVisaEntry}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteVisaEntry' &&
          handleUpdate === 'updateVisaEntry' &&
          visaEntryId !== 'new' &&
          hasPermission('VISA_ENTRY_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300'
              color='secondary'
              variant='contained'
              // style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateVisaEntry}>
              Update
            </Button>
          )}
        <Button
          className='whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300'
          variant='contained'
          // style={{ backgroundColor: '#FFAA4C', color: 'white' }}
          onClick={handleCancel}>
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default VisaEntryHeader;
