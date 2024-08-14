import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';

function GdsForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, getValues } = methods;
	console.log('getValues', getValues());
	const { errors } = formState;

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
