/* eslint-disable no-undef */
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddedSuccessfully, RemoveSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import history from '@history';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import _ from 'lodash';
import { useCreateMofaMutation, useDeleteMofaMutation, useUpdateMofaMutation } from '../MofasApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The mofa header.
 */
function MofaHeader({ handleReset, emptyValue }) {
	console.log('emptyValue', emptyValue);
	const routeParams = useParams();
	const { mofaId } = routeParams;
	const [createMofa] = useCreateMofaMutation();
	const [saveMofa] = useUpdateMofaMutation();
	const [removeMofa] = useDeleteMofaMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteMofa');
	const handleUpdate = localStorage.getItem('updateMofa');
	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();
	// const user_role = localStorage.getItem('user_role');

	function handleUpdateMofa() {
		saveMofa(getValues())
			.then((res) => {
				if (res.data?.id) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('MofaAlert', 'updateMofa');

						handleReset({
							...emptyValue,
							remofa_status: doneNotDone.find((data) => data.default)?.id,
							mofa_status: doneNotDone.find((data) => data.default)?.id
						});

						UpdatedSuccessfully();
						navigate('/apps/mofa-management/mofas/new');
					}
				} else {
					// Handle cases where res.data.id is not present
					console.error('Update failed: No id in response data');
				}
			})
			.catch((error) => {
				// Handle error
				console.error('Error updating mofa', error);
				dispatch(showMessage({ message: `Error: ${error.message}`, variant: 'error' }));
			});
	}

	function handleCreateMofa() {
		createMofa(getValues())
			// .unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						localStorage.setItem('medicalAlert', 'saveMofa');

						handleReset({
							...emptyValue,
							remofa_status: doneNotDone.find((data) => data.default)?.id,
							mofa_status: doneNotDone.find((data) => data.default)?.id
						});

						navigate('/apps/mofa-management/mofas/new');
						AddedSuccessfully();
					}
				}
			});
	}

	function handleRemoveMofa() {
		removeMofa(getValues()?.id)
			.unwrap()
			.then((res) => {
				if (res) {
					if (fromSearch) {
						history.goBack();
					} else {
						handleReset({
							...emptyValue,
							remofa_status: doneNotDone.find((data) => data.default)?.id,
							mofa_status: doneNotDone.find((data) => data.default)?.id
						});

						localStorage.setItem('medicalAlert', 'saveMofa');
						navigate('/apps/mofa-management/mofas/new');
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
			...emptyValue,
			remofa_status: doneNotDone.find((data) => data.default)?.id,
			mofa_status: doneNotDone.find((data) => data.default)?.id
		});

		navigate('/apps/mofa-management/mofas/new');
	};

	// useEffect(() => {
	// 	if (mofaId === 'new') {
	// 		reset({
	// 			passenger: 'all',
	// 			mofa_agency: 'all',

	// 			remofa_status: doneNotDone.find((data) => data.default)?.id,
	// 			mofa_status: doneNotDone.find((data) => data.default)?.id,

	// 			why_remofa: '',
	// 			mofa_date: '',
	// 			remofa_charge: ''
	// 		});
	// 	}
	// }, [mofaId, reset]);
	return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0 mx-8 sm:mc-16'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className='text-16 sm:text-20 truncate font-semibold'>
                {routeParams.mofaId === 'new'
                  ? 'Create New Mofa'
                  : passengers?.find(({ id }) => id === watch('passenger'))
                      ?.passenger_name || ''}
              </Typography>
              <Typography variant='caption' className='font-medium'>
                {routeParams.mofaId !== 'new' && 'Mofas Detail'}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {(routeParams.mofaId === 'new' ||
          (sessionStorage.getItem('operation') === 'save' &&
            watch('passenger'))) &&
          hasPermission('MOFA_CREATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              disabled={_.isEmpty(dirtyFields)}
              onClick={handleCreateMofa}>
              Save
            </Button>
          )}

        {routeParams?.mofaId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('MOFA_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
              variant='contained'
              onClick={handleUpdateMofa}
              // startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Update
            </Button>
          )}

        {routeParams?.mofaId !== 'new' &&
          watch('passenger') &&
          sessionStorage.getItem('operation') !== 'save' &&
          hasPermission('MOFA_DELETE') && (
            <Button
              className='whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300'
              variant='contained'
              onClick={handleRemoveMofa}
              // startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
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

export default MofaHeader;
