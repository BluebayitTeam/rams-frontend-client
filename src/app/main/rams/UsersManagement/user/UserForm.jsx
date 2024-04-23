import { Icon, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function UserForm(props) {
	console.log('userId', props?.userId);

	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const [showPassword, setShowPassword] = useState(false);
	const getCountryCode1 = watch('country_code1');
	const getCountryCode2 = watch('country_code2');
	return (
		<div>
			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Password"
						type="password"
						helperText={errors?.password?.message}
						variant="outlined"
						fullWidth
						InputProps={{
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon
											className="text-20"
											color="action"
										>
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
					/>
				)}
			/>
			<Controller
				name="confirm_password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Confirm Password"
						type="password"
						// error={!!errors.confirmPassword || !field.value}
						helperText={errors?.confirmPassword?.message}
						variant="outlined"
						fullWidth
						InputProps={{
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon
											className="text-20"
											color="action"
										>
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
					/>
				)}
			/>
		</div>
	);
}

export default UserForm;
