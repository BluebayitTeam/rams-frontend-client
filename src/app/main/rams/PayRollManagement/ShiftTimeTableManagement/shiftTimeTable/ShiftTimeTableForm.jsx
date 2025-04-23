import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputColor from 'react-input-color';
import CustomCheckbox from 'src/app/@components/CustomCheckbox';
import CustomTextField from 'src/app/@components/CustomTextField';

function ShiftTimeTableForm(props) {
  const methods = useFormContext();
  const [colorValue, setColorValue] = useState("");
  const { setValue, watch, getValues } = methods;

  useEffect(() => {
    if (getValues('color')?.startsWith('#') && colorValue === "") {
      setColorValue(getValues('color'));
    }
  }, [getValues()?.color]);


  return (
    <div className='overflow-y-auto'>
      <CustomTextField name='name' label='Name' required />
      <div className='grid grid-cols-6 gap-y-0 gap-x-10 items-center'>
        <CustomTextField
          name='onduty_time'
          label='Onduty Time'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='offduty_time'
          label='Offduty Time'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='checkin_start'
          label='Check-in Start'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='checkin_end'
          label='Check-in End'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='checkout_start'
          label='Checkout Start'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='checkout_end'
          label='Checkout End'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='lunch_time_start'
          label='Lunch Time Start'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='lunch_time_end'
          label='Lunch Time End'
          required
          inputProps={{ maxLength: 6 }}
        />
        <CustomTextField
          name='late_time'
          label='Late Time'
          required
          type='number'
        />
        <CustomTextField
          name='leave_early_time'
          label='Leave Early Time'
          required
          type='number'
        />
        <CustomTextField
          name='count_as_workday'
          label='Count as Workday'
          required
          type='number'
        />
        <CustomTextField
          name='count_as_minute'
          label='Count as Minute'
          required
          type='number'
        />
        <CustomCheckbox name='must_checkin' label='Must Checkin' />
        <CustomCheckbox name='must_checkout' label='Must Checkout' />
        <div className='col-span-2'>
          <div className='flex items-center justify-between gap-5'>
            <CustomTextField name='color' label='Color Code' required />
            <div>
              <InputColor
                initialValue={colorValue}
                onChange={(color) => setValue('color', color.hex)}
                placement='top'
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            </div>
            <div
              className='rounded m-auto'
              style={{
                height: '50px',
                width: '50px',
                // marginLeft: "10px",
                // marginTop: "10px",
                backgroundColor: watch('color') || 'white',
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShiftTimeTableForm;
