/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import AgentFilterMenu from './AgentFilterMenu';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

// Define the Zod schema
const schema = z.object({
	// Add your form fields and validation rules here, e.g.,
	// name: z.string().nonempty("Name is required"),
	// age: z.number().min(18, "Must be at least 18"),
});

function AgentReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	return (
		<div className={classes.headContainer}>
			{/* Filter */}
			<FormProvider {...methods}>
				<AgentFilterMenu
				// inShowAllMode={inShowAllMode}
				// handleGetAgents={handleGetAgents}
				// handleGetAllAgents={handleGetAllAgents}
				/>
			</FormProvider>
		</div>
	);
}

export default AgentReportsTable;
