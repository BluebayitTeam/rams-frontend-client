import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
/**
 * Form Validation Schema
 */
const schema = z
	.object({
		name: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});
const defaultValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

/**
 * The modern reversed sign up page.
 */
function ModernReversedSignUpPage() {
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	function onSubmit() {
		reset(defaultValues);
	}

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
			<Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
				<Box
					className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
					sx={{ backgroundColor: 'primary.main' }}
				>
					<svg
						className="pointer-events-none absolute inset-0"
						viewBox="0 0 960 540"
						width="100%"
						height="100%"
						preserveAspectRatio="xMidYMax slice"
						xmlns="http://www.w3.org/2000/svg"
					>
						<Box
							component="g"
							sx={{ color: 'primary.light' }}
							className="opacity-20"
							fill="none"
							stroke="currentColor"
							strokeWidth="100"
						>
							<circle
								r="234"
								cx="196"
								cy="23"
							/>
							<circle
								r="234"
								cx="790"
								cy="491"
							/>
						</Box>
					</svg>
					<Box
						component="svg"
						className="absolute -right-64 -top-64 opacity-20"
						sx={{ color: 'primary.light' }}
						viewBox="0 0 220 192"
						width="220px"
						height="192px"
						fill="none"
					>
						<defs>
							<pattern
								id="837c3e70-6c3a-44e6-8854-cc48c737b659"
								x="0"
								y="0"
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<rect
									x="0"
									y="0"
									width="4"
									height="4"
									fill="currentColor"
								/>
							</pattern>
						</defs>
						<rect
							width="220"
							height="192"
							fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
						/>
					</Box>

					<div className="relative z-10 w-full max-w-2xl">
						<div className="text-7xl font-bold leading-none text-gray-100">
							<div>Welcome to</div>
							<div>our community</div>
						</div>
						<div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
							Fuse helps developers to build organized and well coded dashboards full of beautiful and
							rich modules. Join us and start building your application today.
						</div>
						<div className="mt-32 flex items-center">
							<AvatarGroup
								sx={{
									'& .MuiAvatar-root': {
										borderColor: 'primary.main'
									}
								}}
							>
								<Avatar src="assets/images/avatars/female-18.jpg" />
								<Avatar src="assets/images/avatars/female-11.jpg" />
								<Avatar src="assets/images/avatars/male-09.jpg" />
								<Avatar src="assets/images/avatars/male-16.jpg" />
							</AvatarGroup>

							<div className="ml-16 font-medium tracking-tight text-gray-400">
								More than 17k people joined us, it's your turn
							</div>
						</div>
					</div>
				</Box>

				<div className="w-full px-16 py-32 ltr:border-l-1 rtl:border-r-1 sm:w-auto sm:p-48 md:p-64">
					<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
						<img
							className="w-48"
							src="assets/images/logo/bbit.png"
							alt="logo"
						/>

						<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
							Sign up
						</Typography>
						<div className="mt-2 flex items-baseline font-medium">
							<Typography>Already have an account?</Typography>
							<Link
								className="ml-4"
								to="/sign-in"
							>
								Sign in
							</Link>
						</div>

						<form
							name="registerForm"
							noValidate
							className="mt-32 flex w-full flex-col justify-center"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Name"
										autoFocus
										type="name"
										error={!!errors.name}
										helperText={errors?.name?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Email"
										type="email"
										error={!!errors.email}
										helperText={errors?.email?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Password"
										type="password"
										error={!!errors.password}
										helperText={errors?.password?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="passwordConfirm"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Password (Confirm)"
										type="password"
										error={!!errors.passwordConfirm}
										helperText={errors?.passwordConfirm?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="acceptTermsConditions"
								control={control}
								render={({ field }) => (
									<FormControl
										className="items-center"
										error={!!errors.acceptTermsConditions}
									>
										<FormControlLabel
											label="I agree to the Terms of Service and Privacy Policy"
											control={
												<Checkbox
													size="small"
													{...field}
												/>
											}
										/>
										<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
									</FormControl>
								)}
							/>

							<Button
								variant="contained"
								color="secondary"
								className=" mt-24 w-full"
								aria-label="Register"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								size="large"
							>
								Create your free account
							</Button>
						</form>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default ModernReversedSignUpPage;
