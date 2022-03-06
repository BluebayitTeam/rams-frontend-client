import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { PictureAsPdf } from '@material-ui/icons';
import { BASE_URL } from 'app/constant/constants';
import clsx from 'clsx';
import React, { useState } from 'react';
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

function Image({ name, label }) {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, watch } = methods;
	const file = watch(`${name}`) || '';

	const [previewFile, setPreviewFile] = useState('');
	const [fileExtName, setFileExtName] = useState('');

	// console.log('file', file);
	// console.log('previewFile', previewFile);

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

										setFileExtName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

										console.log({ reader, file });
										onChange(file);
									}}
								/>
								<Icon fontSize="large" color="action">
									cloud_upload
								</Icon>
							</label>
						</div>
						{!previewFile && file && (
							<div style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}>
								{(file?.name || file)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
									<PictureAsPdf
										style={{
											color: 'red',
											cursor: 'pointer',
											display: 'block',
											fontSize: '35px',
											margin: 'auto'
										}}
										onClick={() => window.open(`${BASE_URL}${file}`)}
									/>
								) : (
									<img src={`${BASE_URL}${file}`} style={{ height: '150px' }} />
								)}
							</div>
						)}

						{previewFile && (
							<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
								{fileExtName === 'pdf' ? (
									<iframe
										src={previewFile}
										frameBorder="0"
										scrolling="auto"
										height="150px"
										width="150px"
									/>
								) : (
									<img src={previewFile} style={{ height: '150px' }} />
								)}
							</div>
						)}
					</div>
				)}
			/>
		</>
	);
}

export default Image;
