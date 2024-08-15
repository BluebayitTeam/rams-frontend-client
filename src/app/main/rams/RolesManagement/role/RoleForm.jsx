import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router';
// Ensure lodash is installed
import CustomTextField from 'src/app/@components/CustomTextField';

function RoleForm(props) {
	const methods = useFormContext();
	const { setError } = methods;
	const routeParams = useParams();
	const { RoleId } = routeParams;

	// const handleCheckRoleName = async (name) => {
	// 	const response = await axios.get(
	// 		`${CHECK_GDS_NAME_DUPLECATE}?name=${name}&id=${RoleId === 'new' ? '' : RoleId}&type=${RoleId === 'new' ? 'create' : 'update'}`
	// 	);

	// 	if (response?.data.name_exists) {
	// 		setError('name', {
	// 			type: 'manual',
	// 			message: 'Name already exists'
	// 		});
	// 	}
	// };

	return (
		<div>
			<CustomTextField
				name="name"
				label="Name"
				required
				// onChange={(e) => {
				// 	handleCheckRoleName(e.target.value);
				// }}
			/>
		</div>
	);
}

export default RoleForm;
