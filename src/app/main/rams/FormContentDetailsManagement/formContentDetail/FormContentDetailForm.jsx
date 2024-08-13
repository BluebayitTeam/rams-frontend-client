import { getformcontentHead } from 'app/store/dataSlice';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomRichTextEditor from 'src/app/@components/ReportComponents/CustomRichTextEditor';

function FormContentDetailForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, setValue, control } = methods;
	const { errors } = formState;
	const { formcontentHeads } = useSelector((state) => state.data);
	useEffect(() => {
		dispatch(getformcontentHead());
	}, []);
	const editorRef = useRef(null);

	const handleContentChange = (content) => {
		setValue('details', content);
	};

	return (
		<div>
			<CustomDropdownField
				name="head"
				label="Title"
				options={formcontentHeads}
				optionLabelFormat={(option) => `${option.title}`}
			/>
			<CustomRichTextEditor
				name="details"
				control={control}
				editorRef={editorRef}
				onContentChange={handleContentChange}
			/>
		</div>
	);
}

export default FormContentDetailForm;
