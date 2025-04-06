import { alpha, ThemeProvider } from "@mui/material/styles";
import { memo, useEffect, useLayoutEffect } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "app/theme-layouts/shared-components/navigation/store/navigationSlice";
/**
 * The useEnhancedEffect function is used to conditionally use the useLayoutEffect hook if the window object is defined.
 * Otherwise, it uses the useEffect hook.
 */
const useEnhancedEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        backgroundColor: `${theme.palette.background.default}!important`,
        color: `${theme.palette.text.primary}!important`,
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      /*  'code:not([class*="language-"])': {
    color: theme.palette.secondary.dark,
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
    padding: '2px 3px',
    borderRadius: 2,
    lineHeight: 1.7,
  }, */
      "table.simple tbody tr th": {
        borderColor: theme.palette.divider,
      },
      "table.simple thead tr th": {
        borderColor: theme.palette.divider,
      },
      "a:not([role=button]):not(.MuiButtonBase-root)": {
        color: theme.palette.secondary.main,
        textDecoration: "underline",
        "&:hover": {},
      },
      "a.link, a:not([role=button])[target=_blank]": {
        background: alpha(theme.palette.secondary.main, 0.2),
        color: "inherit",
        borderBottom: `1px solid ${theme.palette.divider}`,
        textDecoration: "none",
        "&:hover": {
          background: alpha(theme.palette.secondary.main, 0.3),
          textDecoration: "none",
        },
      },
      '[class^="border"]': {
        borderColor: theme.palette.divider,
      },
      '[class*="border"]': {
        borderColor: theme.palette.divider,
      },
      '[class*="divide-"] > :not([hidden]) ~ :not([hidden])': {
        borderColor: theme.palette.divider,
      },
      hr: {
        borderColor: theme.palette.divider,
      },
      "::-webkit-scrollbar-thumb": {
        boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"}`,
      },
      "::-webkit-scrollbar-thumb:active": {
        boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"}`,
      },
    })}
  />
);

/**
 * The FuseTheme component is responsible for rendering the MUI ThemeProvider component with the specified theme and direction.
 * It also sets the direction of the document body and adds a class to the body based on the current theme mode.
 * The component is memoized to prevent unnecessary re-renders.
 */
function FuseTheme(props) {
  const dispatch = useDispatch();
  // const auth = localStorage.getItem('jwt_access_token');
  // const auth = useSelector(({ auth }) => auth);
  const auth = useSelector(({ user }) => user?.data);
  const { direction, theme, children } = props;
  const { mode } = theme.palette;
  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  useEffect(() => {
    // This line for Dynamic Sidebar
    dispatch(setMenuItem());
  }, [auth]);
  useEffect(() => {
    document.body.classList.add(mode === "light" ? "light" : "dark");
    document.body.classList.remove(mode === "light" ? "dark" : "light");
  }, [mode]);
  // console.warn('FuseTheme:: rendered',mainTheme);

  // useEffect(() => {
  // 	const authTOKEN = {
  // 		headers: {
  // 			'Content-type': 'application/json',
  // 			Authorization:
  // 				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MTEyMDgyLCJqdGkiOiJkOGU1MWFkY2JkYWU0ZWIwYWI3YTYxYjM5NTAzYzczYSIsInVzZXJfaWQiOjF9.xrssbaPhSQpOKJnuzqZ_5p5KljeapHngP8PKoM3Mr_I'
  // 		}
  // 	};

  // 	fetch(`${USER_BY_TOKEN}`, authTOKEN)
  // 		.then((res) => res.json())
  // 		.then((user) => {
  // 			dispatch(
  // 				setUser({
  // 					id: user.id,
  // 					email: user.email,
  // 					displayName: `${user.first_name} ${user.last_name ? user.last_name : ' '}`.toUpperCase(),
  // 					role: localStorage.getItem('user_role'),
  // 					photoURL: user.image
  // 				})
  // 			);
  // 		});
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      {children}
      {inputGlobalStyles}
    </ThemeProvider>
  );
}

export default memo(FuseTheme);
