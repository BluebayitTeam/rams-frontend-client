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
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useCreatePassengerSummaryUpdateMutation, useDeletePassengerSummaryUpdateMutation, useUpdatePassengerSummaryUpdateMutation } from '../PassengerSummaryUpdatesApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The passengerSummaryUpdate header.
 */
function PassengerSummaryUpdateHeader() {
	const routeParams = useParams();
	const { passengerSummaryUpdateId } = routeParams;
	const [createPassengerSummaryUpdate] = useCreatePassengerSummaryUpdateMutation();
	const [savePassengerSummaryUpdate] = useUpdatePassengerSummaryUpdateMutation();
	const [removePassengerSummaryUpdate] = useDeletePassengerSummaryUpdateMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deletePassengerSummaryUpdate');
	const handleUpdate = localStorage.getItem('updatePassengerSummaryUpdate');

	function handleUpdatePassengerSummaryUpdate() {
		savePassengerSummaryUpdate(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/passengerSummaryUpdate/passengerSummaryUpdates`);
		});
	}

	function handleCreatePassengerSummaryUpdate() {
		createPassengerSummaryUpdate(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/passengerSummaryUpdate/passengerSummaryUpdates`);
			});
	}

	function handleRemovePassengerSummaryUpdate(dispatch) {
		removePassengerSummaryUpdate(passengerSummaryUpdateId);
		DeletedSuccessfully();
		navigate('/apps/passengerSummaryUpdate/passengerSummaryUpdates');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/passengerSummaryUpdate/passengerSummaryUpdates`);
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
            to='/apps/passengerSummaryUpdate/passengerSummaryUpdates'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>PassengerSummaryUpdates</span>
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
                src='assets/images/apps/ecommerce/passengerSummaryUpdate-image-placeholder.png'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {name || 'New PassengerSummaryUpdate'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              PassengerSummaryUpdate Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
        {handleDelete === 'deletePassengerSummaryUpdate' && passengerSummaryUpdateId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this passengerSummaryUpdate?
          </Typography>
        )}
        {handleDelete === 'deletePassengerSummaryUpdate' &&
          passengerSummaryUpdateId !== 'new' &&
          hasPermission('DEMAND_DELETE') && (
            <Button
              className='whitespace-nowrap mx-1 '
              variant='contained'
              color='secondary'
              onClick={handleRemovePassengerSummaryUpdate}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              // style={{ backgroundColor: '#ea5b78', color: 'white' }}
            >
              Remove
            </Button>
          )}
        {passengerSummaryUpdateId === 'new' && hasPermission('DEMAND_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4 '
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreatePassengerSummaryUpdate}>
            Save
          </Button>
        )}
        {handleDelete !== 'deletePassengerSummaryUpdate' &&
          handleUpdate === 'updatePassengerSummaryUpdate' &&
          passengerSummaryUpdateId !== 'new' &&
          hasPermission('DEMAND_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300'
              color='secondary'
              variant='contained'
              // style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdatePassengerSummaryUpdate}>
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

export default PassengerSummaryUpdateHeader;
