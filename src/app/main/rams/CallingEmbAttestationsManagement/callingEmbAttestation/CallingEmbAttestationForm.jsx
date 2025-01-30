/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { Autocomplete, TextField } from '@mui/material';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';

// const useStyles = makeStyles((theme) => ({
// 	hidden: {
// 		display: 'none'
// 	},
// 	productImageUpload: {
// 		transitionProperty: 'box-shadow',
// 		transitionDuration: theme.transitions.duration.short,
// 		transitionTimingFunction: theme.transitions.easing.easeInOut
// 	}
// }));

function CallingEmbAttestationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, reset } = methods;
  const { errors } = formState;
  const routeParams = useParams();
  // const { callingEmbAttestationId } = routeParams;
  const intervieweds = doneNotDone;
  const submittedForSevs = doneNotDone;
  const sevReceiveds = doneNotDone;
  const SubmittedForPermissionImmigrationClearances = doneNotDone;
  const accountsClareds = doneNotDone;
  const handoverPassportTickets = doneNotDone;
  const dispatcheds = doneNotDone;
  const repatriations = doneNotDone;

  // const doc1File = watch('doc1_image') || '';
  // const doc2File = watch('doc2_image') || '';
  // const classes = useStyles(props);
  // const [previewDoc2File, setPreviewDoc2File] = useState('');

  // const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');

  // const [previewDoc1Image, setPreviewDoc1Image] = useState('');

  // const [fileExtDoc2Name, setFileExtDoc2Name] = useState('');

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getCurrentStatuss());

    if (routeParams.callingEmbAttestationId === 'new') {
      reset({
        interviewed: 'not_done',
        submitted_for_sev: 'not_done',
        sev_received: 'not_done',
        submitted_for_permission_immigration_clearance: 'not_done',
        immigration_clearance: 'not_done',
        accounts_cleared: 'not_done',
        handover_passport_ticket: 'not_done',
        dispatched: 'not_done',
        repatriation: 'not_done',
      });
    }
  }, []);

  // useEffect(() => {
  // 	setFileExtDoc1Name('');
  // 	setPreviewDoc1Image('');
  // }, [getValues('emb_attestation_status')]);
  return (
    <div>
      <Controller
        name='accounts_cleared'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value
                ? handoverPassportTickets.find((data) => data.id === value)
                : null
            }
            options={handoverPassportTickets}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Accounts Cleared Status'
                label='Accounts Cleared Status'
                error={!!errors.accounts_cleared}
                helperText={errors?.accounts_cleared?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='accounts_cleared_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.accounts_cleared_date}
            helperText={errors?.accounts_cleared_date?.message}
            label='Accounts Cleared Date'
            id='accounts_cleared_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='dispatched'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? dispatcheds.find((data) => data.id === value) : null}
            options={dispatcheds}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Dispatched Status'
                label='Dispatched Status'
                error={!!errors.dispatched}
                helperText={errors?.dispatched?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='dispatched_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.dispatched_date}
            helperText={errors?.dispatched_date?.message}
            label='Dispatched Date'
            id='dispatched_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='handover_passport_ticket'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? accountsClareds.find((data) => data.id == value) : null
            }
            options={accountsClareds}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Handover Passport Ticket Status'
                label='Handover Passport Ticket Status'
                error={!!errors.handover_passport_ticket}
                helperText={errors?.handover_passport_ticket?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='handover_passport_ticket_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.handover_passport_ticket_date}
            helperText={errors?.handover_passport_ticket_date?.message}
            label='Handover Passport Ticket Date'
            id='handover_passport_ticket_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='immigration_clearance'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? sevReceiveds.find((data) => data.id === value) : null
            }
            options={sevReceiveds}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Immigration Clearance Status'
                label='Immigration ClearanceStatus'
                error={!!errors.immigration_clearance}
                helperText={errors?.immigration_clearance?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='immigration_clearance_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.immigration_clearance_date}
            helperText={errors?.immigration_clearance_date?.message}
            label='Immigration Clearance Date'
            id='immigration_clearance_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='interviewed'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? intervieweds.find((data) => data.id === value) : null
            }
            options={intervieweds}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select interviewed Status'
                label='interviewed Status'
                error={!!errors.interviewed}
                helperText={errors?.interviewed?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='interviewed_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.interviewed_date}
            helperText={errors?.interviewed_date?.message}
            label='interviewed date'
            id='interviewed_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />

      <Controller
        name='repatriation'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? repatriations.find((data) => data.id === value) : null
            }
            options={repatriations}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Repatriation Status'
                label='Repatriation Status'
                error={!!errors.repatriation}
                helperText={errors?.repatriation?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='repatriation_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.repatriation_date}
            helperText={errors?.repatriation_date?.message}
            label='Repatriation Date'
            id='repatriation_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='sev_received'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? sevReceiveds.find((data) => data.id === value) : null
            }
            options={sevReceiveds}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Sev Received Status'
                label='Sev Received Status'
                error={!!errors.sev_received}
                helperText={errors?.sev_received?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='sev_received_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.sev_received_date}
            helperText={errors?.sev_received_date?.message}
            label='Sev Received Date'
            id='sev_received_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='submitted_for_permission_immigration_clearance'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value
                ? SubmittedForPermissionImmigrationClearances.find(
                    (data) => data.id === value
                  )
                : null
            }
            options={SubmittedForPermissionImmigrationClearances}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Sev Received Status'
                label='Submitted For Permission Immigration Clearance Status'
                error={!!errors.submitted_for_permission_immigration_clearance}
                helperText={
                  errors?.submitted_for_permission_immigration_clearance
                    ?.message
                }
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='submitted_for_permission_immigration_clearance_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.submitted_for_permission_immigration_clearance_date}
            helperText={
              errors?.submitted_for_permission_immigration_clearance_date
                ?.message
            }
            label='Submitted For Permission Immigration Clearance Date'
            id='submitted_for_permission_immigration_clearance_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
      <Controller
        name='submitted_for_sev'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? submittedForSevs.find((data) => data.id === value) : null
            }
            options={submittedForSevs}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select interviewed Status'
                label='interviewed Status'
                error={!!errors.submitted_for_sev}
                helperText={errors?.submitted_for_sev?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name='submitted_for_sev_date'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.submitted_for_sev_date}
            helperText={errors?.submitted_for_sev_date?.message}
            label='Submitted For Sev Date'
            id='submitted_for_sev_date'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default CallingEmbAttestationForm;
