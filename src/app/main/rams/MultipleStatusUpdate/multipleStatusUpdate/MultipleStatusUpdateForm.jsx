/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import {
  Autocomplete,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import { GET_PASSENGER_BY_PASSENGER_STATUS } from 'src/app/constant/constants';
import MultiplePassengersTable from './MultiplePassengersTable';

function MultipleStatusUpdateForm() {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, setValue, watch, getValues } = methods;
  console.log('tesgfsfgs', getValues());
  const { errors } = formState;
  const passengers = useSelector((state) => state.data.passengers);
  const [mltPassengerList, setMltPassengerList] = useState([]);
  const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
  const [selectedValue, setSelectedValue] = useState('current_status');
const [passengerStatus,setPassengerStatus]=useState([])
  const currentStatuss = useSelector((state) => state.data.currentStatuss);

  const handleChangeCurrentStatus = (event) => {
    setSelectedValue(event.target.value);
  };
  sessionStorage.setItem(
    'MultipleStatusUpdateFormselectedValue',
    selectedValue
  );

  useEffect(() => {
    if (mltPassengerDeletedId) {
      setMltPassengerList(
        mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId)
      );
      setMltPassengerDeletedId(null);
    }
  }, [mltPassengerDeletedId]);

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getCurrentStatuss());
  }, []);

  useEffect(() => {
    setValue(
      'passengers',
      mltPassengerList?.map((data) => data.id)
    );
  }, [mltPassengerList, setValue]);

  const handlePassengerSelect = (newPassenger) => {
    if (newPassenger) {
      if (
        !mltPassengerList.some((passenger) => passenger.id === newPassenger.id)
      ) {
        setMltPassengerList([...mltPassengerList, newPassenger]);
      }
    }
  };

  useEffect(() => {
    if (mltPassengerList?.length > 0 && watch('passenger')) {
      setValue('is_form_save', true);
    } else {
      setValue('is_form_save', false);
    }
  }, [mltPassengerList, watch('passenger')]);

  useEffect(() => {
    setValue('selected_status', null);
  }, [setValue]);

 

const handleFilterPassenger = (status_value) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_PASSENGER_BY_PASSENGER_STATUS}?status_value=${status_value}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setFilterPassengers(data?.passengers);
			
			})
			.catch(() => {});
	};

