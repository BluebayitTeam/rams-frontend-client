import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function MakeAListsManagementColumnForm(props) {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
		reset
	} = useFormContext();
	const [makeAListsManagementColumnValue, setMakeAListsManagementColumnValue] = useState(false);
	console.log('propsShuva', props);
	useEffect(() => {
		reset({ ...getValues(), items: props?.makeAListsManagementColumns });

		if (!makeAListsManagementColumnValue) {
			// Set default values when makeAListsManagementColumns prop change
			props?.makeAListsManagementColumns.forEach((makeAListsManagementColumn) => {
				setValue(
					`makeAListsManagementColumns.${makeAListsManagementColumn?.id}.isChecked`,
					makeAListsManagementColumn.isChecked
				);
				setValue(
					`makeAListsManagementColumns.${makeAListsManagementColumn?.id}.serial`,
					makeAListsManagementColumn.isChecked ? makeAListsManagementColumn.serial : null
				);
				setValue(
					`makeAListsManagementColumns.${makeAListsManagementColumn?.id}.key`,
					makeAListsManagementColumn.key
				);
				// console.log('setValue', setValue);
			});
			setMakeAListsManagementColumnValue(true);
		}
	}, [props?.makeAListsManagementColumns, setValue, getValues(), makeAListsManagementColumnValue]);
	return (
		<div className="grid grid-cols-3 grid-flow-row gap-1">
			{props?.makeAListsManagementColumns?.map((clm) => (
				<div
					key={clm.id}
					style={{ flex: '1 0 30%', display: 'flex' }}
				>
					<Controller
						name={`makeAListsManagementColumns.${clm.id}.serial`}
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
								name={`makeAListsManagementColumns.${clm.id}.isChecked`}
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

export default MakeAListsManagementColumnForm;
