import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from '../DepartmentsApi';

function DepartmentForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors, dirtyFields, isValid } = formState;
  const routeParams = useParams();
  const handleDelete = localStorage.getItem('deleteDepartment');
  const [createDepartment] = useCreateDepartmentMutation();
  const [saveDepartment] = useUpdateDepartmentMutation();
  const navigate = useNavigate();

  function handleCreateDepartment() {
    createDepartment(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/department/departments`);
      });
  }

  function handleUpdateDepartment() {
    saveDepartment(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/department/departments`);
    });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      if (
        routeParams?.departmentName === 'new' &&
        !_.isEmpty(dirtyFields) &&
        isValid
      ) {
        handleCreateDepartment();
      } else if (routeParams?.departmentName && handleDelete !== 'Delete') {
        handleUpdateDepartment();
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

export default DepartmentForm;
