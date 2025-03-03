import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  useCreateProfilesMutation,
  useUpdateProfilesMutation,
} from '../ProfilessApi';
import {
  AddedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';

function ProfilesForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors, dirtyFields, isValid } = formState;
  const routeParams = useParams();
  const handleDelete = localStorage.getItem('deleteProfiles');
  const [createProfiles] = useCreateProfilesMutation();
  const [saveProfiles] = useUpdateProfilesMutation();
  const navigate = useNavigate();

  function handleCreateProfiles() {
    createProfiles(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/profiles/profiless`);
      });
  }

  function handleUpdateProfiles() {
    saveProfiles(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/profiles/profiless`);
    });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      if (
        routeParams?.profilesName === 'new' &&
        !_.isEmpty(dirtyFields) &&
        isValid
      ) {
        handleCreateProfiles();
      } else if (routeParams?.profilesName && handleDelete !== 'Delete') {
        handleUpdateProfiles();
      }
    }
  };

  return (
    <div>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            required
            label='Name'
            autoFocus
            id='name'
            variant='outlined'
            fullWidth
            error={!!errors.name}
            helperText={errors?.name?.message}
            onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />
    </div>
  );
}

export default ProfilesForm;
