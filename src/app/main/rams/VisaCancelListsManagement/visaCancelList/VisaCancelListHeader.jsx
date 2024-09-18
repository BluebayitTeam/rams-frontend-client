/* eslint-disable no-undef */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import { AddedSuccessfully, RemoveSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import {
	useCreateVisaCancelListMutation,
	useDeleteVisaCancelListMutation,
	useUpdateVisaCancelListMutation
} from '../VisaCancelListsApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The visaCancelList header.
 */
function VisaCancelListHeader({ handleReset, emptyValue }) {
	const routeParams = useParams();
	const { visaCancelListId } = routeParams;
	const [createVisaCancelList] = useCreateVisaCancelListMutation();
	const [saveVisaCancelList] = useUpdateVisaCancelListMutation();
	const [removeVisaCancelList] = useDeleteVisaCancelListMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { dirtyFields } = formState;

	const navigate = useNavigate();

	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();

	function handleUpdateVisaCancelList() {
		saveVisaCancelList(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'updateVisaCancelList');

						handleReset({
							...emptyValue
						});

						UpdatedSuccessfully();
						navigate('/apps/visaCancelList-management/visaCancelLists/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating visaCancelList', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateVisaCancelList() {
		createVisaCancelList(getValues())
			// .unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveVisaCancelList');

						handleReset({
							...emptyValue
						});
					}

					navigate('/apps/visaCancelList-management/visaCancelLists/new');
					AddedSuccessfully();
				}
			});
	}

	function handleRemoveVisaCancelList() {
		removeVisaCancelList(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						handleReset({
							...emptyValue
						});
						localStorage.setItem('medicalAlert', 'saveVisaCancelList');
						navigate('/apps/visaCancelList-management/visaCancelLists/new');

						dispatch(showMessage({ message: 'Please Restart The Backend', variant: 'error' }));
					}
				}

				RemoveSuccessfully();
			})
			.catch((error) => {
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	const handleCancel = () => {
		handleReset({
			...emptyValue
		});
		navigate('/apps/visaCancelList-management/visaCancelLists/new');
	};

	return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0 mx-8 sm:mc-16'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className='text-16 sm:text-20 truncate font-semibold'>
                {routeParams.visaCancelListId === 'new'
                  ? 'Create New Visa Cancel List'
                  : passengers?.find(({ id }) => id === watch('passenger'))
                      ?.passenger_name || ''}
              </Typography>
              <Typography variant='caption' className='font-medium'>
                {routeParams.visaCancelListId !== 'new' &&
                  'Visa Cancel List Detail'}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {(routeParams.visaCancelListId === 'new' ||
          (sessionStorage.getItem('operation') === 'save' &&
            watch('passenger'))) &&
          hasPermission('VISA_CANCEL_LIST_CREATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              disabled={_.isEmpty(dirtyFields)}
              onClick={handleCreateVisaCancelList}>
              Save
            </Button>
          )}

        {routeParams?.visaCancelListId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('VISA_CANCEL_LIST_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              variant='contained'
              onClick={handleUpdateVisaCancelList}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}>
              Update
            </Button>
          )}

        {routeParams?.visaCancelListId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('VISA_CANCEL_LIST_DELETE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300'
              variant='contained'
              onClick={handleRemoveVisaCancelList}
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

export default VisaCancelListHeader;
