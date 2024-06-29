import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import JournalsHeader from './JournalsHeader';
import JournalsTable from './JournalsTable';

/**
 * The journals page.
 */
function Journals() {
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
				<JournalsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<JournalsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Journals;
