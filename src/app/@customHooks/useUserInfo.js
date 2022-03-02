import { useEffect, useState } from 'react';

//note: dispatch a custom event after session changed otherwise state will not change in same component
//like this:
//sessionStorage.setItem('jwt_access_token')
//window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'login_event' } }));
function useUserInfo() {
	const [userId, setUserId] = useState(sessionStorage.getItem('user_id'));
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('jwt_access_token'));
	const [userName, setUserName] = useState(sessionStorage.getItem('user_name'));
	const [userEmail, setUserEmail] = useState(sessionStorage.getItem('user_email'));
	const [userRole, setUserRole] = useState(sessionStorage.getItem('user_role'));
	const [userImage, setUserImage] = useState(sessionStorage.getItem('user_image'));
	const [isLogin, setIsLogin] = useState(sessionStorage.getItem('jwt_access_token') ? true : false);

	useEffect(() => {
		const resetUserData = () => {
			setUserId(sessionStorage.getItem('user_id'));
			setAuthToken(sessionStorage.getItem('jwt_access_token'));
			setUserName(sessionStorage.getItem('user_name'));
			setUserEmail(sessionStorage.getItem('user_email'));
			setUserRole(sessionStorage.getItem('user_role'));
			setUserImage(sessionStorage.getItem('user_image'));
			setIsLogin(sessionStorage.getItem('jwt_access_token') ? true : false);
		};

		//reset state whene sessionStorage changed
		window.addEventListener('storage', resetUserData);

		//unsibscibe event listener when this hook unmount
		return () => window.removeEventListener('storage', resetUserData);
	}, []);

	return {
		userId,
		authToken: {
			headers: {
				'Content-type': 'application/json',
				Authorization: authToken
			}
		},
		userName,
		userEmail,
		userRole,
		userImage,
		isLogin
	};
}

export default useUserInfo;
