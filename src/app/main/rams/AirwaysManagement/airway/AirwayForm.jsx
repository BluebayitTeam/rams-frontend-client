import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';

function AirwayForm(props) {
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
				name="short_code"
				label="Short Code"
			/>
			<CustomTextField
				name="air_code"
				label="Air Code"
			/>
		</div>
	);
}

export default AirwayForm;
