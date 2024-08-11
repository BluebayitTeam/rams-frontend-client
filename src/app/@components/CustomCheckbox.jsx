import { useFormContext, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CustomCheckbox({ name, label, ...props }) {
	const { control } = useFormContext(); // Automatically get control from form context

	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<FormControl>
						<FormControlLabel
							label={label}
							control={
								<Checkbox
									{...props}
									inputRef={ref}
									onChange={(event) => onChange(event.target.checked)}
									onBlur={onBlur}
									checked={!!value} // Ensure value is treated as a boolean
								/>
							}
						/>
					</FormControl>
				)}
			/>
		</div>
	);
}

export default CustomCheckbox;
