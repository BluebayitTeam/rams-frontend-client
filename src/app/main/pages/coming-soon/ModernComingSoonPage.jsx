import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FuseCountdown from '@fuse/core/FuseCountdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email')
});
const defaultValues = {
	email: ''
};

/**
 * The modern coming soon page.
 */
function ModernComingSoonPage() {
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
				<div className="w-full px-16 py-32 ltr:border-r-1 rtl:border-l-1 sm:w-auto sm:p-48 md:p-64">
					<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
						<img
							className="w-48"
							src="assets/images/logo/bbit.png"
							alt="logo"
						/>

						<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
							Almost there!
						</Typography>
						<Typography className="mt-2">
							Do you want to be notified when we are ready? Register below so we can notify you about the
							launch!
						</Typography>

						<div className="flex flex-col items-center py-48">
							<FuseCountdown endDate="2071-07-28" />
						</div>

						<form
							name="comingSoonForm"
							noValidate
							className="flex w-full flex-col justify-center"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Email address"
										type="email"
										error={!!errors.email}
										helperText={errors?.email?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Button
								variant="contained"
								color="secondary"
								className=" mt-4 w-full"
								aria-label="Register"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								size="large"
							>
								Notify me when you launch
							</Button>

							<Typography
								className="mt-32 text-md font-medium"
								color="text.secondary"
							>
								This isn't a newsletter subscription. We will send one email to you when we launch and
								then you will be removed from the list.
							</Typography>
						</form>
					</div>
				</div>

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
			</Paper>
		</div>
	);
}

export default ModernComingSoonPage;
