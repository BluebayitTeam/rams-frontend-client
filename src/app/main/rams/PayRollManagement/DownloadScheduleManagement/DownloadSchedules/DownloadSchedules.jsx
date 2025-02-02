
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import DownloadSchedulesHeader from './DownloadSchedulesHeader';
import DownloadSchedulesTable from './DownloadSchedulesTable';

const DownloadSchedules = () => {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80',
			}}
			header={
				<DownloadSchedulesHeader />
			}
			content={
				<DownloadSchedulesTable />
			}
			// innerScroll
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
};
export default withReducer('downloadScheduleApp')(DownloadSchedules);
