/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
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
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	const handlePdfDownload = () => {
		// Your logic to handle PDF download
	};

	const handleExelDownload = () => {
		// Your logic to handle Excel download
	};

	const handlePrint = () => {
		// Your logic to handle print
	};

	const handleGetAgents = () => {
		// Your logic to get agents for the current page
	};

	const handleGetAllAgents = () => {
		// Your logic to get all agents
	};
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
			<ReportPaginationAndDownload
				page={page}
				size={size}
				totalPages={totalPages}
				totalElements={totalElements}
				onFirstPage={() => handleGetAgents(1)}
				onPreviousPage={() => handleGetAgents(page - 1)}
				onNextPage={() => handleGetAgents(page + 1)}
				onLastPage={() => handleGetAgents(totalPages)}
				handlePdfDownload={handlePdfDownload}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetAgents={handleGetAgents}
				handleGetAllAgents={handleGetAllAgents}
				// tableColumns={/* your table columns */}
				// dispatchTableColumns={/* your dispatch function */}
			/>
		</div>
	);
}

export default AgentReportsTable;
