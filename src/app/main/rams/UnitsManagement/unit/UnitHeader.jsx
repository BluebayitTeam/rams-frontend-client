import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
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
import { hasPermission } from 'src/app/constant/permission/permissionList';
import {
  useCreateUnitMutation,
  useDeleteUnitMutation,
  useUpdateUnitMutation,
} from '../UnitsApi';

/**
 * The unit header.
 */
function UnitHeader() {
  const routeParams = useParams();
  const { unitId } = routeParams;
  const [createUnit] = useCreateUnitMutation();
  const [saveUnit] = useUpdateUnitMutation();
  const [removeUnit] = useDeleteUnitMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteUnit');
  const handleUpdate = localStorage.getItem('updateUnit');

  function handleUpdateUnit() {
    saveUnit(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/unit/units`);
    });
  }

  function handleCreateUnit() {
    createUnit(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/unit/units`);
      });
  }

  function handleRemoveUnit(dispatch) {
    removeUnit(unitId);
    DeletedSuccessfully();
    navigate('/apps/unit/units');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/unit/units`);
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
            to='/apps/unit/units'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Units</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteUnit' && unitId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this unit?
          </Typography>
        )}
        {handleDelete === 'deleteUnit' &&
          unitId !== 'new' &&
          hasPermission('DEPARTMENT_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              onClick={handleRemoveUnit}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ backgroundColor: '#ea5b78', color: 'white', padding: "0 28px" }}>
              Remove
            </Button>
          )}
        {unitId === 'new' && hasPermission('DEPARTMENT_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateUnit}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteUnit' &&
          handleUpdate === 'updateUnit' &&
          unitId !== 'new' &&
          hasPermission('DEPARTMENT_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateUnit}>
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

export default UnitHeader;
