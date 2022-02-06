import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function Image({ name, label, previewFile, setPreviewFile }) {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, watch } = methods;
	const file = watch(`${name}`) || '';

	console.log('file', file);
	console.log('previewFile', previewFile);

	return (
		<>
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
									accept="image/x-png,image/gif,image/jpeg,application/pdf"
									className="hidden"
									id={`${name}-button-file`}
									type="file"
									onChange={async e => {
										const reader = new FileReader();
										reader.onload = () => {
											if (reader.readyState === 2) {
												setPreviewFile(reader.result);
											}
										};
										reader.readAsDataURL(e.target.files[0]);

										const file = e.target.files[0];

										console.log({ reader, file });
										onChange(file);
									}}
								/>
								<Icon fontSize="large" color="action">
									cloud_upload
								</Icon>
							</label>
						</div>
						{/* {!previewFile && file && (file?.name || file)?.match(/.(jpg|jpeg|png|gif)$/i) ? (
							<div style={{ width: '100px', height: '100px' }}>
								<img src={`${BASE_URL}${file}`} />
							</div>
						) : (
							''
						)} */}

						{previewFile && (
							<div style={{ width: '100px', height: '100px' }}>
								{/* <img src={previewFile} /> */}
								{/* <button
									onClick={() => {
										window.open(previewFile);
									}}
								>
									show in new tab
								</button> */}
								<embed src={previewFile} width="100px" height="100px" />
								{/* <iframe
									src={previewFile}
									frameBorder="0"
									scrolling="auto"
									height="100px"
									width="auto"
								></iframe> */}
							</div>
						)}
					</div>
				)}
			/>
		</>
	);
}

export default Image;
