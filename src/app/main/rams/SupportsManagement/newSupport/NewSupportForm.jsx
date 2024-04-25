/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Autocomplete, Avatar, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getTicketDepartments, getTicketPriority, getTicketStatuss } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { allowedExtensions, ticketfileExtension } from 'src/app/@data/data';
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

function NewSupportForm(props) {
	const ticketDepartments = useSelector((state) => state.data.ticketDepartments);
	const ticketPrioritys = useSelector((state) => state.data.ticketPrioritys);
	const ticketStatus = useSelector((state) => state.data.ticketStatuss);

	console.log(`jbwefrwer`, ticketDepartments, ticketPrioritys, ticketStatus);

	useEffect(() => {
		dispatch(getTicketDepartments());
		dispatch(getTicketStatuss());
		dispatch(getTicketPriority());
	}, []);

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

	useEffect(() => {
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
			message: formData?.message,
			subject: formData?.subject,
			ticket_department: formData?.ticket_department,
			ticket_priority: formData?.ticket_priority,
			ticket: supportId,
			customer_email: adminId,
			file: images
		};

		setValue('messageData', messageData);
	}, [getValues(), images]);

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
			message: formData?.message,
			ticket: supportId,
			customer_email: adminId,
			file: images
		};

		dispatch(createSupport(messageData)).then(() => {
			// setValue('message', '');

			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}

			setPreviewImage([]);
			setImages([]);
		});
		// getSupportMessage(supportId);
	};

	return (
		<div>
			<Controller
				name="subject"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Subject"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.subject}
						helperText={errors?.subject?.message}
					/>
				)}
			/>

			<Controller
				name="ticket_department"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={
							value ? ticketDepartments.find((ticketDepartment) => ticketDepartment.id === value) : null
						}
						options={ticketDepartments}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							// dispatch(getThanasBasedOnCity(newValue?.id));
						}}
						// defaultValue={{ id: null, name: "Select a city" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a ticket department"
								label="ticket_department"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="ticket_priority"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? ticketPrioritys.find((ticketPriority) => ticketPriority.id === value) : null}
						options={ticketPrioritys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							// dispatch(getThanasBasedOnCity(newValue?.id));
						}}
						// defaultValue={{ id: null, name: "Select a city" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a ticket priority"
								label="ticket_priority"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="message"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16 "
						required
						label="Message"
						autoFocus
						id="message"
						variant="outlined"
						fullWidth
						multiline
						rows={4}
						error={!!errors.message}
						helperText={errors?.message?.message}
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
		</div>
	);
}

export default NewSupportForm;
