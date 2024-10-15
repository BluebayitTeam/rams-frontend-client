import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { z } from 'zod';
import PassengerReportsTable from './PassengerReportsTable';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a passengerReport name')
		.min(5, 'The passengerReport name must be at least 5 characters')
});

function PassengerReport() {
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
					<h1 className="hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold">Passenger Report</h1>
				</div>
			}
			content={<PassengerReportsTable />}
			innerScroll
		/>
	);
}

export default PassengerReport;
