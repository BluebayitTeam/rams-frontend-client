import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputColor from 'react-input-color';
import { useDispatch } from 'react-redux';

function CurrentStatusForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;
	const [color, setColor] = useState({});

	useEffect(() => {
		setValue(`color_code`, color.hex);
	}, [color.hex]);

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message}
					/>
				)}
			/>

			<Controller
				name="color_code"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							// value={color?.hex}
							className="mt-8 mb-16"
							helperText={errors?.name?.message}
							label="Color Code"
							id="color_code"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<div className="flex">
				<h4 style={{ marginRight: '15px' }}>Status Color:</h4>
				<InputColor
					//  id="color_code_hex"
					initialValue=" "
					onChange={setColor}
					placement="right"
				/>
				<div />
			</div>
		</div>
	);
}

export default CurrentStatusForm;
