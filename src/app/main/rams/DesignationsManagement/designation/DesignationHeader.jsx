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
import {
	useCreateDesignationMutation,
	useDeleteDesignationMutation,
	useUpdateDesignationMutation
} from '../DesignationsApi';

/**
 * The designation header.
 */
function DesignationHeader() {
	const routeParams = useParams();
	const { designationId } = routeParams;
	const [createDesignation] = useCreateDesignationMutation();
	const [saveDesignation] = useUpdateDesignationMutation();
	const [removeDesignation] = useDeleteDesignationMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteDesignation');
	const handleUpdate = localStorage.getItem('updateDesignation');

	function handleUpdateDesignation() {
		saveDesignation(getValues()).then((data) => {
			UpdatedSuccessfully();

			navigate(`/apps/designation/designations`);
		});
	}

	function handleCreateDesignation() {
		createDesignation(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/designation/designations`);
			});
	}

	function handleRemoveDesignation(dispatch) {
		removeDesignation(designationId);
		DeletedSuccessfully();
		navigate('/apps/designation/designations');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/designation/designations`);
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
            to='/apps/designation/designations'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Designations</span>
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
                src='assets/images/apps/ecommerce/designation-image-placeholder.png'
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold'>
              {name || 'New Designation'}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Designation Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteDesignation' && designationId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this designation?
          </Typography>
        )}
        {handleDelete === 'deleteDesignation' &&
          designationId !== 'new' &&
          hasPermission('DESIGNATION_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              onClick={handleRemoveDesignation}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ backgroundColor: '#ea5b78', color: 'white' }}>
              Remove
            </Button>
          )}
        {designationId === 'new' && hasPermission('DESIGNATION_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateDesignation}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteDesignation' &&
          handleUpdate === 'updateDesignation' &&
          designationId !== 'new' &&
          hasPermission('DESIGNATION_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateDesignation}>
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

export default DesignationHeader;
