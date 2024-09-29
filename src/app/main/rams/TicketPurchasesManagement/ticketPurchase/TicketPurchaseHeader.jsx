import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Icon } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { AddedSuccessfully, DeletedSuccessfully, UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import {
	useCreateTicketPurchaseMutation,
	useDeleteTicketPurchaseMutation,
	useUpdateTicketPurchaseMutation
} from '../TicketPurchasesApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The ticketPurchase header.
 */
function TicketPurchaseHeader() {
	const routeParams = useParams();
	const { ticketPurchaseId } = routeParams;
	const [createTicketPurchase] = useCreateTicketPurchaseMutation();
	const [saveTicketPurchase] = useUpdateTicketPurchaseMutation();
	const [removeTicketPurchase] = useDeleteTicketPurchaseMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();
	const handleDelete = localStorage.getItem('deleteTicketPurchase');
	const handleUpdate = localStorage.getItem('updateTicketPurchase');

	function handleUpdateTicketPurchase() {
		saveTicketPurchase(getValues()).then((data) => {
			UpdatedSuccessfully();
			navigate(`/apps/ticketPurchase/ticketPurchases`);
		});
	}

	function handleCreateTicketPurchase() {
		createTicketPurchase(getValues())
			.unwrap()
			.then((data) => {
				AddedSuccessfully();

				navigate(`/apps/ticketPurchase/ticketPurchases`);
			});
	}

	function handleRemoveTicketPurchase(dispatch) {
		removeTicketPurchase(ticketPurchaseId);
		DeletedSuccessfully();
		navigate('/apps/ticketPurchase/ticketPurchases');
		dispatch(showMessage({ message: `Please Restart The Backend`, variant: 'error' }));
	}

	function handleCancel() {
		navigate(`/apps/ticketPurchase/ticketPurchases`);
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
            to='/apps/ticketPurchase/ticketPurchases'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>TicketPurchases</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'deleteTicketPurchase' && ticketPurchaseId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this ticketPurchase?
          </Typography>
        )}
        {handleDelete === 'deleteTicketPurchase' &&
          ticketPurchaseId !== 'new' &&
          hasPermission('DEPARTMENT_DELETE') && (
            <Button
              className='whitespace-nowrap mx-4'
              variant='contained'
              color='secondary'
              onClick={handleRemoveTicketPurchase}
              startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
              style={{ backgroundColor: '#ea5b78', color: 'white' }}>
              Remove
            </Button>
          )}
        {ticketPurchaseId === 'new' && hasPermission('DEPARTMENT_CREATE') && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateTicketPurchase}>
            Save
          </Button>
        )}
        {handleDelete !== 'deleteTicketPurchase' &&
          handleUpdate === 'updateTicketPurchase' &&
          ticketPurchaseId !== 'new' &&
          hasPermission('DEPARTMENT_UPDATE') && (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateTicketPurchase}>
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

export default TicketPurchaseHeader;
