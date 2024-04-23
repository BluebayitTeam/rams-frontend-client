import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import FeatureDetailsHeader from './FeatureDetailsHeader';
import FeatureDetailsTable from './FeatureDetailsTable';

/**
 * The featureDetails page.
 */
function FeatureDetails() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [searchKey, setSearchKey] = useState('');

	console.log('searchKey', searchKey);

	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80'
			}}
			header={
				<FeatureDetailsHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<FeatureDetailsTable
					setSearchKey={setSearchKey}
					searchKey={searchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default FeatureDetails;
