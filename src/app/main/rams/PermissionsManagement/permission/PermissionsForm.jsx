import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router';
import CustomTextField from 'src/app/@components/CustomTextField';
import { CHECK_GDS_NAME_DUPLECATE } from 'src/app/constant/constants';
// Ensure lodash is installed
import axios from 'axios';

function PermissionForm(props) {
	const methods = useFormContext();
	const { setError } = methods;
	const routeParams = useParams();
	const { PermissionId } = routeParams;

	const handleCheckPermissionName = async (name) => {
		const response = await axios.get(
			`${CHECK_GDS_NAME_DUPLECATE}?name=${name}&id=${PermissionId === 'new' ? '' : PermissionId}&type=${PermissionId === 'new' ? 'create' : 'update'}`
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
					handleCheckPermissionName(e.target.value);
				}}
			/>
		</div>
	);
}

export default PermissionForm;
