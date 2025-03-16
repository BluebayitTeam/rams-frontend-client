import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
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
import { hasPermission } from 'src/app/constant/permission/permissionList';
import {
  useCreateComputeMutation,
  useDeleteComputeMutation,
  useUpdateComputeMutation,
} from '../ComputesApi';

/**
 * The compute header.
 */
function ComputeHeader() {
  const routeParams = useParams();
  const { computeId } = routeParams;
  const [createCompute] = useCreateComputeMutation();
  const [saveCompute] = useUpdateComputeMutation();
  const [removeCompute] = useDeleteComputeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteCompute');
  const handleUpdate = localStorage.getItem('updateCompute');

  function handleUpdateCompute() {
    saveCompute(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/compute/computes`);
    });
  }

  function handleCreateCompute() {
    createCompute(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/compute/computes`);
      });
  }

  function handleRemoveCompute(dispatch) {
    removeCompute(computeId);
    DeletedSuccessfully();
    navigate('/apps/compute/computes');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/compute/computes`);
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0'>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
          <Typography
            className='flex items-center sm:mb-12'
            component={Link}
            role='button'
            to='/apps/compute/computes'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Computes</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteCompute' && computeId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this compute?
          </Typography>
        )}
        {handleDelete === 'deleteCompute' &&
          computeId !== 'new' &&
          hasPermission('DEPARTMENT_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              onClick={handleRemoveCompute}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ backgroundColor: '#ea5b78', color: 'white', padding: "0 28px" }}>
              Remove
            </Button>
          )}
        {computeId === 'new' && hasPermission('DEPARTMENT_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateCompute}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteCompute' &&
          handleUpdate === 'updateCompute' &&
          computeId !== 'new' &&
          hasPermission('DEPARTMENT_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateCompute}>
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

export default ComputeHeader;
