import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { navbarToggleMobile } from '../../store/fuse/navbarSlice';


function NavbarToggleButton(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const settings = useSelector(({ fuse }) => fuse.settings.current);
	const navbarStyle = useSelector(({ fuse }) => fuse.settings.defaults.layout.config.navbar.style);
	const { config } = settings.layout;


	return (
		<IconButton
			className={props.className}
			onClick={ev =>
				dispatch(
					mdDown
						? navbarToggleMobile()
						: config.navbar.style === 'style-2'
							? dispatch(
								setDefaultSettings(
									_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
								)
							)
							: setDefaultSettings({ layout: { config: { navbar: { style: navbarStyle === "style-1" ? "style-3-dense" : "style-1" } } } })
				)
			}
			color="inherit"
			size="small"
		>
			{props.children}
		</IconButton>
	);
}

NavbarToggleButton.defaultProps = {
	children: <Icon fontSize="inherit">menu_open</Icon>
};

export default NavbarToggleButton;
