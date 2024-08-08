import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import BranchsHeader from './BranchsHeader';
import BranchsTable from './BranchsTable';

/**
 * The branchs page.
 */
function Branchs() {
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
				<BranchsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<BranchsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Branchs;
