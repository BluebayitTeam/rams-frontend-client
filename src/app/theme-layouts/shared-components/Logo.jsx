import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */

function Logo() {
	const [generalData, setGeneralData] = useState({});

	// get general setting data
	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}));
	}, []);

	return (
		<Root className="flex items-center">
			<div className="flex space-x-6 px-8 items-center">
				<div className="badge flex items-center rounded-4 space-x-8 px-8 py-4">
					<img
						className="react-logo"
						src={`${BASE_URL}${generalData?.logo}`}
						alt="react"
						width="170"
					/>
				</div>
			</div>
		</Root>
	);
}

export default Logo;
