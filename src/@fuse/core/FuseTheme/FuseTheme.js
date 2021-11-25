import { ThemeProvider } from '@material-ui/core/styles';
import useUserInfo from 'app/@customHook/useUserInfo';
import { setUser } from 'app/auth/store/userSlice';
import { USER_BY_ID } from 'app/constant/constants';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function FuseTheme(props) {
	const direction = useSelector(({ fuse }) => fuse.settings.defaults.direction);
	const mainTheme = useSelector(selectMainTheme);
	const auth = useSelector(({ auth }) => auth)
	// const login = useSelector(({ auth }) => auth.login)

	const dispatch = useDispatch()
	const { userId } = useUserInfo()

	useLayoutEffect(() => {
		// dispatch(setMenuItem())

		console.log("hitDispatch")
	}, [auth])

	useLayoutEffect(() => {
		fetch(`${USER_BY_ID}${userId}`).then(res => res.json()).then(user => {
			console.log("userRes", user)
			dispatch(setUser({ id: user.id, email: user.email, displayName: user.username, role: user.role, photoURL: user.image }))
		}).catch(() => { })
	}, [])


	useEnhancedEffect(() => {
		document.body.dir = direction;
	}, [direction]);

	// console.warn('FuseTheme:: rendered',mainTheme);
	return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default FuseTheme;
