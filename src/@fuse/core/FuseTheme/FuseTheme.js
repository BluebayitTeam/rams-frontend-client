import { ThemeProvider } from '@material-ui/core/styles';
import useUserInfo from 'app/@customHooks/useUserInfo';
import { setUser } from 'app/auth/store/userSlice';
import { USER_BY_ID } from 'app/constant/constants';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function FuseTheme(props) {
	const direction = useSelector(({ fuse }) => fuse.settings.defaults.direction);
	const mainTheme = useSelector(selectMainTheme);
	const auth = useSelector(({ auth }) => auth);

	// const login = useSelector(({ auth }) => auth.login)

	const dispatch = useDispatch();
	const { userId, isLogin } = useUserInfo();

	useLayoutEffect(() => {
		// dispatch(setMenuItem())
	}, [auth]);

	//go to logout page is auth session not found
	const history = useHistory();
	useEffect(() => {
		//note: dispatch a custom event after session changed
		//like this:
		//localStorage.setItem('jwt_access_token')
		//window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'login_event' } }));
		if (!isLogin) {
			history.push('/login');
		}
	}, [isLogin]);

	useEffect(() => {
		fetch(`${USER_BY_ID}${userId}`)
			.then(res => res.json())
			.then(user => {
				console.log('userRes', user);
				dispatch(
					setUser({
						id: user.id,
						email: user.email,
						displayName: user.username,
						role: user.role,
						photoURL: user.image
					})
				);
			})
			.catch(() => {});
	}, []);

	useEnhancedEffect(() => {
		document.body.dir = direction;
	}, [direction]);

	const errorHandler = () => {
		history.push('/pages/errors/error-404');
	};

	// console.warn('FuseTheme:: rendered',mainTheme);
	return (
		<>
			{/* <ErrorBoundary FallbackComponent={<>huh</>} onError={() => errorHandler()}> */}
			<ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>
			{/* </ErrorBoundary> */}
		</>
	);
}

export default FuseTheme;
