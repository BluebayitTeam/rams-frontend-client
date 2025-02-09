import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';


function PromotionForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, getValues, watch } = methods;
	const { errors, isValid, dirtyFields } = formState;

	// const handleDelete = localStorage.getItem('promotionEvent');


	return (
		<div>
			{/* Duration */}
			<CustomTextField
				name="duration"
				label="Duration (In Month)"
				required
			/>
			{/* Increment Amount */}
			<CustomTextField
				name="increment_amount"
				label="Increment Amount"
				required
			/>
			{/* Note */}
			<CustomTextField
				name="note"
				label="Note"
			/>

		</div>
	);
}

export default PromotionForm;
