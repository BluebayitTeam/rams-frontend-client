import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext } from 'react-hook-form';

function CustomDatePicker(props) {
	console.log('propssdasd', props);

	const methods = useFormContext();
	const { formState } = methods;
	const { errors } = formState;

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DatePicker']}>
				<DatePicker
					{...props.field}
					{...props}
					className={props?.className || 'mt-8 mb-16 w-full'}
					autoOk
					required={!!props.required}
					variant="inline"
					inputVariant="outlined"
					format={props?.format || 'dd/MM/yyyy'}
					placeholder={props?.placeholder || 'dd/MM/yyyy'}
					value={props.value || props.field.value || null}
					error={!!errors[props.field.name] || props.required ? !(props.value || props.field.value) : false}
					helperText={errors[props.field.name]?.message || ''}
					onChange={(value) => {
						console.log('valuevaluevalue', `abc${value}def`);

						props.field.onChange(value); // Ensure the value is in YYYY-MM-DD format
						props?.onChange && props?.onChange(value);
					}}
					InputAdornmentProps={{ position: 'start' }}
					InputLabelProps={props.field.value ? { shrink: true } : { style: { color: 'red' } }}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}

export default CustomDatePicker;
