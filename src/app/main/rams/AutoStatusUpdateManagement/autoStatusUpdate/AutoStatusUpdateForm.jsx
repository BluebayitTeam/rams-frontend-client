/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import { useGetAutoStatusUpdateQuery } from '../AutoStatusUpdatesApi';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  clmsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: 'calc(100vh - 180px)',
    transition: '1s',
    alignContent: 'flex-start',
    marginTop: '5px',
    marginBottom: '5px',
  },
  checkboxLabel: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
  },
  checkbox: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
  },
}));

function AutoStatusUpdateForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, watch, setValue, setError, reset } = methods;

  const routeParams = useParams();
  const classes = useStyles(props);
  const [autoStatusUpdateId, setAutoStatusUpdateId] = useState('');

  const [loading, setLoading] = useState(false);
  const [openSuccessStatusAlert, setOpenSuccessStatusAlert] = useState(false);

  const { data, refetch, isSuccess } = useGetAutoStatusUpdateQuery();

  const updateStatus = () => {
    setLoading(true);

    refetch();

    // fetch(`${GET_SITESETTINGS}`, authTOKEN)
    // 	.then(response => response.json())
    // 	.then(data => {
    // 		if (data.id) {
    // 			setLoading(false);
    // 			setOpenSuccessStatusAlert(true);
    // 			setTimeout(() => setOpenSuccessStatusAlert(false), 2000);
    // 		}
    // 	});
  };

  return (
    <div>
      <div
        className='mb-40 mt-40'
        style={{ visibility: loading ? 'visible' : 'hidden' }}>
        <Box sx={{ width: '100%', height: '10px' }}>
          <LinearProgress />
        </Box>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          // onclick={() => updateStatus()}
          onClick={(event) => updateStatus()}
          class='bg-blue-500 text-20 text-center hover:bg-blue-400 text-white font-bold py-5 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
          Update
        </Button>
      </div>

      {/* Dialog For Success Alert   */}

      <Dialog
        open={openSuccessStatusAlert}
        onClose={() => setOpenSuccessStatusAlert(false)}
        style={{ borderRadius: '15px' }}>
        <DialogTitle
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            color: 'blue',
          }}>
          {' '}
          <img
            className='h-full block rounded'
            style={{ borderRadius: '30px' }}
            width='150px'
            height='150px'
            src='/assets/images/userImg/success.gif'
          />
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default AutoStatusUpdateForm;
