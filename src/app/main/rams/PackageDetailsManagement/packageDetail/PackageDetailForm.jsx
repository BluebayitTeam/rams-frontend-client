import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

function PackageDetailForm(props) {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
		reset
	} = useFormContext();

	useEffect(() => {
		reset({ ...getValues(), items: props?.packageDetails });
		// Set default values when packageDetails prop changes
		props?.packageDetails.forEach((packageDetail) => {
			setValue(`packageDetails.${packageDetail.id}.is_checked`, packageDetail.is_checked);
			setValue(
				`packageDetails.${packageDetail.id}.custom_value`,
				packageDetail.is_checked ? packageDetail.custom_value : ''
			);
			setValue(`packageDetails.${packageDetail.id}.feature_id`, packageDetail.feature?.id);
		});
	}, [props?.packageDetails, setValue, reset]);

	const handleCheckChange = (id, checked) => {
		setValue(`packageDetails.${id}.is_checked`, checked);

		if (!checked) {
			setValue(`packageDetails.${id}.custom_value`, ''); // Clear custom_value if unchecked
		}
	};

	const handleCustomValueChange = (id, value) => {
		setValue(`packageDetails.${id}.is_checked`, !!value); // Set is_checked to true if value is entered
		setValue(`packageDetails.${id}.custom_value`, value);
	};

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{props?.packageDetails.map((clm) => (
				<div
					key={clm.id}
					style={{ flexBasis: '50%', display: 'flex' }}
				>
					<div style={{ flexBasis: '50%', paddingRight: '5px' }}>
						<FormControlLabel
							control={
								<Controller
									name={`packageDetails.${clm.id}.is_checked`}
									control={control}
									render={({ field }) => (
										<Checkbox
											{...field}
											checked={field.value || false}
											onChange={(e) => handleCheckChange(clm.id, e.target.checked)}
										/>
									)}
								/>
							}
							label={clm.feature?.label}
						/>
					</div>
					<div style={{ flexBasis: '50%', paddingRight: '50px' }}>
						<Controller
							name={`packageDetails.${clm.id}.custom_value`}
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									variant="outlined"
									className="w-full" // Adjusted to take full width
									size="small"
									margin="normal"
									InputLabelProps={{ shrink: true }}
									onChange={(e) => handleCustomValueChange(clm.id, e.target.value)}
								/>
							)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default PackageDetailForm;
