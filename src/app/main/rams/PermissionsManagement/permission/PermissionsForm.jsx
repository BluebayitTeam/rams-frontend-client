import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router';
// Ensure lodash is installed
import CustomTextField from 'src/app/@components/CustomTextField';
import { CHECK_PERMISSION_NAME_DUPLECATE } from 'src/app/constant/constants';

function PermissionForm(props) {
	const methods = useFormContext();
	const { setError } = methods;
	const routeParams = useParams();
	const { permissionId } = routeParams;

	const handleCheckPermissionName = async (name) => {
		const response = await axios.get(
			`${CHECK_PERMISSION_NAME_DUPLECATE}?name=${name}&id=${permissionId === 'new' ? '' : permissionId}&type=${permissionId === 'new' ? 'create' : 'update'}`
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
