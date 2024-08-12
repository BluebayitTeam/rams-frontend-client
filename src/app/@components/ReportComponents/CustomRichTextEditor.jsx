import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

function CustomRichTextEditor({ name, control, editorRef, onContentChange }) {
	const handleEditorChange = () => {
		if (editorRef.current) {
			const content = editorRef.current.getContent();
			onContentChange(content);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Editor
					value={field.value}
					onInit={(evt, editor) => {
						editorRef.current = editor;
					}}
					apiKey="97q3jo27j3igdlo6hc3hkv5ut16l37jdmv6b804duzect0ao"
					placeholder="Full description"
					onEditorChange={handleEditorChange}
					id={name}
					init={{
						height: 350,
						placeholder: 'Full Description',
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount'
						],
						toolbar:
							'undo redo | formatselect | ' +
							'bold italic backcolor | alignleft aligncenter ' +
							'alignright alignjustify | bullist numlist outdent indent | ' +
							'removeformat | help',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
			)}
		/>
	);
}

export default CustomRichTextEditor;
