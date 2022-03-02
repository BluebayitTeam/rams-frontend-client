import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { USERS_PASSWORDCHANGE } from '../../../../constant/constants';

//validation
const schema = yup.object().shape({
	password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	confirm_password: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});

const ForgotPassword = () => {
	const routeParams = useParams();
	const { userId } = routeParams;
	const history = useHistory();
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const onSubmit = async Passwords => {
		console.log(Passwords);
		const userPassword = localStorage.getItem('userPassword');
		console.log(userPassword);
		const newdata = {
			password: Passwords.password,
			confirm_password: Passwords.confirm_password
		};
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const response = axios.patch(`${USERS_PASSWORDCHANGE}${userId}`, newdata, authTOKEN);
		console.log(response);
		if (response) {
			localStorage.setItem('userAlertPermission', 'updatePasswordSuccessfully');
			history.push('/apps/users-management/userslist');
		}
		const data = await response.data;
		console.log(data);
	};

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			content={
				<Box className="p-16 sm:p-24 max-w-2xl">
					<Box className="mb-16">
						<Typography variant="h5">Change User Password</Typography>
					</Box>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-16"
									label="New Password"
									type="password"
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										className: 'pr-2',
										type: showNewPassword ? 'text' : 'password',
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
													<Icon className="text-20" color="action">
														{showNewPassword ? 'visibility' : 'visibility_off'}
													</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
									required
									InputLabelProps={{ shrink: true }}
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
									error={!!errors.confirm_password}
									helperText={errors?.confirm_password?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										className: 'pr-2',
										type: showConfirmPassword ? 'text' : 'password',
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												>
													<Icon className="text-20" color="action">
														{showConfirmPassword ? 'visibility' : 'visibility_off'}
													</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
									required
									InputLabelProps={{ shrink: true }}
								/>
							)}
						/>
						<input
							type="submit"
							style={{
								height: '50px',
								width: '100px',
								backgroundColor: 'green',
								color: 'white',
								borderRadius: '5%',
								cursor: 'pointer'
							}}
						/>
					</form>
				</Box>
			}
		/>
	);
};

export default ForgotPassword;
