import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router';

function PassengerSummaryUpdateClmForm(props) {
  const { control, setValue, getValues, reset } = useFormContext();
  const [editingIndex, setEditingIndex] = useState(null); // State to track editing index
  const [passengerSummaryUpdateClmValue, setPassengerSummaryUpdateClmValue] = useState(false);
  const routeParams = useParams();
  const { passengerSummaryUpdateClmId } = routeParams;
  useEffect(() => {
    // Reset form values with the provided props
    reset({ ...getValues(), items: props?.passengerSummaryUpdateClms });

    if (!passengerSummaryUpdateClmValue) {
      props?.passengerSummaryUpdateClms.forEach((passengerSummaryUpdateClm) => {
        setValue(`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.isChecked`, passengerSummaryUpdateClm.isChecked);
        setValue(
          `passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.serial`,
          passengerSummaryUpdateClm.isChecked ? passengerSummaryUpdateClm.serial : ''
        );
        setValue(`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.key`, passengerSummaryUpdateClm.key);
        setValue(
          `passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.column_name`,
          passengerSummaryUpdateClm.column_name
        );
      });
      setPassengerSummaryUpdateClmValue(true);
    }
  }, [props?.passengerSummaryUpdateClms, setValue, getValues, reset, passengerSummaryUpdateClmValue]);
  useEffect(() => {
    // Execute only on the first render
    if (!passengerSummaryUpdateClmValue && props?.passengerSummaryUpdateClms) {
      // Get initial values
      const initialValues = { ...getValues(), items: props?.passengerSummaryUpdateClms };

      // Set form values from props
      props?.passengerSummaryUpdateClms.forEach((passengerSummaryUpdateClm) => {
        initialValues[`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.isChecked`] =
          passengerSummaryUpdateClm.isChecked;
        initialValues[`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.serial`] =
          passengerSummaryUpdateClm.isChecked ? passengerSummaryUpdateClm.serial : '';
        initialValues[`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.key`] = passengerSummaryUpdateClm.key;
        initialValues[`passengerSummaryUpdateClms.${passengerSummaryUpdateClm?.id}.column_name`] =
          passengerSummaryUpdateClm.column_name;
      });

      // Reset form values once
      reset(initialValues);
      setPassengerSummaryUpdateClmValue(true); // Set flag to prevent re-initialization
    }
  }, [getValues()]);

  // Handle key press to save value and exit edit mode
  const handleEnterPress = (e, clmId) => {
    if (e.key === 'Enter') {
      const newValue = e.target.value;
      setValue(`passengerSummaryUpdateClms.${clmId}.column_name`, newValue); // Set the new value in the form state
      setEditingIndex(null); // Exit edit mode
    }
  };

  // Handle checkbox change to clear serial if unchecked
  const handleCheckboxChange = (checked, clmId) => {
    setValue(`passengerSummaryUpdateClms.${clmId}.isChecked`, checked);
    if (!checked) {
      setValue(`passengerSummaryUpdateClms.${clmId}.serial`, ''); // Clear serial if unchecked
    }
  };

  return (
    <div className='grid grid-cols-2 grid-flow-row gap-1'>
      {props?.passengerSummaryUpdateClms?.map((clm, index) => (
        <div
          key={index}
          style={{ flex: '1 0 30%', display: 'flex', alignItems: 'center' }}>
          <Controller
            name={`passengerSummaryUpdateClms.${clm.id}.serial`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                className='w-48 mx-5'
                size='small'
                margin='normal'
                InputLabelProps={{ shrink: true }}
                disabled={!getValues(`passengerSummaryUpdateClms.${clm.id}.isChecked`)} // Disable if unchecked
              />
            )}
          />
          <FormControlLabel
            control={
              <Controller
                name={`passengerSummaryUpdateClms.${clm.id}.isChecked`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, clm.id)
                    }
                  />
                )}
              />
            }
            label={`${clm.table_name}`}
          />
          <Controller
            name={`passengerSummaryUpdateClms.${clm.id}.key`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                size='small'
                style={{ display: 'none' }}
                margin='normal'
                InputLabelProps={{ shrink: true }}
                autoFocus // Autofocus when editing starts
              />
            )}
          />
          {editingIndex === index ? (
            <Controller
              name={`passengerSummaryUpdateClms.${clm.id}.column_name`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant='outlined'
                  size='small'
                  margin='normal'
                  onBlur={() => setEditingIndex(null)} // Exit editing on blur
                  onKeyDown={(e) => handleEnterPress(e, clm.id)} // Save value on Enter press
                  InputLabelProps={{ shrink: true }}
                  autoFocus // Autofocus when editing starts
                />
              )}
            />
          ) : (
            <div
              className='cursor-pointer'
              onClick={() => setEditingIndex(index)}>
              {getValues(`passengerSummaryUpdateClms.${clm.id}.column_name`)}{' '}
              {/* Show updated value */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PassengerSummaryUpdateClmForm;
