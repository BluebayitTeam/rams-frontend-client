import { useFormContext } from 'react-hook-form';
import InputColor from 'react-input-color';
import CustomTextField from 'src/app/@components/CustomTextField';

function TodotasktypeForm(props) {
	const methods = useFormContext();
	const { setValue, watch } = methods;

	return (
		<div>
			<CustomTextField
				name="name"
				label="Name"
				required
			/>
			<div className="flex">
				<div className="w-5/6">
					<CustomTextField
						name="color"
						label="Color Code"
						required
					/>
				</div>
				<div
					className="rounded "
					style={{
						height: '50px',
						width: '50px',
						marginLeft: '10px',
						marginTop: '10px',
						backgroundColor: watch('color') || 'white'
					}}
				/>
			</div>

			<div className="flex">
				<h4 style={{ marginRight: '15px' }}>Choose Color:</h4>
				<InputColor
					initialValue=" "
					onChange={(color) => setValue('color', color.hex)}
					placement="right"
				/>
			</div>
		</div>
	);
}

export default TodotasktypeForm;
