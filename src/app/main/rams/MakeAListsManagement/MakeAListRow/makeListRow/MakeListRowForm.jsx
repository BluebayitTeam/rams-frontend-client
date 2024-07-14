import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function MakeListRowForm() {
	const methods = useFormContext();
	const { control, formState, reset, setValue } = methods;

	const param = useParams();

	return (
		<div className="grid grid-cols-3 grid-flow-row gap-1">
			<h2>This page is Check </h2>
		</div>
	);
}

export default MakeListRowForm;
