import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router';
// Ensure lodash is installed
import CustomTextField from 'src/app/@components/CustomTextField';
import { CHECK_ROLE_NAME_DUPLECATE } from 'src/app/constant/constants';

function RoleForm(props) {
	const methods = useFormContext();
	const { setError } = methods;
	const routeParams = useParams();
	const { roleId } = routeParams;

	const handleCheckRoleName = async (name) => {
		const response = await axios.get(
			`${CHECK_ROLE_NAME_DUPLECATE}?name=${name}&id=${roleId === 'new' ? '' : roleId}&type=${roleId === 'new' ? 'create' : 'update'}`
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
					handleCheckRoleName(e.target.value);
				}}
			/>
		</div>
	);
}

export default RoleForm;
