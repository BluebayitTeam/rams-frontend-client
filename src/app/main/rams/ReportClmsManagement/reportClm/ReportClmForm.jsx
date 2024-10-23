import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function ReportClmForm(props) {
  const { control, setValue, getValues, reset } = useFormContext();
  const [editingIndex, setEditingIndex] = useState(null); // State to track editing index
  const [reportClmValue, setReportClmValue] = useState(false);

  console.log(`jsabdfjka`, props?.reportClms);
  useEffect(() => {
    // Reset form values with the provided props
    reset({ ...getValues(), items: props?.reportClms });

    if (!reportClmValue) {
      props?.reportClms.forEach((reportClm) => {
        setValue(`reportClms.${reportClm?.id}.isChecked`, reportClm.isChecked);
        setValue(
          `reportClms.${reportClm?.id}.serial`,
          reportClm.isChecked ? reportClm.serial : ''
        );
        setValue(`reportClms.${reportClm?.id}.key`, reportClm.key);
        setValue(
          `reportClms.${reportClm?.id}.column_name`,
          reportClm.column_name
        );
      });
      setReportClmValue(true);
    }
  }, [props?.reportClms, setValue, getValues, reset, reportClmValue]);

  // Handle key press to save value and exit edit mode
  const handleEnterPress = (e, clmId) => {
    if (e.key === 'Enter') {
      const newValue = e.target.value;
      setValue(`reportClms.${clmId}.column_name`, newValue); // Set the new value in the form state
      setEditingIndex(null); // Exit edit mode
    }
  };

  // Handle checkbox change to clear serial if unchecked
  const handleCheckboxChange = (checked, clmId) => {
    setValue(`reportClms.${clmId}.isChecked`, checked);
    if (!checked) {
      setValue(`reportClms.${clmId}.serial`, ''); // Clear serial if unchecked
    }
  };

  return (
    <div className='grid grid-cols-3 grid-flow-row gap-1'>
      {props?.reportClms?.map((clm, index) => (
        <div
          key={index}
          style={{ flex: '1 0 30%', display: 'flex', alignItems: 'center' }}>
          <Controller
            name={`reportClms.${clm.id}.serial`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                className='w-48 mx-5'
                size='small'
                margin='normal'
                InputLabelProps={{ shrink: true }}
                disabled={!getValues(`reportClms.${clm.id}.isChecked`)} // Disable if unchecked
              />
            )}
          />
          <FormControlLabel
            control={
              <Controller
                name={`reportClms.${clm.id}.isChecked`}
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
          {editingIndex === index ? (
            <Controller
              name={`reportClms.${clm.id}.column_name`}
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
              {getValues(`reportClms.${clm.id}.column_name`)}{' '}
              {/* Show updated value */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReportClmForm;