useEffect(() => {
		const selectedStatus = getValues('selected_status');

		if (selectedStatus) {
			handleFilterPassenger(selectedStatus);
			setPassengerStatus('passengers');
		}
	}, [getValues('selected_status'), passengerStatus]);

  return (
    <div>
      <div>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              field={field}
              label="Date"
              required
              className="mt-8 mb-16 w-full"
              error={!!errors.date}
              helperText={errors?.date?.message}
              placeholder="DD-MM-YYYY"
            />
          )}
        />
      </div>
      <Controller
        name="current_status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full"
            freeSolo
            value={
              value ? currentStatuss.find((data) => data.id === value) : null
            }
            options={currentStatuss}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Current Status"
                label="Current Status"
                error={
                  !!errors.current_status ||
                  (selectedValue === 'current_status' && !value)
                }
                helperText={errors?.current_status?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      {/* Radio Button work start here */}

		  <Controller
				name="selected_status"
				control={control}
				className="my-10"
				render={({ field }) => (
					<RadioGroup
						value={field.value}
						style={{ flexDirection: 'row' }}
						id="selected_status"
						onChange={(e) => {
							field.onChange(e.target.value);
              field.onChange(e.target.value);
              setMltPassengerList([]);
							setFilterPassengers([]);
							setValue('passenger', '');
              setValue('medical_result', null);
              setValue('stamping_status', null);
              setValue('training_card_status', null);
              setValue('man_power_status', null);
              setValue('police_clearance_status', null);
              setValue('driving_license_status', null);
              setValue('finger_status', null);
						}}
					>
						<FormLabel
							disabled
							style={{ marginRight: '1rem', marginTop: '1.5rem' }}
						>
							Select Status
						</FormLabel>
						
						
            
            <FormControlLabel
							value="medical_result"
							control={<Radio />}
							label="Medical"
						/>

						
            
             <FormControlLabel
							value="stamping_status"
							control={<Radio />}
							label="Visa"
						/>
						
            <FormControlLabel
              value="training_card_status"
              control={<Radio />}
              label="Training"
            />
            <FormControlLabel
              value="man_power_status"
              control={<Radio />}
              label="Manpower"
            />
            <FormControlLabel
              value="police_clearance_status"
              control={<Radio />}
              label="Police Clearance "
            />
            
            
            
						<FormControlLabel
							value="driving_license_status"
							control={<Radio />}
							label="Driving License"
						/>
						<FormControlLabel
							value="finger_status"
							control={<Radio />}
							label="Finger"
						/>
					</RadioGroup>
				)}
			/>
     
     
		  {watch('selected_status') === 'medical_result' && (
				<div>
					 <Controller
          name="medical_result"
          control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                className="mt-8 mb-16 w-11/12	"
                freeSolo
                value={
                  value
                    ? medicalResults.find((data) => data.id === value)
                    : null
                }
                options={medicalResults}
                getOptionLabel={(option) => `${option.name}`}
                onChange={(event, newValue) => {
                  onChange(newValue?.id);
                  setValue('selected_value', newValue?.id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Medical Status"
                    label="Medical Status"
                    error={
                      !!errors.current_status ||
                      (selectedValue === 'medical_result' && !value)
                    }
                    helperText={errors?.current_status?.message}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
        </div>
      )}

      {watch('selected_status') === 'stamping_status' && (
        <Controller
          name="stamping_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Visa Status"
                  label="Visa Status"
                  error={
                    !!errors.stamping_status ||
                    (selectedValue === 'stamping_status' && !value)
                  }
                  helperText={errors?.stamping_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {watch('selected_status') === 'training_card_status' && (
        <Controller
          name="training_card_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12	"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Training Status"
                  label="Training Status"
                  error={
                    !!errors.training_card_status ||
                    (selectedValue === 'training_card_status' && !value)
                  }
                  helperText={errors?.training_card_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {watch('selected_status') === 'man_power_status' && (
        <Controller
          name="man_power_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12	"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Manpower Status"
                  label="Manpower Status"
                  error={
                    !!errors.man_power_status ||
                    (selectedValue === 'man_power_status' && !value)
                  }
                  helperText={errors?.man_power_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {watch('selected_status') === 'police_clearance_status' && (
        <Controller
          name="police_clearance_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12	"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Police Clearance Status"
                  label="Police Clearance Status"
                  error={
                    !!errors.police_clearance_status ||
                    (selectedValue === 'police_clearance_status' && !value)
                  }
                  helperText={errors?.police_clearance_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {watch('selected_status') === 'driving_license_status' && (
        <Controller
          name="driving_license_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12	"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Driving License Status"
                  label="Driving License Status"
                  error={
                    !!errors.driving_license_status ||
                    (selectedValue === 'driving_license_status' && !value)
                  }
                  helperText={errors?.driving_license_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {watch('selected_status') === 'finger_status' && (
        <Controller
          name="finger_status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-11/12	"
              freeSolo
              value={
                value ? doneNotDone.find((data) => data.id === value) : null
              }
              options={doneNotDone}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('selected_value', newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Finger Status"
                  label="Finger Status"
                  error={
                    !!errors.finger_status ||
                    (selectedValue === 'finger_status' && !value)
                  }
                  helperText={errors?.finger_status?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      <Controller
        name="passenger"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full "
            freeSolo
            value={value ? passengers.find((data) => data.id === value) : null}
            options={passengers}
            getOptionLabel={(option) =>
              `${option.passenger_name} ${option.passenger_id}   ${option.passport_no}  ${option.post_office}`
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              handlePassengerSelect(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Passenger"
                label="Passenger"
                error={!value}
                helperText={errors?.passengers?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      {mltPassengerList?.length > 0 && (
        <div>
          <MultiplePassengersTable
            passengers={mltPassengerList}
            setMltPassengerList={setMltPassengerList}
          />
        </div>
      )}
    </div>
  );
}

export default MultipleStatusUpdateForm;
