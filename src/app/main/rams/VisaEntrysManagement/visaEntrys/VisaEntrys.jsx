import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import VisaEntrysHeader from './VisaEntrysHeader';
import VisaEntrysTable from './VisaEntrysTable';

/**
 * The visaEntrys page.
 */
function VisaEntrys() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [searchKey, setSearchKey] = useState('');
	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80'
			}}
			header={
				<VisaEntrysHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<VisaEntrysTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default VisaEntrys;
