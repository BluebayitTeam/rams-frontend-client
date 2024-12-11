import { useNavigate, useParams } from "react-router";
import { useCreateTicketDeputeMutation, useDeleteTicketDeputeMutation, useUpdateTicketDeputeMutation } from "../../TicketDeputesManagement/TicketDeputesApi";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { motion } from 'framer-motion';
import { Button, Icon, Link, Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function TicketeditHeader() {
  const routeParams = useParams();
  const { ticketeditId } = routeParams;

  const [createTicketDepute] = useCreateTicketDeputeMutation();
  const [saveTicketDepute] = useUpdateTicketDeputeMutation();
  const [removeTicketDepute] = useDeleteTicketDeputeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();

  const handleDelete = localStorage.getItem('deleteTicketedit');
  const handleUpdate = localStorage.getItem('updateTicketedit');

  function handleUpdateTicketDepute() {
    saveTicketDepute(getValues()).then(() => {
      UpdatedSuccessfully();
      navigate(`/apps/ticketedit/ticketedits`);
    });
  }

  function handleCreateTicketDepute() {
    createTicketDepute(getValues())
      .unwrap()
      .then(() => {
        AddedSuccessfully();
        navigate(`/apps/ticketedit/ticketedits`);
      });
  }

  function handleRemoveTicketedit() {
    removeTicketDepute(ticketeditId)
      .unwrap()
      .then(() => {
        DeletedSuccessfully();
        navigate('/apps/ticketedit/ticketedits');
      });
  }

  function handleCancel() {
    navigate(`/apps/ticketedit/ticketedits`);
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
            to='/apps/ticketedit/ticketedits'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>Ticket Edits</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        {handleDelete === 'Delete' && ticketeditId !== 'new' && (
          <Typography className='mt-6' variant='subtitle2'>
            Do you want to remove this ticketDepute?
          </Typography>
        )}
        {handleDelete === 'Delete' && ticketeditId !== 'new' && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            onClick={handleRemoveTicketedit}
            startIcon={<Icon className='hidden sm:flex'>delete</Icon>}
            style={{ backgroundColor: '#ea5b78', color: 'white' }}>
            Remove
          </Button>
        )}
        {ticketeditId === 'new' && (
          <Button
            className='whitespace-nowrap mx-4'
            variant='contained'
            color='secondary'
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateTicketDepute}>
            Save
          </Button>
        )}
        {handleDelete !== 'Delete' &&
         
          ticketeditId !== 'new' && (
            <Button
              className='whitespace-nowrap mx-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateTicketDepute}>
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

export default TicketeditHeader;
