import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router';
import CustomTextField from 'src/app/@components/CustomTextField';
import { CHECK_GDS_NAME_DUPLECATE } from 'src/app/constant/constants';
// Ensure lodash is installed
import axios from 'axios';

function GdsForm(props) {
	const methods = useFormContext();
	const { setError } = methods;
	const routeParams = useParams();
	const { gdsId } = routeParams;

	const handleCheckGdsName = async (name) => {
		const response = await axios.get(
			`${CHECK_GDS_NAME_DUPLECATE}?name=${name}&id=${gdsId === 'new' ? '' : gdsId}&type=${gdsId === 'new' ? 'create' : 'update'}`
		);

		if (response?.data.name_exists) {
			setError('name', {
				type: 'manual',
				message: 'Name already exists'
			});
		}
	};

	return (
		<div>
			<CustomTextField
				name="name"
				label="Name"
				required
				onChange={(e) => {
					handleCheckGdsName(e.target.value);
				}}
			/>

			<CustomTextField
				name="note"
				label="Note"
				required
			/>
		</div>
	);
}

export default GdsForm;
