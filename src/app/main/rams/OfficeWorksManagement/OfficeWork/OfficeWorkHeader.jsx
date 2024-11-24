/* eslint-disable no-undef */
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import {
  AddedSuccessfully,
  RemoveSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import {
  useCreateOfficeWorkMutation,
  useDeleteOfficeWorkMutation,
  useUpdateOfficeWorkMutation,
} from '../OfficeWorksApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The medical header.
 */
function OfficeWorkHeader({ handleReset, emptyValue }) {
  console.log('emptyValue', emptyValue);

  const routeParams = useParams();
  const { officeWorkId } = routeParams;
  const [createOfficeWork] = useCreateOfficeWorkMutation();
  const [saveOfficeWork] = useUpdateOfficeWorkMutation();
  const [removeOfficeWork] = useDeleteOfficeWorkMutation();
  const methods = useFormContext();
  const { formState, watch, getValues, reset } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteOfficeWork');
  const handleUpdate = localStorage.getItem('updateOfficeWork');
  const passengers = useSelector((state) => state.data.passengers);
  const { fromSearch } = useParams();
  // const user_role = localStorage.getItem('user_role');

  function handleUpdateOfficeWork() {
    saveOfficeWork(getValues())
      .then((res) => {
        if (res.data?.id) {
          if (fromSearch) {
            navigate(-1);
          } else {
            localStorage.setItem('officeWorkAlert', 'updateOfficeWork');

            handleReset({
              ...emptyValue,
              police_clearance_status: doneNotDone.find((data) => data.default)
                ?.id,
              driving_license_status: doneNotDone.find((data) => data.default)
                ?.id,
              finger_status: doneNotDone.find((data) => data.default)?.id,
            });

            UpdatedSuccessfully();
            navigate('/apps/officeWork/officeWorks/new');
          }
        } else {
          // Handle cases where res.data.id is not present
          console.error('Update failed: No id in response data');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating officeWork', error);
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: 'error' })
        );
      });
  }

  function handleCreateOfficeWork() {
    createOfficeWork(getValues())
      .unwrap()
      .then((res) => {
        // console.log('resbvbv', res);

        if (res?.id) {
          // Checking if response data contains id

          if (fromSearch == 'fromSearch') {
            navigate(-1);
          } else {
            localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
            handleReset({
              ...emptyValue,
              police_clearance_status: doneNotDone.find((data) => data.default)
                ?.id,
              driving_license_status: doneNotDone.find((data) => data.default)
                ?.id,
              finger_status: doneNotDone.find((data) => data.default)?.id,
            });
            navigate('/apps/officeWork/officeWorks/new');
            AddedSuccessfully();
          }
        } else {
          // Handle cases where res.data.id is not present
          console.error('Create failed: No id in response data');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating officeWork', error);
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: 'error' })
        );
      });
  }

  function handleRemoveOfficeWork() {
    removeOfficeWork(getValues()?.id)
      .unwrap()
      .then((res) => {
        console.log('khskdfhdskhf', res);

        if (res?.detail) {
          RemoveSuccessfully();

          if (fromSearch) {
            history.goBack();
          } else {
            handleReset({
              ...emptyValue,
              police_clearance_status: doneNotDone.find((data) => data.default)
                ?.id,
              driving_license_status: doneNotDone.find((data) => data.default)
                ?.id,
              finger_status: doneNotDone.find((data) => data.default)?.id,
            });
            localStorage.setItem('officeWorkAlert', 'saveOfficeWork');
            navigate('/apps/officeWork/officeWorks/new');

            dispatch(
              showMessage({
                message: 'Please Restart The Backend',
                variant: 'error',
              })
            );
          }
        }
      })
      .catch((error) => {
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: 'error' })
        );
      });
  }

  function handleCancel() {
    if (fromSearch == 'fromSearch') {
      navigate(-1);
    } else {
      handleReset({
        ...emptyValue,
        police_clearance_status: doneNotDone.find((data) => data.default)?.id,
        driving_license_status: doneNotDone.find((data) => data.default)?.id,
        finger_status: doneNotDone.find((data) => data.default)?.id,
      });
      navigate('/apps/officeWork/officeWorks/new');
    }
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0 mx-8 sm:mc-16'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className='text-16 sm:text-20 truncate font-semibold'>
                {routeParams.officeWorkId === 'new'
                  ? 'Create New Office Work'
                  : passengers?.find(({ id }) => id === watch('passenger'))
                      ?.passenger_name || ''}
              </Typography>
              <Typography variant='caption' className='font-medium'>
                {routeParams.officeWorkId !== 'new' && 'Office Work Detail'}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {(routeParams.officeWorkId === 'new' ||
          (sessionStorage.getItem('operation') === 'save' &&
            watch('passenger'))) &&
          hasPermission('OFFICE_WORK_CREATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleCreateOfficeWork}>
              Save
            </Button>
          )}

        {routeParams?.officeWorkId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('OFFICE_WORK_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              variant='contained'
              onClick={handleUpdateOfficeWork}
              // startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Update
            </Button>
          )}

        {routeParams?.officeWorkId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('OFFICE_WORK_DELETE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300'
              variant='contained'
              onClick={handleRemoveOfficeWork}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Remove
            </Button>
          )}
        {watch('passenger') && (
          <Button
            className='whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300'
            variant='contained'
            onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </motion.div>
    </div>
  );
}

export default OfficeWorkHeader;
