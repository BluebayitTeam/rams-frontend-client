import { useFormContext, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomTextField from 'src/app/@components/CustomTextField';
import { GET_GDS_CHECK_DUPLECATE } from 'src/app/constant/constants';
import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce'; // Ensure lodash is installed

function GdsForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, setValue, setError, clearErrors } = methods;
	const routeParams = useParams();
	const { gdsId } = routeParams;
	const [nameValue, setNameValue] = useState('');

	useEffect(() => {
		if (gdsId !== 'new') {
			setNameValue(gdsId.name);
			setValue('name', gdsId.name);
		}
	}, [gdsId, setValue]);

	// Debounced handle change function
	const handleOnChange = useCallback(
		debounce(async (selectedName) => {
			const name = gdsId === 'new' ? 'create' : 'update';

			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			const url = new URL(GET_GDS_CHECK_DUPLECATE);
			url.searchParams.append('name', selectedName);
			url.searchParams.append('type', name);

			try {
				const res = await fetch(url, authTOKEN);
				const data = await res.json();

				if (data.name_exists) {
					setError('name', {
						type: 'manual',
						message: 'Name already exists'
					});
				} else {
					clearErrors('name');
				}
			} catch (error) {}
		}, 300),
		[gdsId, setError, clearErrors]
	);

	const handleChange = (event) => {
		const { value } = event.target;
		setNameValue(value);
		setValue('name', value);
		handleOnChange(value);
	};

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<CustomTextField
						{...field}
						label="Name"
						required
						onChange={(e) => {
							field.onChange(e);
							handleChange(e);
						}}
					/>
				)}
			/>
			<Controller
				name="note"
				control={control}
				render={({ field }) => (
					<CustomTextField
						{...field}
						label="Note"
					/>
				)}
			/>
		</div>
	);
}

export default GdsForm;
