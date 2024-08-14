import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';

function GdsForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, getValues } = methods;
	const { errors } = formState;

	useEffect(() => {
		// Define the fields with their respective names
		const fieldNames = ['name', 'note'];

		// Check for duplicate field names
		const duplicateNames = fieldNames.filter((name, index) => fieldNames.indexOf(name) !== index);

		if (duplicateNames.length > 0) {
			alert(`Duplicate field name detected: ${duplicateNames.join(', ')}`);
		}
	}, []);

	return (
		<div>
			<CustomTextField
				name="name"
				label="Name"
				required
			/>
			<CustomTextField
				name="note"
				label="Note"
			/>
		</div>
	);
}

export default GdsForm;
