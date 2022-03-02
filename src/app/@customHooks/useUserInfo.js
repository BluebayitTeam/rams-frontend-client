import { useEffect, useState } from 'react';

//note: dispatch a custom event after session changed otherwise state will not change in same component
//like this:
//localStorage.setItem('jwt_access_token')
//window.dispatchEvent(new CustomEvent('storage', { detail: { name: 'login_event' } }));
function useUserInfo() {
	const [userId, setUserId] = useState(localStorage.getItem('user_id'));
	const [authToken, setAuthToken] = useState(localStorage.getItem('jwt_access_token'));
	const [userName, setUserName] = useState(localStorage.getItem('user_name'));
	const [userEmail, setUserEmail] = useState(localStorage.getItem('user_email'));
	const [userRole, setUserRole] = useState(localStorage.getItem('user_role'));
	const [userImage, setUserImage] = useState(localStorage.getItem('user_image'));
	const [isLogin, setIsLogin] = useState(localStorage.getItem('jwt_access_token') ? true : false);

	useEffect(() => {
		const resetUserData = () => {
			setUserId(localStorage.getItem('user_id'));
			setAuthToken(localStorage.getItem('jwt_access_token'));
			setUserName(localStorage.getItem('user_name'));
			setUserEmail(localStorage.getItem('user_email'));
			setUserRole(localStorage.getItem('user_role'));
			setUserImage(localStorage.getItem('user_image'));
			setIsLogin(localStorage.getItem('jwt_access_token') ? true : false);
		};

		//reset state whene localStorage changed
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
