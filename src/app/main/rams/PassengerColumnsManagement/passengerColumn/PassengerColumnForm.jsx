import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function PassengerColumnForm(props) {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
		reset
	} = useFormContext();
	console.log(`props`, props?.passengerColumns);
	useEffect(() => {
		reset({ ...getValues(), items: props?.passengerColumns });
		// Set default values when passengerColumns prop change
		props?.passengerColumns.forEach((passengerColumn) => {
			setValue(`passengerColumns.${passengerColumn.id}.isChecked`, passengerColumn.isChecked);
			setValue(
				`passengerColumns.${passengerColumn.id}.serial`,
				passengerColumn.isChecked ? passengerColumn.serial : null
			);
			setValue(`passengerColumns.${passengerColumn.id}.key`, passengerColumn.key);
		});
	}, [props?.passengerColumns, setValue]);
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{props?.passengerColumns.map((clm) => (
				<div
					key={clm.id}
					style={{ flex: '1 0 30%', display: 'flex', padding: '10px' }}
				>
					<Controller
						name={`passengerColumns.${clm.id}.serial`}
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
								name={`passengerColumns.${clm.id}.isChecked`}
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

export default PassengerColumnForm;
