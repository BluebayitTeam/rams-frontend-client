import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { BASE_URL } from '../constant/constants';

const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function Image({ name, label, previewImage, setPreviewImage }) {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, watch } = methods;
	const picture = watch(`${name}`) || '';

	return (
		<Controller
			name={`${name}`}
			control={control}
			render={({ field: { onChange, value } }) => (
				<div className="flex w-full flex-row items-center justify-evenly">
					<div className="flex-col">
						{label && <Typography className="text-center">{label}</Typography>}
						<label
							htmlFor={`${name}-button-file`}
							className={clsx(
								classes.productImageUpload,
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="image/*"
								className="hidden"
								id={`${name}-button-file`}
								type="file"
								onChange={async (e) => {
									const reader = new FileReader();
									reader.onload = () => {
										if (reader.readyState === 2) {
											setPreviewImage(reader.result);
										}
									};
									reader.readAsDataURL(e.target.files[0]);

									const file = e.target.files[0];
									onChange(file);
								}}
							/>
							<Icon
								fontSize="large"
								color="action"
							>
								cloud_upload
							</Icon>
						</label>
					</div>
					{picture && !previewImage && (
						<div style={{ width: '100px', height: '100px' }}>
							<img src={`${BASE_URL}${picture}`} />
						</div>
					)}

					{previewImage && (
						<div style={{ width: '100px', height: '100px' }}>
							<img
								src={previewImage}
								alt="no image found"
							/>
						</div>
					)}
				</div>
			)}
		/>
	);
}

export default Image;
