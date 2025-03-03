import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  AddedSuccessfully,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import {
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
} from '../DesignationsApi';
import { useNavigate, useParams } from 'react-router';
import _ from 'lodash';

function DesignationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors, dirtyFields, isValid } = formState;
  const navigate = useNavigate();
  const routeParams = useParams();

  const [createDesignation] = useCreateDesignationMutation();
  const [saveDesignation] = useUpdateDesignationMutation();
  const handleDelete = localStorage.getItem('deleteDesignation');

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

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      if (
        routeParams?.designationName === 'new' &&
        !_.isEmpty(dirtyFields) &&
        isValid
      ) {
        handleCreateDesignation();
      } else if (routeParams?.designationName && handleDelete !== 'Delete') {
        handleUpdateDesignation();
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
            onKeyDown={handleSubmitOnKeyDownEnter}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        )}
      />
    </div>
  );
}

export default DesignationForm;
