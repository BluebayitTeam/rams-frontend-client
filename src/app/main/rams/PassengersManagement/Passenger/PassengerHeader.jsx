/* eslint-disable no-undef */
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
  useCreatePassengerMutation,
  useDeletePassengerMutation,
  useUpdatePassengerMutation,
} from '../PassengersApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The passenger header.
 */
function PassengerHeader() {
  const routeParams = useParams();
  // const history = useHistory();
  console.log('routeParams', routeParams);
  const { passengerId, passengerType } = routeParams;

  // console.log('passengerType', passengerType);

  const [createPassenger] = useCreatePassengerMutation();
  const [savePassenger] = useUpdatePassengerMutation();
  const [removePassenger] = useDeletePassengerMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deletePassenger');
  const handleUpdate = localStorage.getItem('updatePassenger');

  const { passengerName, fromSearch } = useParams();

  function handleUpdatePassenger() {
    savePassenger(getValues()).then((data) => {
      UpdatedSuccessfully();
      if (fromSearch == 'fromSearch') {
        navigate(-1);
      } else {
        navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
      }
    });
  }

  function handleCreatePassenger() {
    console.log(`getValues()`, getValues());
    createPassenger(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
      });
  }

  function handleRemovePassenger(dispatch) {
    removePassenger(passengerId);
    DeletedSuccessfully();
    navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    if (fromSearch == 'fromSearch') {
      navigate(-1);
    } else {
      navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
    }
  }

  // console.log('hendelcancel', handleCancel);
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
            to={`/apps/passenger/passengers/${routeParams.passengerType}`}
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Passengers</span>
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
                src='assets/images/apps/ecommerce/passenger-image-placeholder.png'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {name || 'New Passenger'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Passenger Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deletePassenger' && passengerId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this passenger?
          </Typography>
        )}
        {handleDelete === 'deletePassenger' &&
          passengerId !== 'new' &&
          hasPermission('PASSENGER_DELETE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300'
              variant='contained'
              onClick={handleRemovePassenger}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Remove
            </Button>
          )}
        {passengerId === 'new' && hasPermission('PASSENGER_CREATE') && (
          <Button
            className='whitespace-nowrap mx-2'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreatePassenger}>
            Save
          </Button>
        )}
        {handleDelete !== 'deletePassenger' &&
          handleUpdate === 'updatePassenger' &&
          passengerId !== 'new' &&
          hasPermission('PASSENGER_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300'
              color='secondary'
              variant='contained'
              onClick={handleUpdatePassenger}>
              Update
            </Button>
          )}
        <Button
          className='whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300'
          variant='contained'
          onClick={handleCancel}>
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default PassengerHeader;
