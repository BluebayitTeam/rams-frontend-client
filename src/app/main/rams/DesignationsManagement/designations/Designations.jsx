import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import DesignationsHeader from './DesignationsHeader';
import DesignationsTable from './DesignationsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The designations page.
 */
function Designations() {
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
				hasPermission('DESIGNATION_LIST') && <DesignationsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				hasPermission('DESIGNATION_LIST') && <DesignationsTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Designations;
