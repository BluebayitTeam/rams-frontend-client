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
  CustomNotification,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateSalaryPaymentMutation,
  useDeleteSalaryPaymentMutation,
  useUpdateSalaryPaymentMutation,
} from '../SalaryPaymentsApi';
import _ from 'lodash';

/**
 * The salaryPayment header.
 */
function SalaryPaymentHeader() {
  const routeParams = useParams();

  console.log('hhhhhhh', routeParams);
  const { salaryPaymentId, invoiceId } = routeParams;
  const [createSalaryPayment] = useCreateSalaryPaymentMutation();
  const [saveSalaryPayment] = useUpdateSalaryPaymentMutation();
  const [removeSalaryPayment] = useDeleteSalaryPaymentMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem('deleteSalaryPayment');

  const handleUpdate = localStorage.getItem('updateSalaryPayment');

  function handleUpdateSalaryPayment() {
    const payload = {
      ...getValues(),
      id: salaryPaymentId,
    };
    saveSalaryPayment(payload).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/salaryPayment/salaryPayments`);
    });
  }

  function handleCreateSalaryPayment() {
    createSalaryPayment(getValues())
      .unwrap()
      .then((data) => {
        console.log('dataCheck', data);
        AddedSuccessfully();
        navigate(`/apps/salaryPayment/salaryPayments`);
      })
      .catch((error) => {
        CustomNotification('error', `${error.response.data.detail}`);
      });
  }

  function handleRemoveSalaryPayment(dispatch) {
    removeSalaryPayment(invoiceId);
    DeletedSuccessfully();
    navigate('/apps/salaryPayment/salaryPayments');
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: 'error' })
    );
  }

  function handleCancel() {
    navigate(`/apps/salaryPayment/salaryPayments`);
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
            to='/apps/salaryPayment/salaryPayments'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Assign Payheads</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteSalaryPayment' &&
          salaryPaymentId !== 'new' && (
            <Typography className='mt-6' variant='subtitle2'>
              Do you want to remove this salaryPayment?
            </Typography>
          )}
        {
          handleDelete === 'deleteSalaryPayment' &&
            salaryPaymentId !== 'new' && (
              // hasPermission('PAY_HEAD_TYPE_DELETE') && (
              <Button
                className='whitespace-nowrap mx-4'
                variant='contained'
                color='secondary'
                onClick={handleRemoveSalaryPayment}
                startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
                style={{ backgroundColor: '#ea5b78', color: 'white' }}>
                Remove
              </Button>
            )
          // )
        }
        {salaryPaymentId === 'new' && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateSalaryPayment}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteSalaryPayment' &&
          handleUpdate === 'updateSalaryPayment' &&
          salaryPaymentId !== 'new' && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateSalaryPayment}>
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

export default SalaryPaymentHeader;
