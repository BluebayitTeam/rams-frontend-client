import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function ReportClmForm(props) {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useFormContext();
  const [reportClmValue, setReportClmValue] = useState(false);
  console.log('propsShuva', props);
  useEffect(() => {
    reset({ ...getValues(), items: props?.reportClms });

    if (!reportClmValue) {
      // Set default values when reportClms prop change
      props?.reportClms.forEach((reportClm) => {
        setValue(`reportClms.${reportClm?.id}.isChecked`, reportClm.isChecked);
        setValue(
          `reportClms.${reportClm?.id}.serial`,
          reportClm.isChecked ? reportClm.serial : null
        );
        setValue(`reportClms.${reportClm?.id}.key`, reportClm.key);
        // console.log('setValue', setValue);
      });
      setReportClmValue(true);
    }
  }, [props?.reportClms, setValue, getValues(), reportClmValue]);
  return (
    <div className='grid grid-cols-3 grid-flow-row gap-1'>
      {props?.reportClms?.map((clm) => (
        <div key={clm.id} style={{ flex: '1 0 30%', display: 'flex' }}>
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
                    checked={field.value ? field.value : false}
                  />
                )}
              />
            }
            label={clm.label}
          />
        </div>
      ))}
    </div>
  );
}

export default ReportClmForm;
