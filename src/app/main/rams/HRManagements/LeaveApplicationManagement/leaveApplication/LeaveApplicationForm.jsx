import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getAttendanceProductionTypes,
  getEmployees,
  getLeaveTypes,
  getUnits,
} from 'app/store/dataSlice';

import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  genders,
  holydayTypes,
  leaveApplicationStatus,
} from 'src/app/@data/data';
import { GET_APPLICANT_LEAVE_HISTORY } from 'src/app/constant/constants';

function LeaveApplicationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const routeParams = useParams();
  const { LeaveApplicationId } = routeParams;
  const { errors } = formState;
  const employees = useSelector((state) => state.data.employees);
  const leaveTypes = useSelector((state) => state.data.leaveTypes);
  const file = watch('file') || '';

  const [previewFile, setPreviewFile] = useState('');
  const [fileExtName, setFileExtName] = useState('');
  const [previewImage, setPreviewImage] = useState();
  console.log('routeParams', routeParams);
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getLeaveTypes());
    dispatch(getAttendanceProductionTypes());
    dispatch(getUnits());
  }, []);
  const handleGetLeaveHistory = (employeeId) => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    fetch(`${GET_APPLICANT_LEAVE_HISTORY}${employeeId}`, authTOKEN)
      .then((response) => response.json())
      .then((res) => {
        const { leave_applications } = res;
        console.log('Response:', leave_applications);

        if (
          leave_applications &&
          Array.isArray(leave_applications) &&
          leave_applications.length > 0
        ) {
          const tableRows = leave_applications
            .map((leave, index) => {
              const date = leave?.date;
              const duration = leave?.num_of_days;
              const leave_type = leave?.leave_type?.name;
              const reason = leave?.reason_for_leave;
              const selectedDate = leave?.leave_application_dates?.forEach(
                (item) => {
                  item.date = item.date.split('-').join(', ');
                }
              );
              return `<tr class="border-b">
                                <td class="px-4 py-2 text-center">${index + 1}</td>
                                <td class="px-4 py-2 text-center">${date}</td>
                                <td class="px-4 py-2 text-center">${duration}</td>
                                <td class="px-4 py-2 text-center">${leave_type}</td>
                                <td class="px-4 py-2 text-center">${reason}</td>
                            </tr>`;
            })
            .join('');

          Swal.fire({
            title: `<span style="color: red; text-align:justify;">Leave History</span>`,
            html: `<div class="overflow-x-auto">
                               <table class="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr class="bg-gray-200">
                                            <th class="px-4 py-2 border-b text-center">#</th>
                                            <th class="px-4 py-2 border-b text-center">Date</th>
                                            <th class="px-4 py-2 border-b text-center">Duration</th>
                                            <th class="px-4 py-2 border-b text-center">Leave Type</th>
                                            <th class="px-4 py-2 border-b text-center">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tableRows}
                                    </tbody>
                               </table>
                           </div>`,
            icon: 'warning',
            showConfirmButton: true,
          });
        }
      });
  };
  return (
    <div>
      {LeaveApplicationId !== 'new' && (
        <Controller
          name='status'
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Autocomplete
                className='mt-8 mb-16'
                freeSolo
                value={
                  value
                    ? leaveApplicationStatus.find((data) => data.id === value)
                    : null
                }
                options={leaveApplicationStatus}
                getOptionLabel={(option) => `${option?.name} `}
                onChange={(event, newValue) => {
                  onChange(newValue?.id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Select Status'
                    label='Approval Status'
                    error={!!errors.status}
                    required
                    helperText={errors?.status?.message}
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            );
          }}
        />
      )}

      {LeaveApplicationId !== 'new' && (
        <div className='mb-10 '>
          <VisibilityIcon
            onClick={(memberEvent) => {
              handleGetLeaveHistory(watch('applicant'));
            }}
            style={{ fontSize: '25px', marginRight: '5px' }}
            className='cursor-pointer custom-edit-icon-style text-orange-700'
          />
          Previous Leave History
        </div>
      )}

      <CustomDatePicker
        className='mt-8 mb-16'
        name='date'
        label='Date'
        placeholder='DD-MM-YYYY'
      />

      <Controller
        name='applicant'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={value ? employees.find((data) => data.id === value) : null}
              options={employees}
              getOptionLabel={(option) =>
                `${option?.first_name} ${option?.last_name}`
              }
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Employee'
                  label='Employee'
                  error={!!errors.applicant}
                  required
                  helperText={errors?.applicant?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />

      <Controller
        control={control}
        name='dates'
        rules={{ required: true }}
        render={({
          field: { onChange, name, value },
          formState: { errors },
        }) => {
          console.log('fieldDates', value);
          return (
            <>
              <DatePicker
                value={value || []}
                onChange={(dates) => {
                  const formattedDates = dates.map((date) =>
                    dayjs(date).format('MM/DD/YYYY')
                  );
                  onChange(formattedDates);
                }}
                format={'MM/DD/YYYY'}
                multiple
                plugins={[<DatePanel />]}
                placeholder='Holidays Calendar'
                style={{
                  backgroundColor: 'aliceblue',
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '26px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  padding: '30px 10px',
                }}
                containerStyle={{
                  width: '100%',
                }}
              />
              {errors && errors[name] && errors[name].type === 'required' && (
                <span>Your error message!</span>
              )}
            </>
          );
        }}
      />

      <Controller
        name='reason_for_leave'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.reason_for_leave}
              helperText={errors?.reason_for_leave?.message}
              label='Leave Reason'
              id='reason_for_leave'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />

      <Controller
        name='leave_type'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={
                value ? leaveTypes.find((data) => data.id === value) : null
              }
              options={leaveTypes}
              getOptionLabel={(option) => `${option?.name} `}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Leavet Types'
                  label='Leave Type'
                  error={!!errors.leave_type}
                  required
                  helperText={errors?.leave_type?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />

      <Controller
        name='team_lead_email'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.team_lead_email}
              helperText={errors?.team_lead_email?.message}
              label='Team Lead Email'
              id='team_lead_email'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />

      <Controller
        name='note'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.note}
              helperText={errors?.note?.message}
              label='Leave Note'
              id='note'
              multiline
              rows={4}
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <div className='flex justify-center sm:justify-start flex-wrap -mx-16'>
        <Controller
          name='file'
          control={control}
          render={({ field: { onChange, value } }) => (
            <label
              htmlFor='button-file'
              className={clsx(
                classes.productImageUpload,
                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
              )}>
              <input
                // accept="image/x-png,image/gif,image/jpeg,leaveApplication/pdf"
                className='hidden'
                id='button-file'
                type='file'
                onChange={async (e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setPreviewFile(reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);

                  const file = e.target.files[0];

                  setFileExtName(
                    e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase()
                  );

                  onChange(file);
                }}
              />
              <Icon fontSize='large' color='action'>
                cloud_upload
              </Icon>
            </label>
          )}
        />
        {!previewFile && file && (
          <div
            style={{
              width: 'auto',
              height: '150px',
              overflow: 'hidden',
              display: 'flex',
            }}>
            {(file?.name || file)?.split('.')?.pop()?.toLowerCase() ===
            'pdf' ? (
              <PictureAsPdf
                style={{
                  color: 'red',
                  cursor: 'pointer',
                  display: 'block',
                  fontSize: '35px',
                  margin: 'auto',
                }}
                onClick={() => window.open(`${BASE_URL}${file}`)}
              />
            ) : (
              <img src={`${BASE_URL}${file}`} style={{ height: '150px' }} />
            )}
          </div>
        )}

        {previewFile && (
          <div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
            {fileExtName === 'pdf' ? (
              <iframe
                src={previewFile}
                frameBorder='0'
                scrolling='auto'
                height='150px'
                width='150px'
              />
            ) : (
              <img src={previewFile} style={{ height: '150px' }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveApplicationForm;
