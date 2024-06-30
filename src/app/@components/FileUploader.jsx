/* eslint-disable no-undef */
import { Controller } from 'react-hook-form';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import clsx from 'clsx';
import { PictureAsPdf } from '@mui/icons-material';

const allowedFileTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export default function FileUpload({ control, setFile, setValue, file, name, BASE_URL, classes, label }) {
	const isImage =
		(file && typeof file !== 'string' && file.type.startsWith('image/')) ||
		(typeof file === 'string' &&
			(file.endsWith('.png') ||
				file.endsWith('.jpeg') ||
				file.endsWith('.jpg') ||
				file.endsWith('.gif') ||
				file.endsWith('.webp') ||
				file.endsWith('.GIF') ||
				file.endsWith('.PNG') ||
				file.endsWith('.JPG') ||
				file.endsWith('.Webp') ||
				file.endsWith('.JPEG')));
	const isPdf =
		(file && file.type === 'application/pdf') || (typeof file === 'string' && file && file.endsWith('.pdf'));

	const isDoc =
		(file && (file.name?.endsWith('.doc') || file.name?.endsWith('.docx'))) ||
		(typeof file === 'string' && file.endsWith('.doc')) ||
		(typeof file === 'string' && file.endsWith('.docx'));

	const handleFileRemove = () => {
		setValue(name, null);
		setFile(null);
		document.getElementById('file-button').value = ''; // Reset file input
	};

	return (
		<div className="text-center">
			<Typography className="h3 text-center mb-9 font-bold text-blue">{label}</Typography>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange } }) => (
					<Box className="flex w-full items-center justify-center ml-16">
						<label
							htmlFor="file-button"
							className={clsx(
								classes.fileUpload,
								'flex items-center justify-center w-128 h-128 mx-12 mb-24 cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								className="hidden"
								id="file-button"
								type="file"
								onChange={(e) => {
									const selectedFile = e.target.files[0];

									if (selectedFile) {
										onChange(selectedFile);
										setFile(selectedFile); // Update the file state with the selected file object
									}
								}}
							/>
							<Icon
								fontSize="large"
								color="action"
							>
								cloud_upload
							</Icon>
						</label>
						{file && (
							<Box sx={{ position: 'relative', width: 'fit-content' }}>
								<HighlightOffIcon
									sx={{
										position: 'absolute',
										top: 0,
										right: 0,
										color: 'red',
										cursor: 'pointer',
										backgroundColor: 'white',
										width: 20,
										height: 20,
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
									onClick={handleFileRemove}
								/>
								{isImage &&
									typeof file === 'string' && ( // Check if file is a URL string
										<img
											src={file}
											alt="preview"
											style={{ height: '100px', marginTop: '10px' }}
										/>
									)}
								{isImage &&
									file?.name &&
									typeof file !== 'string' && ( // Check if file is a file object
										<img
											src={URL.createObjectURL(file)}
											alt="preview"
											style={{ height: '100px', marginTop: '10px' }}
										/>
									)}

								{isPdf && file?.name && typeof file !== 'string' && (
									<embed
										src={URL.createObjectURL(file)}
										type="application/pdf"
										width="100px"
										height="130px"
									/>
								)}
								{isPdf && typeof file === 'string' && (
									<PictureAsPdf
										style={{
											color: 'red',
											cursor: 'pointer',
											display: 'block',
											fontSize: '65px'
										}}
										onClick={() => window.open(`${file}`)}
									/>
								)}
								{isDoc && (
									<DescriptionIcon
										fontSize="large"
										color="primary"
										sx={{
											width: '150px',
											height: '70px',
											cursor: 'pointer'
										}}
										onClick={() => window.open(`${file}`)}
									/>
								)}
							</Box>
						)}

						{!file && (
							<Box
								height={180}
								width={180}
								display="flex"
								alignItems="center"
								p={2}
								sx={{ width: '150px', height: '70px', border: '1px solid red' }}
								className={clsx(
									classes.fileUpload,
									'flex items-center justify-center rounded w-128 h-128 mx-12 mb-24 cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<Typography className="text-sm font-700">
									<span className="mr-4 text-xs text-red-500">
										Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
									</span>
								</Typography>
							</Box>
						)}
					</Box>
				)}
			/>
		</div>
	);
}
