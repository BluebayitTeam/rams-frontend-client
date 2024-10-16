import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { z } from 'zod';
import PayorderClearingReportsTable from './PayorderClearingReportsTable';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a payorderClearingReport name')
		.min(5, 'The payorderClearingReport name must be at least 5 characters')
});

function PayorderClearingReport() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<FusePageCarded
			headerBgHeight="102px"
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-52 h-52'
			}}
			header={
				<div className="flex">
					<h1 className="hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold">Post Date Cheque Report</h1>
				</div>
			}
			content={<PayorderClearingReportsTable />}
			innerScroll
		/>
	);
}

export default PayorderClearingReport;
