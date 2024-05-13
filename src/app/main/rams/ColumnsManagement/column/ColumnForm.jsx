import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function ColumnForm(props) {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
		reset
	} = useFormContext();
	const [columnValue, setColumnValue] = useState(false);
	console.log('propsShuva', props);
	useEffect(() => {
		if (!columnValue) {
			reset({ ...getValues(), items: props?.columns });
			// Set default values when columns prop change
			props?.columns.forEach((column) => {
				setValue(`columns.${column?.id}.isChecked`, column.isChecked);
				setValue(`columns.${column?.id}.serial`, column.isChecked ? column.serial : null);
				setValue(`columns.${column?.id}.key`, column.key);
				// console.log('setValue', setValue);
			});
			setColumnValue(true);
		}
	}, [props?.columns, setValue, getValues(), columnValue]);
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{props?.columns?.map((clm) => (
				<div
					key={clm.id}
					style={{ flex: '1 0 30%', display: 'flex', padding: '10px' }}
				>
					<Controller
						name={`columns.${clm.id}.serial`}
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								variant="outlined"
								className="w-48 mx-5"
								size="small"
								margin="normal"
								InputLabelProps={{ shrink: true }}
							/>
						)}
					/>
					<FormControlLabel
						control={
							<Controller
								name={`columns.${clm.id}.isChecked`}
								control={control}
								render={({ field }) => (
									<Checkbox
										{...field}
										checked={field.value ? field.value : false}
									/>
								)}
							/>
						}
						label={clm.label}
					/>
				</div>
			))}
		</div>
	);
}

export default ColumnForm;
