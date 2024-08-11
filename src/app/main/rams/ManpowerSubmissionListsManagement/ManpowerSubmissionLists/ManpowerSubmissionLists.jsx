import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ManpowerSubmissionListsHeader from './ManpowerSubmissionListsHeader';
import ManpowerSubmissionListsTable from './ManpowerSubmissionListsTable';

/**
 * The manpowerSubmissionLists page.
 */
function ManpowerSubmissionLists() {
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
				<ManpowerSubmissionListsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<ManpowerSubmissionListsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ManpowerSubmissionLists;
