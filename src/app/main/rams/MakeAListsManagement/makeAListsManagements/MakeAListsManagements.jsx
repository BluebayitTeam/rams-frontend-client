import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import MakeAListsManagementsHeader from './MakeAListsManagementsHeader';
import MakeAListsManagementsTable from './MakeAListsManagementsTable';

/**
 * The makeAListsManagements page.
 */
function MakeAListsManagements() {
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
				<MakeAListsManagementsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<MakeAListsManagementsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default MakeAListsManagements;
