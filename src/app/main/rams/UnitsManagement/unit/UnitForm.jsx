import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { compound } from 'src/app/@data/data';

function UnitForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name='type'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? compound.find((data) => data.name === value) : null}
            options={compound}
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.name ? newValue?.name : '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Type'
                label='Unit Type'
                error={!!errors.type}
                required
                helperText={errors?.type?.message}
                variant='outlined'
                autoFocus
                InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
              // onKeyDown={handleSubmitOnKeyDownEnter}
              />
            )}
          />
        )}
      />
      <Controller
        name='symbol'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.symbol}
              helperText={errors?.symbol?.message}
              label='Symbol'
              id='symbol'
              required
              variant='outlined'
              InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name='symbol_value'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.symbol_value}
              helperText={errors?.symbol_value?.message}
              label='Symbol value'
              id='symbol_value'
              required
              variant='outlined'
              InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name='formal_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.formal_name}
              helperText={errors?.formal_name?.message}
              label='Formal Name'
              id='formal_name'
              required
              variant='outlined'
              InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name='decimal_places'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.decimal_places}
              helperText={errors?.decimal_places?.message}
              label='No of Decimal Places'
              id='formal_name'
              required
              variant='outlined'
              InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            />
          );
        }}
      />

      {/* <Controller
				name="city"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? citys.find(data => data.id === value) : null}
						options={citys}
						getOptionLabel={option => `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select City"
								label="City"
								error={!!errors.city}
								required
								helperText={errors?.city?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }} 
								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/> */}
    </div>
  );
}

export default UnitForm;
