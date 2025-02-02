
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import UploadFilesHeader from './UploadFilesHeader';
import UploadFilesTable from './UploadFilesTable';

const UploadFiles = () => {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80',
			}}
			header={
				<UploadFilesHeader />
			}
			content={
				<UploadFilesTable />
			}
			// innerScroll
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
};
export default withReducer('uploadFileApp')(UploadFiles);
