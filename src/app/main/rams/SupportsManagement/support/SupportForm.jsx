/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { allowedExtensions, ticketfileExtension } from 'src/app/@data/data';
import { useParams } from 'react-router';
import { useCreateSupportMutation, useGetSupportQuery } from '../SupportsApi';

const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	textField: {
		marginTop: '20px',
		marginBottom: '10px'
	},
	modal: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '15%',
		marginLeft: '35%',
		width: 320,
		height: 250,
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		backgroundColor: theme.palette.background.paper
	}
}));

function SupportForm(props) {
	const classes = useStyles();
	const { data, isLoading } = useGetSupportQuery();

	const [errorText, setErrorText] = useState('');
	const [supports, setSupports] = useState([]);
	const [createSupport] = useCreateSupportMutation();

	const getExtenstion = (url) => {
		const fileUrlStr = url;
		const extNameIndx = fileUrlStr.lastIndexOf('.');
		const extName = extNameIndx >= 0 ? fileUrlStr.slice(extNameIndx) : '';
		return extName;
	};

	const showFile = (fileUrl) => {
		setFile(fileUrl);
		const extStr = getExtenstion(fileUrl);
		const ticketImgExtensionArr = ['.jpg', '.jpeg', '.png'];
		const isImage = ticketImgExtensionArr.find((url) => url === extStr);

		if (isImage) {
			setOpen(true);
		} else {
			window.open(fileUrl);
		}
	};
	const dispatch = useDispatch();
	const methods = useFormContext();
	const routeParams = useParams();
	const { supportId } = routeParams;

	const { control, formState, watch, getValues, setValue } = methods;
	const [file, setFile] = useState();
	const [previewImage, setPreviewImage] = useState([]);
	const [images, setImages] = useState([]);
	const inputFileRef = useRef(null);
	const [_reRender, setReRender] = useState(0);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const { errors } = formState;
	useEffect(() => {
		setTimeout(() => {
			setErrorText('');
		}, 5000);
	}, [errorText]);

	const cancelAImage = (imgId) => {
		const newPreImgs = [...previewImage];
		newPreImgs.splice(imgId, 1);
		setPreviewImage(newPreImgs);
		const newImages = [...images];
		newImages.splice(imgId, 1);
		setImages(newImages);
		setReRender(Math.random());
	};

	const handlePostMessage = async (event) => {
		const invalidFiles = images.filter((file) => {
			const extension = file.name.split('.').pop();
			return !allowedExtensions.includes(`.${extension}`);
		});

		if (invalidFiles.length > 0) {
			setErrorText(`Invalid file(s): ${invalidFiles.map((file) => file.name).join(', ')}`);
			return;
		}

		const adminId = localStorage.getItem('id');
		const formData = getValues();
		const messageData = {
			message: formData.message,
			ticket: supportId,
			customer: adminId,
			file: images
		};

		dispatch(createSupport(messageData)).then(() => {
			setValue('message', '');

			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}

			setPreviewImage([]);
			setImages([]);
		});
		// getSupportMessage(supportId);
	};
	console.log(`adjkad`, props?.support?.ticket_details);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={classes.modal}>
					<img
						style={{
							width: '100%',
							height: '100%'
						}}
						className="w-full block"
						src={file}
						alt="Not found"
					/>
				</Box>
			</Modal>
			{props?.support?.ticket_details?.map((item, idx) => (
				<Box
					key={idx}
					style={{
						display: 'flex',
						marginBottom: '5px',
						paddingBottom: '5px',
						justifyContent: item?.customer ? 'flex-start ' : 'flex-end'
					}}
				>
					{item?.customer && (
						<>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<img
									style={{
										borderRadius: '50%',
										width: '50px',
										height: '50px',
										margin: '10px'
									}}
									className="w-full block rounded"
									src={`${
										item?.customer_image
											? `${BASE_URL}${item?.customer_image}`
											: item?.admin_image
												? `${BASE_URL}${item?.admin_image}`
												: '/profile.jpg'
									}`}
									alt="Notfound"
								/>
								<Typography
									variant="p"
									className="mt-8"
									gutterBottom
									mr="10px"
									component="div"
									style={{
										color: 'grey',
										display: !item?.customer ? 'flex' : 'block',
										justifyContent: !item?.customer ? 'flex-end' : 'flex-start',
										direction: !item?.customer ? 'ltr' : 'ltr',
										fontSize: '10px'
									}}
								>
									{item?.created_at && moment(new Date(item?.created_at)).format('DD-MM-YYYY')}
									{item?.created_at && moment(new Date(item?.created_at)).format(' h:m a')}
								</Typography>
							</div>
							<Box>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
								>
									{item?.customer
										? `${item?.customer?.first_name} ${item?.customer?.last_name}`
										: `${item?.admin?.first_name} ${item?.admin?.last_name}`}
								</Typography>

								<Typography
									variant="p"
									gutterBottom
									component="div"
								>
									{item?.message}
								</Typography>

								<Box
									display="flex"
									justifyContent="flex-start"
									mt="10px"
								>
									{item?.images &&
										item?.images.map((e) => (
											<Box
												mr="10px"
												key={e.image}
											>
												<Avatar
													variant="square"
													onClick={() => {
														showFile(`${BASE_URL}${e.image}`);
													}}
													src={`${BASE_URL}${e.image}`}
													size={50}
												/>
											</Box>
										))}
								</Box>
								<Box
									mt="10px"
									display="flex"
									justifyContent="flex-start"
								>
									{item?.files &&
										item.files.map((file) => {
											const extension = file.file.split('.').pop().toLowerCase();
											let icon = '';
											switch (extension) {
												case 'pdf':
													icon = 'pdf-file';
													break;
												case 'doc':
												case 'docx':
													icon = 'word-file';
													break;
												case 'txt':
													icon = 'txt-file';
													break;
												case 'xls':
												case 'xlsx':
													icon = 'xls-file';
													break;
												default:
													icon = 'word-file';
													break;
											}
											return (
												<Box
													mr="10px"
													key={file.file}
												>
													<a
														href={`${BASE_URL}${file.file}`}
														target="_blank"
														download
														rel="noopener noreferrer"
													>
														<Avatar
															size={50}
															variant="square"
															src={`assets/icons/${icon}.svg`}
														/>
													</a>
												</Box>
											);
										})}
								</Box>
							</Box>
						</>
					)}
					{!item?.customer && (
						<>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',

									justifyContent: 'flex-end'
								}}
							>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
								>
									{item?.customer
										? `${item?.customer?.first_name} ${item?.customer?.last_name}`
										: `${item?.admin?.first_name} ${item?.admin?.last_name}`}
								</Typography>

								<Typography
									style={{
										display: 'flex',

										justifyContent: 'flex-end'
									}}
									variant="p"
									gutterBottom
									component="div"
								>
									{item?.message}
								</Typography>

								<Box
									display="flex"
									justifyContent="flex-start"
									mt="10px"
								>
									{item?.images &&
										item?.images.map((e) => (
											<Box
												mr="10px"
												key={e.image}
											>
												<Avatar
													variant="square"
													onClick={() => {
														showFile(`${BASE_URL}${e.image}`);
													}}
													src={`${BASE_URL}${e.image}`}
													size={50}
												/>
											</Box>
										))}
								</Box>
								<Box
									mt="10px"
									display="flex"
									justifyContent="flex-start"
								>
									{item?.files &&
										item.files.map((file) => {
											const extension = file.file.split('.').pop().toLowerCase();
											let icon = '';
											switch (extension) {
												case 'pdf':
													icon = 'pdf-file';
													break;
												case 'doc':
												case 'docx':
													icon = 'word-file';
													break;
												case 'txt':
													icon = 'txt-file';
													break;
												case 'xls':
												case 'xlsx':
													icon = 'xls-file';
													break;
												default:
													icon = 'word-file';
													break;
											}
											return (
												<Box
													mr="10px"
													key={file.file}
												>
													<a
														href={`${BASE_URL}${file.file}`}
														target="_blank"
														download
														rel="noopener noreferrer"
													>
														<Avatar
															size={50}
															variant="square"
															src={`assets/icons/${icon}.svg`}
														/>
													</a>
												</Box>
											);
										})}
								</Box>
							</Box>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<img
									style={{
										borderRadius: '50%',
										width: '50px',
										height: '50px',
										margin: '10px'
									}}
									className="w-full block rounded"
									src={`${
										item?.customer_image
											? `${BASE_URL}${item?.customer_image}`
											: item?.admin_image
												? `${BASE_URL}${item?.admin_image}`
												: '/profile.jpg'
									}`}
									alt="Not found"
								/>
								<Typography
									variant="p"
									className="mt-8"
									gutterBottom
									mr="10px"
									component="div"
									style={{
										color: 'grey',
										display: !item?.customer ? 'flex' : 'block',
										justifyContent: !item?.customer ? 'flex-end' : 'flex-start',
										direction: !item?.customer ? 'ltr' : 'ltr',
										fontSize: '10px'
									}}
								>
									{item?.created_at && moment(new Date(item?.created_at)).format('DD-MM-YYYY')}
									{item?.created_at && moment(new Date(item?.created_at)).format(' h:m a')}
								</Typography>
							</div>
						</>
					)}
				</Box>
			))}
			<Box
				style={{
					borderTop: '1px solid grey'
				}}
			>
				<Controller
					name="message"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className={classes.textField}
							id="message"
							placeholder="Write a message"
							type="text"
							InputLabelProps={{ shrink: true }}
							multiline
							rows={5}
							variant="outlined"
							fullWidth
						/>
					)}
				/>
				<div>
					<input
						multiple
						onChange={async (e) => {
							const reader = new FileReader();
							reader.onload = () => {
								if (reader.readyState === 2) {
									const newImg = [...previewImage];
									newImg.push(reader.result);
									setPreviewImage(newImg);
								}
							};
							reader.readAsDataURL(e.target.files[0]);
							const file = e.target.files[0];
							const newImgFile = [...images];
							newImgFile.push(file);
							setImages(newImgFile);
						}}
						ref={inputFileRef}
						id="profile-image"
						accept={ticketfileExtension}
						type="file"
					/>
				</div>
				{errorText && (
					<Typography
						mt="5px"
						mb="5px"
						style={{ color: 'red' }}
					>
						{errorText}
					</Typography>
				)}
				<Box
					width="80%"
					mt="25px"
					display="flex"
					style={{ gap: '20px' }}
					justifyContent="center"
					flexWrap="wrap"
				>
					{previewImage?.map((src, id) => {
						// Get the file extension
						const extension = images[id]?.name?.split('.')?.pop()?.toLowerCase();
						// Define the icons for different file types
						let icon = null;
						switch (extension) {
							case 'pdf':
								icon = 'pdf-file';
								break;
							case 'doc':
							case 'docx':
								icon = 'word-file';
								break;
							case 'txt':
								icon = 'txt-file';
								break;
							case 'xls':
							case 'xlsx':
								icon = 'xls-file';
								break;
							// Add more cases for other file types
							default:
								icon = 'word-file';
								break;
						}

						return (
							<Box
								display="flex"
								width="fit-content"
								position="relative"
							>
								<div
									id="cancelIcon"
									style={{
										position: 'absolute',
										top: '-10px',
										right: '-10px',
										zIndex: 1,
										color: 'red'
									}}
								>
									<HighlightOffIcon
										onClick={() => {
											cancelAImage(id);
										}}
									>
										cancel
									</HighlightOffIcon>
								</div>

								{extension === 'pdf' ||
								extension === 'doc' ||
								extension === 'docx' ||
								extension === 'txt' ||
								extension === 'xls' ||
								extension === 'xlsx' ? (
									<Avatar
										size={50}
										variant="square"
										src={`assets/icons/${icon}.svg`}
									/>
								) : (
									<Avatar
										float="left"
										variant="square"
										src={src}
										size={50}
									/>
								)}
							</Box>
						);
					})}
				</Box>
				<Button
					variant="contained"
					color="secondary"
					style={{
						color: 'white',
						marginBottom: '10px'
					}}
					onClick={handlePostMessage}
				>
					Post Message
				</Button>
			</Box>
		</div>
	);
}

export default SupportForm;
