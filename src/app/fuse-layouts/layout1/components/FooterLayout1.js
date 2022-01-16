import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 shadow-md', props.className)}
				color="default"
				style={{
					backgroundColor: footerTheme.palette.primary.main,
					color: footerTheme.palette.background.default
				}}
			>
				<Toolbar className="min-h-28 md:min-h-24 px-8 sm:px-12 py-0 flex justify-end items-center overflow-x-auto">
					<Typography>Copyright by Bluebay IT Limited</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
