import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { GET_MAKEALIST_CLM_BY_LIST_ID } from 'src/app/constant/constants';

function MakeListRowForm() {
	const methods = useFormContext();
	const { control, formState, reset, setValue } = methods;
	const [apiData, setApiData] = useState({});
	const [booleanKeys, setBooleanKeys] = useState([]);
	const param = useParams();

	useEffect(() => {
		console.log('Fetched ID from URL:', param.makeAListId, param['*']); // Debug statement
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		if (param.makeAListId) {
			const url = `${GET_MAKEALIST_CLM_BY_LIST_ID}${param.makeAListId}`;
			console.log('API URL:', url);
			fetch(url, authTOKEN)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					return response.json();
				})
				.then((data) => {
					const booleanArr = Object.keys(data).filter((key) => typeof data[key] === 'boolean');

					setBooleanKeys(booleanArr);
					setApiData(data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		} else {
			console.error('No ID provided');
		}
	}, [param]);

	useEffect(() => {
		if (apiData) {
			booleanKeys.forEach((key) => {
				setValue(`${key}`, apiData[key]);
			});
		}
	}, [apiData, booleanKeys, setValue]);

	function snakeToTitleCase(text) {
		return text
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	return (
		<div className="grid grid-cols-3 grid-flow-row gap-1">
			{booleanKeys.map((key) => (
				<FormControlLabel
					key={key}
					control={
						<Controller
							name={`${key}`}
							control={control}
							defaultValue={apiData[key]} // set default value here
							render={({ field }) => {
								console.log('checked Field', field);
								return (
									<Checkbox
										{...field}
										checked={field.value || false}
										onChange={(e) => field.onChange(e.target.checked)}
									/>
								);
							}}
						/>
					}
					label={<Typography variant="body1">{snakeToTitleCase(key)}</Typography>}
				/>
			))}
		</div>
	);
}

export default MakeListRowForm;
