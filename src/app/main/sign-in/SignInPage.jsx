import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';
import JwtLoginTab from './tabs/JwtSignInTab';
import FirebaseSignInTab from './tabs/FirebaseSignInTab';

const tabs = [
	{
		id: 'jwt',
		title: 'JWT',
		logo: 'assets/images/logo/jwt.svg',
		logoClass: 'h-40 p-4 bg-black rounded-12'
	},
	{
		id: 'firebase',
		title: 'Firebase',
		logo: 'assets/images/logo/firebase.svg',
		logoClass: 'h-40'
	}
];

/**
 * The sign in page.
 */
function SignInPage() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

	function handleSelectTab(id) {
		setSelectedTabId(id);
	}

	const [generalData, setGeneralData] = useState({});

	// get general setting data
	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`)
			.then((response) => response.json())
			.then((data) => setGeneralData(data?.general_settings[0] || {}));
	}, []);
	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper
				className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none"
				style={{ justifyContent: 'center' }}
			>
				<CardContent className="mx-auto  w-1/2 sm:mx-0 text-center whitespace-nowrap">
					<div className="flex items-center mb-48">
						<img
							className="logo-icon w-48"
							src={`${BASE_URL}${generalData?.favicon}`}
							alt="logo"
						/>
						<div className="mr-4  h-40" />
						<div>
							<Typography
								className="text-24 font-semibold logo-text whitespace-nowrap"
								color="inherit"
							>
								{generalData?.site_name}
							</Typography>
							<Typography
								className="text-16 tracking-widest -mt-8 font-700"
								color="textSecondary"
							>
								{/* REACT */}
							</Typography>
						</div>
					</div>

					{selectedTabId === 'jwt' && <JwtLoginTab />}
					{selectedTabId === 'firebase' && <FirebaseSignInTab />}
				</CardContent>
			</Paper>

			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: 'primary.main' }}
			>
				<svg
					className="pointer-events-none absolute inset-0"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: 'primary.light' }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle
							r="234"
							cx="196"
							cy="23"
						/>
						<circle
							r="234"
							cx="790"
							cy="491"
						/>
					</Box>
				</svg>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{ color: 'primary.light' }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>

				<div className="hidden md:flex flex-1 items-center justify-center p-64">
					<div className="max-w-320">
						<img
							src={`${BASE_URL}${generalData?.rams_logo}`}
							className="text-24 font-semibold logo-text"
							alt="Logo"
						/>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignInPage;
