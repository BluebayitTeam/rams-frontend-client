import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { useDispatch } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { holydayTypes } from 'src/app/@data/data';

function HolidayCalenderForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors } = formState;
  console.log('getValues', getValues());
  return (
    <div>
      {/* Name */}
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
          />
        )}
      />
      <Controller
        name='holiday_type'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={
                value ? holydayTypes.find((data) => data.id === value) : null
              }
              options={holydayTypes}
              getOptionLabel={(option) => `${option?.name} `}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Holyday type'
                  label='Holydays type'
                  error={!!errors.holiday_type}
                  required
                  helperText={errors?.holiday_type?.message}
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
        name='description'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.description}
              helperText={errors?.description?.message}
              label='Description'
              id='description'
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
    </div>
  );
}

export default HolidayCalenderForm;
