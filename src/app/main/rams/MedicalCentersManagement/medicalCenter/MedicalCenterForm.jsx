import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import fillSpaceByUnderscore from 'src/app/@helpers/fillSpaceByUnderscore';
import { MEDICALCENTER_WHEN_UPDATE } from 'src/app/constant/constants';

function MedicalCenterForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { medicalCenterId } = routeParams;

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.name || !field.value}
							helperText={errors?.name?.message}
							label="Name"
							id="name"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
							autoFocus
							onChange={(e) => {
								if (e.target.value && medicalCenterId) {
									axios.get(
										`${MEDICALCENTER_WHEN_UPDATE}?id=${medicalCenterId}&name=${fillSpaceByUnderscore(
											e.target.value
										)}`
									);
								}

								field.onChange(e.target.value);
							}}
						/>
					);
				}}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							id="email"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="contact_person"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.contact_person}
							helperText={errors?.contact_person?.message}
							label="Contact Person"
							id="contact_person"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="mobile"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.mobile}
							helperText={errors?.mobile?.message}
							label="Mobile"
							id="mobile"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="phone_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.phone_number}
							helperText={errors?.phone_number?.message}
							label="Phone Number"
							id="phone_number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="web_address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.web_address}
							helperText={errors?.web_address?.message}
							label="Web Address"
							id="web_address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="google_map_link"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.google_map_link}
							helperText={errors?.google_map_link?.message}
							label="google Map Link"
							id="google_map_link"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.address}
							helperText={errors?.address?.message}
							label="Address"
							id="address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
		</div>
	);
}

export default MedicalCenterForm;
